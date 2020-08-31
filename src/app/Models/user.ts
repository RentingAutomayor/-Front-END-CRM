import { Person } from "./person";
import { Login } from "./login";
import { Rol } from "./rol";

export class User extends Person{
    isEditable:boolean;
    login:Login;
    rol:Rol;

    constructor(){
        super();
    }
   
}