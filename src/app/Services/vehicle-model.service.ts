import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VehicleModel } from '../Models/VehicleModel';

@Injectable({
  providedIn: 'root'
})
export class VehicleModelService {
  private url:string;
  private vehicleModelSelected:VehicleModel;
  constructor(
    private http:HttpClient
  ) {
    this.url  ='/Formularios/api/VehicleModel';
   }

   async GetAllVehicleModels():Promise<VehicleModel[]>{
      let urlGet = this.url + '/Get';
      return this.http.get<VehicleModel[]>(urlGet).toPromise();
   }

   SetVehicleModelSelected(pVehicleModel:VehicleModel){
     this.vehicleModelSelected = pVehicleModel;
   }

   GetVehicleModelSelected():VehicleModel{
     return this.vehicleModelSelected;
   }
}
