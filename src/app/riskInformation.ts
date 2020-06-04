import { State } from "./state";
import { User } from "./user";

export class RiskInformation{
    id:number;
    dateSubmissionAnalysis:Date;
    dateResponseAnalysis:Date;
    datefiling:Date;
    ammountApproved:number;
    riskState:State;
    state:boolean;
    user:User;
}