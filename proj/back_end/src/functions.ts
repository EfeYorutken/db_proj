import * as mysql from "mysql2/promise";
import * as consts from "./constants"



//given a query and a connection, executes the query and returns the rows as a generic array
const query_result = async<t>(con : mysql.Pool, query : string):Promise<t[]>=>{
	const [res] = await con.execute(query);

	return res as t[];
}

//given an array of symptoms, executes the query that will select the medication that fixes those symptoms
const get_prescirption_sql = (symptoms : string[]):string=>{
	let initial_fixes : string[] = [];
	symptoms.forEach(symp =>{
		initial_fixes.push(get_fix(symp));
	});

	let query = " select * from ( select medication.name, pos_effect.fixes from medication inner join has_effect on has_effect.medication_id = medication.med_id inner join pos_effect on has_effect.effect_id = pos_effect.pos_id) as a where " + `a.fixes = "${initial_fixes[0]}"`;

	for(let i = 1; i < initial_fixes.length; i++){
		query += ` or a.fixes = "${initial_fixes[i]}"`
	}

	return query;

}
//
//given a symptom, returns its result form the arrays from above
const get_fix = (neg : string):string=>{
	return consts.pos_effects[consts.neg_effects.indexOf(neg)];
}

const can_fix = (pos : string):string=>{
	return consts.neg_effects[consts.pos_effects.indexOf(pos)];
}

//given a connection and some symptoms returns the medication that fixes the problem and has the least amount of side effects
 const compute_best_options = async(con : mysql.Pool, symptoms : string[]) : Promise<consts.iMedication[]>=>{
	let fixes : string[] = [];
	symptoms.forEach(symp =>{
		fixes.push(get_fix(symp));
	});

	let bool_statement = "";

	bool_statement += `"${fixes[0]}"`;

	for(let i = 1; i < fixes.length-1; i++){
		bool_statement += ` or pos_effect.fixes = "${fixes[i]}"`;
	}
	bool_statement += ` or pos_effect.fixes = "${fixes[fixes.length -1]}"`;

	let base_query =  `select meds.name,count(meds.side_effect) from ( select medication.name,neg_effect.side_effect,pos_effect.fixes from medication inner join has_effect on has_effect.medication_id = medication.med_id inner join pos_effect on has_effect.effect_id = pos_effect.pos_id inner join has_side_effect on has_side_effect.medication_id = medication.med_id inner join neg_effect on neg_effect.neg_id = has_side_effect.side_effect_id where pos_effect.fixes = ${bool_statement}`;



	base_query = `${base_query} or pos_effect.fixes = "${fixes[fixes.length-1]}") as meds group by meds.name order by count(meds.side_effect);`;

	const res_of_query = await query_result<consts.iMedication>(con,base_query) as consts.iMedication[];

	let res : consts.iMedication[] = [];

	for(let i = 0; i < res_of_query.length; i++){
		res.push(await get_full_medication(con,res_of_query[i].name).then(r =>{return r;}));
	}

	return res;
	//return get_full_medication(con,res[0].name);
}

//creates medication given a connection and a medication name
const get_full_medication = async(con : mysql.Pool, med_name : string) : Promise<consts.iMedication>=>{
	const neg_query = ` select neg_effect.side_effect from medication inner join has_side_effect on has_side_effect.medication_id = medication.med_id inner join neg_effect on has_side_effect.side_effect_id = neg_effect.neg_id where medication.name = "${med_name}";`;

	const pos_query = `select pos_effect.fixes from medication inner join has_effect on has_effect.medication_id = medication.med_id inner join pos_effect on has_effect.effect_id = pos_effect.pos_id where medication.name = "${med_name}";`

	const id_query = `select med_id from medication where medication.name = "${med_name}"`;

	let res : consts.iMedication = { id : -1, name : "" ,side_effects : [] ,effects : [] } as consts.iMedication;
	res.name = med_name;

	res.id = await query_result<consts.id_result>(con,id_query)
	.then(res =>{
		return (res[0] as consts.id_result).med_id;
	});

	const n_arr : string[] = await query_result<consts.side_effect>(con, neg_query)
	.then(arr => {
		let se_arr : string[] = [];
		arr.forEach(se=>{
			se_arr.push(se.side_effect);
		});
		return se_arr;
	});

	const p_arr : string[] = await query_result<consts.effect>(con, pos_query)
	.then(arr => {
		let e_arr : string[] = [];
		arr.forEach(e=>{
			e_arr.push(e.fixes);
		});
		return e_arr;
	});

	n_arr.forEach(neg =>{
		res.side_effects.push(neg);
	});

	p_arr.forEach(peg =>{
		res.effects.push(peg);
	});

	return res;

}

//wtf is wrong with this
export const apply_medication = async(meds : consts.iMedication[], symps : string[]) : Promise<string[]>=>{
	let temp = [...symps];
	let effects : string[] = [];
	meds.forEach(med =>{
		med.side_effects.forEach(se =>{
			if(!temp.includes(se)){
				temp.push(se);
			}
		});
		med.effects.forEach(ef =>{
			effects.push(ef);
		});
	});


	for(let i = 0; i < temp.length; i++){
		if(effects.includes(get_fix(temp[i]))){
			temp.splice(i,1);
		}
	}

	return temp;

}

export const create_prescription = async(con : mysql.Pool, symps : string[]) : Promise<consts.iMedication[]>=>{
	let meds : consts.iMedication[] = [];
	let options = await compute_best_options(con,symps);

	let list_of_previous_symps : string[] = [];

	while(symps.length > 0){

		//turn this monsteroucity into a decent piece of code
		for(let j = 0; j < options.length; j++){
			for(let k = 0; k < meds.length; k++){
				if(meds[k].id == options[j].id){
					options.splice(j,1);
				}
			}
		}

		options.forEach(o =>{
			meds.push(o);
		});
		symps = await apply_medication(meds, symps);
		const current_symps = symps.join(",");
		if(list_of_previous_symps.includes(current_symps)){
			break;
		}
		list_of_previous_symps.push(current_symps);
	}

	return meds;
}
