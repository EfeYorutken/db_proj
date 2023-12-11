import * as mysql from "mysql2/promise";

import * as consts from "./constants";
import * as fn from "./functions";


/*
 * PLAN
 * [x] seperate constants and functions and such
 * [ ] sql q in  get_best_option does not work, fix
 * [ ] use the code in impr.sql to get the lowest side effect medication for a given symptom
 * [ ] carry on with the front end
 * 
 */




const access : mysql.ConnectionOptions = {
	user : "root",
	password : "Efe020202@sql",
	database : "db_project"
};


const con = mysql.createPool(access);

const main = async()=>{
	const test_se = [ "hightens bp", "drops bp", "depression" ];

	const res = await fn.get_best_option(con,test_se);

	console.log(res.name);

};

main();
