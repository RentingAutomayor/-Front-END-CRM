import { City } from "./city";
import { kindOfDocument } from "./kindOfDocument";

export class Person{
    id:string;
    kindOfDocument:kindOfDocument;
    name:string;
    lastName:string;
    phone:string;
    cellPhone:string;
    email:string;
    city:City;
    constructor(){}

}