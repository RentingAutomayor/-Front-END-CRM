import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PreClient } from '../Models/PreClient';
import { ResponseApi } from '../Models/responseApi';
import { PreRequest } from '../Models/PreRequest';
import { DataStructurePrRequest } from '../Models/DataStructurePreRequest';



@Injectable({
  providedIn: 'root'
})
export class PreRequestServiceService {

  private url:string;
  private preRequestToUpdate:PreRequest;
  private preRequestToReview:PreRequest;
  private  HttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { 
    this.url = '/Formularios/api/PreRequest';
  }
  
  SetPreRequestToReview(pPreRequest:PreRequest){
    this.preRequestToReview = pPreRequest;
  }

  GetPreRequestToReview():PreRequest{
    return this.preRequestToReview;
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

  async GetPreRequestByFilter(kindOfFilter:string,value:string):Promise<PreRequest[]>{
    let urlGetFilter = this.url + '/GetPreRequestByFilter?pKindOfFilter='+kindOfFilter+'&pValue='+value;
    return this.http.get<PreRequest[]>(urlGetFilter).toPromise();
  }

  async GetPreRequestByID(pPreRequest_Id:number):Promise<PreRequest>{
    let urlGetById = this.url + '/GetPreRequestById?pPreRequest_Id='+pPreRequest_Id;
    return this.http.get<PreRequest>(urlGetById).toPromise();
  }



  async DeletePreRequestById(idPreRequest:string):Promise<ResponseApi>{
    let urlDelete = this.url + '/DeleteRequestByID';
    let httpParams = new HttpParams().set('idPreRequest',idPreRequest);
    let options= {params: httpParams};
    return this.http.delete<ResponseApi>(urlDelete,options).toPromise();
  }

  async GetDataToExportFile():Promise<DataStructurePrRequest[]>{
    let urlGetDataFile = this.url + '/GetDataToExport';    
    return this.http.get<DataStructurePrRequest[]>(urlGetDataFile).toPromise();
  }

  
}