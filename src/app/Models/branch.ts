import { Client } from "./client";
import { Ally } from "./ally";

export class Branch{
    id:number;
    name:string;
    phone:string;
    adress:string;
    client:Client;
    ally:Ally;
}