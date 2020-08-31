import { Injectable } from '@angular/core';
import { kindOfDocument } from '../Models/kindOfDocument';

/*Para métodos asincronos se debe implementar el uso de observables*/
import {Observable, of} from 'rxjs';
/*Se deben importar las librerias para el amnejo de HTTP*/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError,map,tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KindOfDocumentService {
  private urlApi = '/Formularios/api/';
  kindOfDocuments: kindOfDocument[];
  
  constructor(private http: HttpClient) {  }

  getKindOfDocuments(): Observable<kindOfDocument[]>{
    let action = 'kindOfDocument';
    let urlKoD = this.urlApi + action + "/Get";
    console.log(urlKoD);

    return this.http.get<kindOfDocument[]>(urlKoD)
                    .pipe(
                      catchError(this.handleError<kindOfDocument[]>('getKindOfDocuments',[]))
                    );
  }

  private handleError<T> (operation = 'operation',result?:T){
    return (error:any):Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

}
