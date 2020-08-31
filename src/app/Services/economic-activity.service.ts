import { Injectable } from '@angular/core';
/*Para métodos asincronos se debe implementar el uso de observables*/
import {Observable, of} from 'rxjs';
/*Se deben importar las librerias para el amnejo de HTTP*/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError,map,tap } from 'rxjs/operators';
/*Modelo */
import { EconomicActivity } from '../Models/EconomicActivity';

@Injectable({
  providedIn: 'root'
})
export class EconomicActivityService {
  urlApi = '/Formularios/api/economicActivity/Get';
  lsEconomicActivity: EconomicActivity[];
  objEconomicActivity:EconomicActivity;
  

  constructor(private http: HttpClient) {
    //this.objEconomicActivity = new EconomicActivity();
   }

  getEconomicActivities():Observable<EconomicActivity[]>{

    return this.http.get<EconomicActivity[]>(this.urlApi)
                    .pipe(
                      catchError(this.handleError<EconomicActivity[]>('getEconomicActivityes',[]))
                    );
  }

  setEconomicActivity(pEconomicAct:EconomicActivity){
    this.objEconomicActivity = pEconomicAct;
    //console.log(this.objEconomicActivity);
  }

  getEconomicActivity():EconomicActivity{
    //console.log(this.objEconomicActivity);
    return this.objEconomicActivity;    
  }

  private handleError<T> (operation = 'operation',result?:T){
    return (error:any):Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

}
