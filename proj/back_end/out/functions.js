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
exports.get_best_option = exports.get_fix = exports.get_prescirption_sql = exports.query_result = void 0;
const consts = __importStar(require("./constants"));
//given a query and a connection, executes the query and returns the rows as a generic array
const query_result = async (con, query) => {
    const [res] = await con.execute(query);
    return res;
};
exports.query_result = query_result;
//given an array of symptoms, executes the query that will select the medication that fixes those symptoms
const get_prescirption_sql = (symptoms) => {
    let initial_fixes = [];
    symptoms.forEach(symp => {
        initial_fixes.push((0, exports.get_fix)(symp));
    });
    let query = " select * from ( select medication.name, pos_effect.fixes from medication inner join has_effect on has_effect.medication_id = medication.med_id inner join pos_effect on has_effect.effect_id = pos_effect.pos_id) as a where " + `a.fixes = "${initial_fixes[0]}"`;
    for (let i = 1; i < initial_fixes.length; i++) {
        query += ` or a.fixes = "${initial_fixes[i]}"`;
    }
    return query;
};
exports.get_prescirption_sql = get_prescirption_sql;
//
//given a symptom, returns its result form the arrays from above
const get_fix = (neg) => {
    return consts.pos_effects[consts.neg_effects.indexOf(neg)];
};
exports.get_fix = get_fix;
const get_best_option = async (con, symptoms) => {
    const test = (0, exports.get_prescirption_sql)(symptoms);
    let base_sql = " select a.name,count(a.side_effect) from ( select medication.name,pos_effect.fixes,neg_effect.side_effect from medication inner join has_effect on has_effect.medication_id = medication.med_id inner join pos_effect on has_effect.effect_id = pos_effect.pos_id inner join has_side_effect on has_side_effect.medication_id = medication.med_id inner join neg_effect on neg_effect.neg_id = has_side_effect.side_effect_id where";
    for (let i = 0; i < symptoms.length - 1; i++) {
        base_sql += ` pos_effect.fixes = "${(0, exports.get_fix)(symptoms[i])}" or `;
    }
    const fin_sql = `${base_sql} or pos_effect.fixes = "${(0, exports.get_fix)(symptoms[symptoms.length - 1])}") as a group by a.name;`;
    const res = await (0, exports.query_result)(con, fin_sql).then(x => { return x; });
    return res[0];
};
exports.get_best_option = get_best_option;
