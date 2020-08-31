import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PreClient } from '../Models/PreClient';
import { ResponseApi } from '../Models/responseApi';
import { PreRequest } from '../Models/PreRequest';



@Injectable({
  providedIn: 'root'
})
export class PreRequestServiceService {

  private url:string;
  private preRequestToUpdate:PreRequest;
  private  HttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { 
    this.url = '/Formularios/api/PreRequest';
  }

  SetPreRequestToUpdate(pPreRequest:PreRequest){
    this.preRequestToUpdate = pPreRequest;
  }

  GetPreRequestToUpdate():PreRequest{
    return this.preRequestToUpdate;
  }
  async AddPreRequest(pPreRequest:PreRequest): Promise<ResponseApi>{
    let urlAdd = this.url + "/AddNewPreRequest";
    return this.http.post<ResponseApi>(urlAdd,pPreRequest,this.HttpOptions).toPromise();
  }

  async UpdatePreRequest(pPreRequest:PreRequest):Promise<ResponseApi>{
    let urlUpdate = this.url +"/UpdatePreRequest";
    return this.http.post<ResponseApi>(urlUpdate,pPreRequest,this.HttpOptions).toPromise();
  }

  async GetAllPreRequest():Promise<PreRequest[]>{
    let urlGet = this.url + '/Get';
    return this.http.get<PreRequest[]>(urlGet).toPromise();
  }

  async DeletePreRequestById(idPreRequest:string):Promise<ResponseApi>{
    let urlDelete = this.url + '/DeleteRequestByID';
    let httpParams = new HttpParams().set('idPreRequest',idPreRequest);
    let options= {params: httpParams};
    return this.http.delete<ResponseApi>(urlDelete,options).toPromise();
  }

  
}