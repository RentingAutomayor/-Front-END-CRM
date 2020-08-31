import { User } from "./user";

export class OperationalInformation{
    id:number;
    deliveredVehicles:number;
    deliveredAmmount:number;
    legalizationDate:Date;
    deliveredDate:Date;
    state:boolean;
    user:User;
}