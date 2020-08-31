export class City{
    id:number;
    name:String;
    departmentId:number;

    constructor(id:number,name:string,departmentId:number){
        this.id = id;
        this.name = name;
        this.departmentId = departmentId;
    }
}