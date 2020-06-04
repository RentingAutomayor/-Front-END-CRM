import { Injectable } from '@angular/core';
import { Department } from '../department';
import { City } from '../city';
/*Para métodos asincronos se debe implementar el uso de observables*/
import {Observable, of} from 'rxjs';
/*Se deben importar las librerias para el amnejo de HTTP*/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError,map,tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private urlApi = '/Formularios/api/';
  departments: Department[];
  cities: City[];
  selectedCity : City;



  constructor(private http: HttpClient) { 
   
  }
  ///Función que permite extraer todos los departamentos
  getDepartments(): Observable<Department[]> {
    let action = 'department/Get'
    let urlDepartments = this.urlApi + action;
    return this.http.get<Department[]>(urlDepartments)
                    .pipe(
                      catchError(this.handleError<Department[]>('getDepartments',[]))
                    );
  }

  private handleError<T> (operation = 'operation',result?:T){
    return (error:any):Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getCities(): Observable<City[]> {
     let action = 'city/Get'
    let urlCity = this.urlApi + action;
    return this.http.get<City[]>(urlCity)
                    .pipe(
                      catchError(this.handleError<City[]>('getCities',[]))
                    );
  }

  getCitiesByDepartment(departmentId: number): Observable<City[]> {
    let action = `city/Get?departmentid=${departmentId}`;
    let urlCitiesByDepto = this.urlApi+action;
    //console.log(urlCitiesByDepto);
    return this.http.get<City[]>(urlCitiesByDepto)
                                  .pipe(
                                    catchError(this.handleError<City[]>('getCities',[]))
                                  );
  }

  //Setea la ciudad seleccionada por el usuario en el componente de personas
  setSelectedCity(pSelectedCity:City){    
    this.selectedCity = pSelectedCity;
    console.log(this.selectedCity);
  }

  //Devuelve la ciudad seleccionada  por el usuario para la construcción de objetos
  getSelectedCity():City{
    return this.selectedCity;    
  }


  

}
