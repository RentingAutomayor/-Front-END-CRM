import { State } from "./state";
import { User } from "./user";

export class RiskInformation{
    id:number;
    dateSubmissionAnalysis:Date;
    dateResponseAnalysis:Date;
    datefiling:Date;
    ammountApproved:number;
    dateApproved:Date;
    riskState:State;
    state:boolean;
    user:User;
}