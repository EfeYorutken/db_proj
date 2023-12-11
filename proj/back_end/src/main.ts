import * as mysql from "mysql2/promise";

import * as consts from "./constants";
import * as fn from "./functions";


/*
 * PLAN
 * [x] seperate constants and functions and such
 * [x] sql q in  get_best_option does not work, fix
 * [ ] carry on with the front end
 * [ ] all of CRUD operations
 *		[ ] create medication and side_effect/effect combo
 *		[x] read medication and side_effect/effect combo
 *		[ ] update medications with sideeffects and effects of medications
 *		[ ] delete medications and sideffects

 * 
 */




const access : mysql.ConnectionOptions = {
	user : "root",
	password : "Efe020202@sql",
	database : "db_project"
};


const con = mysql.createPool(access);

const main = async()=>{
	
	/*
	 * PLAN
	 * - given the list of side_effects get the best med with compute_best_options
	 * - apply that med to the list with net_side_effect, result is the new side_effect
	 *   - while the side_effects are not empty (or for some itterations) repeate the process
	 */

};

main();
