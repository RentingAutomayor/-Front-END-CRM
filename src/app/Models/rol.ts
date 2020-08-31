import { PermissionByModule } from "./permissionByModule";

export class Rol{
    id:number;
    name:string;
    description:string;
    permissionByModule:PermissionByModule[];
}