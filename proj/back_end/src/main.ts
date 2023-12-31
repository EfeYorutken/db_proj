import * as mysql from "mysql2/promise";

import * as fn from "./functions";


/*
 * shit to do
 * ------------
 *  > git push at each step
 *  [ ] see that for loop in main, the one that goes to k, yeah, optimize
 *  [x] turn the for loop with i index into a while that
 *		- continiues until the symps is empty
 *		- the newly added prescription is the same as the old one
 *	[ ] add crud operations
 *		 [ ] create
 *			- meds
 *			- symptoms
 *		[x] read
 *		[ ] update
 *		[ ] delete
 *	[ ] clean up all that is not used
 *	[ ] front end
 * */

const access : mysql.ConnectionOptions = {
	user : "root",
	password : "Efe020202@sql",
	database : "db_project"
};


const con = mysql.createPool(access);

const main = async()=>{

	let symps : string[] = ["drops bp", "depression"];
	let pres = await fn.create_prescription(con, symps);
	console.log(pres);
}

main();
