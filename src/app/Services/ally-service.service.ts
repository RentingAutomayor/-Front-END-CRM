import { Injectable } from '@angular/core';
import { Contact } from '../Models/contact';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AllyServiceService {

  lsAccountManager: Contact[];
  private urlApi = '/Formularios/api/ally';

  constructor(private http:HttpClient) {

  }

  async getAccountmanagers():Promise<Contact[]>{
    let urlAccountmaneger = this.urlApi + '/getAccountManager';
    return this.http.get<Contact[]>(urlAccountmaneger).toPromise();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
