"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql2/promise"));
const fn = __importStar(require("./functions"));
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
const access = {
    user: "root",
    password: "Efe020202@sql",
    database: "db_project"
};
const con = mysql.createPool(access);
const main = async () => {
    let symps = ["drops bp", "depression"];
    let pres = await fn.create_prescription(con, symps);
    console.log(pres);
};
main();
