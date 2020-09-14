import { Injectable } from '@angular/core';

import { Probability } from '../Models/probability';
import { State } from '../Models/state';
/*Para métodos asincronos se debe implementar el uso de observables*/
import { Observable, of } from 'rxjs';
/*Se deben importar las librerias para el amnejo de HTTP*/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { RequestRenting } from '../Models/RequestRenting';
import { ResponseApi } from '../Models/responseApi';
import { RequestRiskComponent } from '../request-risk/request-risk.component';
import { DataStructureRequest } from '../Models/DataStructureRequest';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private urlApi = '/Formularios/api/Request';
  requestToUpdate: RequestRenting;
  requestToView: RequestRenting;
  private stateSelected:State;

  HttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  async getAllRequest(): Promise<RequestRenting[]> {
    let urlGetAllRequest = this.urlApi + '/GetAllRequest';
    return this.http.get<RequestRenting[]>(urlGetAllRequest).toPromise();    
  }

  async GetRequestByFilter(kindOfFilter:string, value:string):Promise<RequestRenting[]>{
    let urlFilter = this.urlApi + '/GetRequestByFilter?pKindOfFilter='+kindOfFilter+'&pValue='+value;
    return this.http.get<RequestRenting[]>(urlFilter).toPromise();
  }

  async addNewRequest(pRequest: RequestRenting): Promise<ResponseApi> {
    let urlAddRequest = this.urlApi + '/addRequest';
    return this.http.post<ResponseApi>(urlAddRequest, pRequest, this.HttpOptions).toPromise();

  }

  async GetRequestById(pRequest_id:number):Promise<RequestRenting>{
    let urlGetRequestById = this.urlApi + '/GetRequestById?pRequest_id='+pRequest_id;
    return this.http.get<RequestRenting>(urlGetRequestById).toPromise();
  }

  
  async updateRequest(pRequest: RequestRenting): Promise<ResponseApi> {
    let urlAddRequest = this.urlApi + '/updateRequest';
    return this.http.post<ResponseApi>(urlAddRequest, pRequest, this.HttpOptions).toPromise();

  }

  async deleteRequest(pRequest: RequestRenting): Promise<RequestRenting> {
    let urlDeleteRequest = this.urlApi + '/deleteRequest';
    return this.http.post<RequestRenting>(urlDeleteRequest, pRequest, this.HttpOptions).toPromise();

  }

  async getProbabilities(): Promise<Probability[]> {
    let urlProbability = this.urlApi + '/getProbabilities';
    return this.http.get<Probability[]>(urlProbability).toPromise();    
  }

  async getParentStates(pDescription: string): Promise<State[]> {
    let urlParentStates = this.urlApi + '/getParentStates?pDescription=' + pDescription;
    return this.http.get<State[]>(urlParentStates).toPromise();
  
  }

  async generateFile(): Promise<ResponseApi> {
    let urlGenerateFile= this.urlApi + '/generateArchive';
    return this.http.post<ResponseApi>(urlGenerateFile,'',this.HttpOptions).toPromise();
  
  }

  async GetDataToExportFile():Promise<DataStructureRequest[]>{
    let urlGetDataToFile= this.urlApi + '/GetDataToExportFile';
    return this.http.get<DataStructureRequest[]>(urlGetDataToFile).toPromise();
  }

  async getStatesByParent(parentState_id: number): Promise<State[]> {
    let urlSecondStates = this.urlApi + '/getStatesByParent?parentState_id=' + parentState_id;
    return this.http.get<State[]>(urlSecondStates).toPromise();
      // .pipe(
      //   catchError(this.handleError<State[]>('getStatesByParent', []))
      // );
  }

  setRequestToEdit(pRequest: RequestRenting) {
    this.requestToUpdate = pRequest;
  }

  getRequestToEdit(): RequestRenting {
    return this.requestToUpdate;
  }

  setRequestToView(pRequest:RequestRenting){
    this.requestToView = pRequest;
  }

  getRequestToView():RequestRenting{
    return this.requestToView;
  }



  
  async updateRiskInformation(pRquest: RequestRenting): Promise<ResponseApi> {
    let urlRiskInfo = this.urlApi + '/updateRiskInformationPerRequest';
    console.log(urlRiskInfo);
    return this.http.post<ResponseApi>(urlRiskInfo, pRquest, this.HttpOptions).toPromise();
  }

  async updateOperationalInformation(pRequest: RequestRenting): Promise<ResponseApi> {
    let urlOperationalInformation = this.urlApi + '/updateOperationalInformationPerRequest';
    console.log(urlOperationalInformation);
    return this.http.post<ResponseApi>(urlOperationalInformation, pRequest, this.HttpOptions).toPromise();
  }

  SetStateSelected(pStateSlected:State){
    this.stateSelected = pStateSlected;
  }

  GetStateSelected():State{
    return this.stateSelected;
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
