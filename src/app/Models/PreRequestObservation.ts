import { User } from "./user";

export class PreRequestObservation{
    public id:number;
    public observation: string;
    public user: User;
    public registrationDate:Date;
}