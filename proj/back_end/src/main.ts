import * as mysql from "mysql2/promise";

import * as consts from "./constants";
import * as fn from "./functions";


/*
 * shit to do
 * ------------
 *  > git push at each step
 *  [ ] see that for loop in main, the one that goes to k, yeah, optimize
 *  [ ] turn the for loop with i index into a while that
 *		- continiues until the symps is empty
 *		- the newly added prescription is the same as the old one
 *	[ ] add crud operations
 *		 [ ] create
 *			- meds
 *		[x] read
 *		[ ] update
 *		[ ] delete
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
	let meds : consts.iMedication[] = [];

	let options = await fn.compute_best_options(con,symps);

	//optimize for loop with i to while
	for(let i = 0; i < 10 && symps.length > 0; i++){
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
		symps = await fn.apply_medication(meds, symps);
	}

	meds.forEach(m =>{
		console.log(m.name);
	});

};

main();
