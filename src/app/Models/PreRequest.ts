import { PreClient } from "./PreClient";
import { VehicleModel } from "./VehicleModel";
import { State } from "./state";
import { User } from "./user";
import { Canal } from "./canal";

export class PreRequest{
    public id:number;
    public registrationDate:Date;
    public preClient: PreClient ;
    public vehicleModel: VehicleModel;
    public state:boolean;
    public stateRequest:State;
    public user: User;
    public firstCanal: Canal;
    public secondCanal: Canal;
}