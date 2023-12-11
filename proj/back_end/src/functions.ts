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
export const compute_best_options = async(con : mysql.Pool, symptoms : string[]) : Promise<consts.iMedication>=>{
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

	const res = await query_result<consts.iMedication>(con,base_query) as consts.iMedication[];

	return get_full_medication(con,res[0].name);
}

//creates medication given a connection and a medication name
const get_full_medication = async(con : mysql.Pool, med_name : string) : Promise<consts.iMedication>=>{
	const neg_query = ` select neg_effect.side_effect from medication inner join has_side_effect on has_side_effect.medication_id = medication.med_id inner join neg_effect on has_side_effect.side_effect_id = neg_effect.neg_id where medication.name = "${med_name}";`;

	const pos_query = `select pos_effect.fixes from medication inner join has_effect on has_effect.medication_id = medication.med_id inner join pos_effect on has_effect.effect_id = pos_effect.pos_id where medication.name = "${med_name}";`

	let res : consts.iMedication = { name : "" ,side_effects : [] ,effects : [] } as consts.iMedication;
	res.name = med_name;

	const n_arr : string[] = await query_result(con, neg_query).then(arr => { return arr as string[]});
	const p_arr : string[] = await query_result(con, pos_query).then(arr => { return arr as string[]});

	n_arr.forEach(neg =>{
		res.side_effects.push(neg);
	});

	p_arr.forEach(peg =>{
		res.effects.push(peg);
	});

	return res;

}

const check_if_med_has_fix_for = (med : consts.iMedication, neg:string):number=>{
	for(let i = 0; i < med.effects.length; i++){
		if(can_fix(med.effects[i]) == neg){return i;}
	}
	return -1;
}

export const net_side_effect = async(meds : consts.iMedication[], negs : string[]):Promise<string[]>=>{
	let res : string[] = [...negs];
	negs.forEach(n =>{
		meds.forEach(med =>{
			if(check_if_med_has_fix_for(med,n) != -1){
				res.splice(res.indexOf(n),1);
			}
		});
	});
	return res;
}
