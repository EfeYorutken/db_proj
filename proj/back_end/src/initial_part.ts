import * as ms from "mysql2";

const pool = ms.createPool({//collection of collections from the database
	host:"localhost",
	user:"root",
	password:"Efe020202@sql",
	database:"db_project"
});//.promise() is also an option but could not get it to work

const query_test_res = pool.query("SELECT * FROM medications");//runs the query within

console.log(query_test_res);


