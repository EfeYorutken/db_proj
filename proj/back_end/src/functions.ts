import * as mysql from "mysql2/promise";
import * as consts from "./constants"



//given a query and a connection, executes the query and returns the rows as a generic array
export const query_result = async<t>(con : mysql.Pool, query : string):Promise<t[]>=>{
	const [res] = await con.execute(query);

	return res as t[];
}

//given an array of symptoms, executes the query that will select the medication that fixes those symptoms
export const get_prescirption_sql = (symptoms : string[]):string=>{
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
export const get_fix = (neg : string):string=>{
	return consts.pos_effects[consts.neg_effects.indexOf(neg)];
}

export const get_best_option = async(con : mysql.Pool, symptoms :string[]):Promise<consts.iMedication>=>{

	const test = get_prescirption_sql(symptoms);

	let base_sql = " select a.name,count(a.side_effect) from ( select medication.name,pos_effect.fixes,neg_effect.side_effect from medication inner join has_effect on has_effect.medication_id = medication.med_id inner join pos_effect on has_effect.effect_id = pos_effect.pos_id inner join has_side_effect on has_side_effect.medication_id = medication.med_id inner join neg_effect on neg_effect.neg_id = has_side_effect.side_effect_id where";

	for(let i = 0; i < symptoms.length-1; i++){
		base_sql += ` pos_effect.fixes = "${get_fix(symptoms[i])}" or `;
	}

	const fin_sql= `${base_sql} or pos_effect.fixes = "${get_fix(symptoms[symptoms.length-1])}") as a group by a.name;`;
	const res = await query_result<consts.iMedication>(con,fin_sql).then(x =>{return x});
	return res[0];

}
