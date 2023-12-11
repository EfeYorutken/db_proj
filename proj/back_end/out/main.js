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
const access = {
    user: "root",
    password: "Efe020202@sql",
    database: "db_project"
};
const con = mysql.createPool(access);
const main = async () => {
    /*
     * PLAN
     * - given the list of side_effects get the best med with compute_best_options
     * - apply that med to the list with net_side_effect, result is the new side_effect
     *   - while the side_effects are not empty (or for some itterations) repeate the process
     */
};
main();
