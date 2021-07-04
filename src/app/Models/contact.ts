import { JobTitle } from "./jobTitle";
import { Client } from './client';
import { Ally } from "./ally";
import { Branch } from "./branch";


export class Contact{
    id:number;
    name:string;
    lastName:string;
    jobTitle:JobTitle;
    phone:string;
    cellPhone:string;
    adress:string;
    email:string;
    branch:Branch;
    state:boolean;
}