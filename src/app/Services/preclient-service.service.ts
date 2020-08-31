import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PreClient } from '../Models/PreClient';
import { ResponseApi } from '../Models/responseApi';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreclientServiceService {
  private lsPreClient: PreClient[];
  private url: string;
  private preClientTmp:PreClient;

  private HttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) {
    this.url = '/Formularios/api/PreClient';
  }


  async GetAllPreClients(): Promise<PreClient[]> {
    let urlPreClient = this.url + '/Get';
    return this.http.get<PreClient[]>(urlPreClient).toPromise();
  }

  async AddNewPreClient(pPreClient: PreClient): Promise<ResponseApi> {
    let urlAdd = this.url + '/AddNewPreClient';
    return this.http.post<ResponseApi>(urlAdd, pPreClient, this.HttpOptions).toPromise();
  }

  async UpdatePreClient(pPreClient:PreClient): Promise<ResponseApi>{
    let urlUpdate = this.url + '/UpdatePreClient';
    return this.http.post<ResponseApi>(urlUpdate,pPreClient,this.HttpOptions).toPromise();
  }


  GetPreClientsByDescriptions(description: string): Observable<PreClient[]> {
    if (!description.trim()) {
      return of([]);
    }
    let urlClientsByDesc = this.url + "/GetPreClientsByDescription?description=" + description;

    return this.http.get<PreClient[]>(urlClientsByDesc)
      .pipe(
        catchError(this.handleError<PreClient[]>('GetPreClientsByDescriptions', []))
      );
  }

  SetPreClientBD(pPreClient:PreClient){
    this.preClientTmp = pPreClient;
  }

  GetPreClientBD():PreClient{
    return this.preClientTmp;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
