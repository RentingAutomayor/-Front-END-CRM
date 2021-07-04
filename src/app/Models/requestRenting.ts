import { Client } from "./client";
import { User } from "./user";
import { State } from "./state";
import { Probability } from "./probability";
import { Contact } from "./contact";
import { RiskInformation } from "./riskInformation";
import { OperationalInformation } from "./operationalInformation";
import { Canal } from "./canal";

export class RequestRenting{
    id:number;
    initialDate:Date;
    lastDate:Date;
    registrationDate:Date;
    probability:Probability;
    parentState:State;
    childState:State;
    client:Client;
    user:User;   
    contact:Contact;
    riskInformation:RiskInformation;
    operationalInformation:OperationalInformation;
    canal: Canal;
    observation:string;
}