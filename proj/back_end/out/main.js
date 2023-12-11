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
 * PLAN
 * [x] seperate constants and functions and such
 * [ ] sql q in  get_best_option does not work, fix
 * [ ] use the code in impr.sql to get the lowest side effect medication for a given symptom
 * [ ] carry on with the front end
 *
 */
const access = {
    user: "root",
    password: "Efe020202@sql",
    database: "db_project"
};
const con = mysql.createPool(access);
const main = async () => {
    const test_se = ["hightens bp", "drops bp", "depression"];
    const res = await fn.get_best_option(con, test_se);
    console.log(res.name);
};
main();
