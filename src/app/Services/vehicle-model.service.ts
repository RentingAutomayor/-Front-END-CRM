import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VehicleModel } from '../Models/VehicleModel';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleModelService {
  private url: string;
  private vehicleModelSelected: VehicleModel;
  constructor(
    private http: HttpClient
  ) {
    this.url = '/Formularios/api/VehicleModel';
  }

  async GetAllVehicleModels(): Promise<VehicleModel[]> {
    let urlGet = this.url + '/Get';
    return this.http.get<VehicleModel[]>(urlGet).toPromise();
  }

  SetVehicleModelSelected(pVehicleModel: VehicleModel) {
    this.vehicleModelSelected = pVehicleModel;
  }

  GetVehicleModelSelected(): VehicleModel {
    return this.vehicleModelSelected;
  }


  GetVehicleModelByDescription(description: string): Observable<VehicleModel[]> {
    if (!description.trim()) {
      return of([]);
    }
    let urlVehicleModelDesc = this.url + "/GetVehicleModelByDescription?pDescription=" + description;
    return this.http.get<VehicleModel[]>(urlVehicleModelDesc)
      .pipe(
        catchError(this.handleError<VehicleModel[]>('GetVehicleModelByDescription', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
