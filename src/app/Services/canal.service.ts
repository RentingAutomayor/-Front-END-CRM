import { Injectable } from '@angular/core';
/*Para métodos asincronos se debe implementar el uso de observables*/
import { Observable, of } from 'rxjs';
/*Se deben importar las librerias para el amnejo de HTTP*/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
/*Importamos el modelo */
import { Canal } from '../canal';

@Injectable({
  providedIn: 'root'
})
export class CanalService {

  lsCanal: Canal[];
  oCanalSelected: Canal;
  oCanalSocialNetworksSelected:Canal;
  urlApi = '/Formularios/api/canal/get';

  constructor(private http: HttpClient) { }

  async getCanals(canalGroup_id:number): Promise<Canal[]> {
    let urlGetCanalByGroup = this.urlApi+'?canalGroup_id='+canalGroup_id;
    return this.http.get<Canal[]>(urlGetCanalByGroup).toPromise();      
  }

  setSelectedCanal(pCanal: Canal) {
    this.oCanalSelected = pCanal;
  }

  getSelectedCanal(): Canal {
    return this.oCanalSelected;
  }

  SetCanalSocialNetworksSelected (pCanal: Canal) {
    this.oCanalSocialNetworksSelected = pCanal;
  }

  GetCanalSocialNetworksSelected():Canal{
    return this.oCanalSocialNetworksSelected;
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }


}
