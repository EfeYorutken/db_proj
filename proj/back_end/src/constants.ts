import { RowDataPacket } from "mysql2";

//exteds is necessary for assiging the result of the sql queries to ts objects
export interface iMedication extends RowDataPacket{
	name : string;
	side_effects : string[];
	effects : string[];
};

export const neg_effects = [
	"hightens bp",
	"drops bp",
	"depression",
	"joint pain",
	"over increases blood sugar",
	"lathergy"
];

export const pos_effects = [
"lowers bp",
"increases bp",
"improves mood",
"lessens phisical pain",
"increases blood-sugar",
"lowers blood-sugar",
"brings up energy"
];


