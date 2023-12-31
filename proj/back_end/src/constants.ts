import { RowDataPacket } from "mysql2";

//exteds is necessary for assiging the result of the sql queries to ts objects
export interface iMedication extends RowDataPacket{
	id : number;
	name : string;
	side_effects : string[];
	effects : string[];
};

export interface effect extends RowDataPacket{
	fixes : string;
}

export interface side_effect extends RowDataPacket{
	side_effect : string;
}

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


