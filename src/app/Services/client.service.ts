import { Injectable } from '@angular/core';
import { Client } from '../client';
import { Contact } from '../contact';

import { Observable, of } from 'rxjs';
/*importamos la libreria para el manejo de HTTP */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
/*Importamos las librerias para el manejo de excepciones*/
import { catchError, map, tap } from 'rxjs/operators';
import { Branch } from '../branch';
import { ResponseApi } from '../responseApi';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  urlApi = '/Formularios/api/client';
  HttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  lsClients: Client[];
  lsContact: Contact[];
  oClientCreated: Client;
  existsClient: boolean;
  /*Se usan estas variables para la visibilidad de los formularios */
  frmClientIsActive: boolean;
  frmContactsIsActive: boolean;
  clientTmp:Client;
  clientWasModified:boolean;

  constructor(private http: HttpClient) {

  }

  async existsClientInBD(idclient: string): Promise<boolean> {
    let urlExists = this.urlApi + '/existsClient?client_id=' + idclient;
    console.log(urlExists);
    return this.http.get<boolean>(urlExists).toPromise();
  }


  async addClient(pClient: Client): Promise<ResponseApi> {
    let urlAddClient = this.urlApi + '/AddClient'
    return this.http.post<ResponseApi>(urlAddClient, pClient, this.HttpOptions).toPromise();
  }

  async updateClient(pClient: Client): Promise<ResponseApi> {
    let urlAddClient = this.urlApi + '/updateClient'
    return this.http.post<ResponseApi>(urlAddClient, pClient, this.HttpOptions).toPromise();
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.urlApi)
      .pipe(
        catchError(this.handleError<Client[]>('getAllClients', []))
      );
  }

  getMainBranchByClient(idclient:string):Promise<Branch>{
    let urlMainBranch = '/Formularios/api/client/getMainBranchByClient?pClient_id=' + idclient;
    return this.http.get<Branch>(urlMainBranch).toPromise();
  }

  setContacts(pLsContacts: Contact[]) {
    this.lsContact = pLsContacts;
  }

  getContacts(): Contact[] {
    return this.lsContact;
  }

  async getContactsByClient(client_id: string): Promise<Contact[]> {
    let urlContact = '/Formularios/api/contact/getContactsByClient?pClient_id=' + client_id;
    console.log(urlContact);
    return this.http.get<Contact[]>(urlContact).toPromise();
  }

  addContactsByClient(pLsContacts: Contact[]): Observable<Contact[]> {
    let urlContact = '/Formularios/api/contact/addContactsByClient';

    return this.http.post<Contact[]>(urlContact, pLsContacts, this.HttpOptions)
      .pipe(
        tap((lsContact: Contact[]) => console.log('Se crea la lista de contactos')),
        catchError(this.handleError<Contact[]>('addContactsByClient'))
      );
  }

  getClientsByDescriptions(description: string): Observable<Client[]> {
    if (!description.trim()) {
      return of([]);
    }
    let urlClientsByDesc = this.urlApi + "/GetClientsByDescription?description=" + description;
    //console.log(urlClientsByDesc);
    return this.http.get<Client[]>(urlClientsByDesc)
      .pipe(
        catchError(this.handleError<Client[]>('getClientsByDescriptions', []))
      );
  }

  setClientCreated(pClient: Client) {
    this.oClientCreated = pClient;
    console.log('[Cliente Creado]')
    console.log(this.oClientCreated);
  }

  getClientCreated(): Client {
    return this.oClientCreated;
  }


  setFrmClientIsActive(value: boolean) {
    this.frmClientIsActive = value;
  }

  getFrmClientIsActive(): boolean {
    return this.frmClientIsActive;
  }

  setFrmContactsIsActive(value: boolean) {
    this.frmContactsIsActive = value;
  }

  getFrmContactsIsActive(): boolean {
    return this.frmContactsIsActive;
  }

  setClientTmp(pClient:Client){
    this.clientTmp = pClient;
  }

  getClientTmp():Client{
    return this.clientTmp;
  }

  setClientWasModified(value:boolean){
    this.clientWasModified = value;
  }

  getClientWasModified():boolean{
    return this.clientWasModified;
  }

  async deleteContactById(contact:Contact):Promise<ResponseApi>{
    let urlDeleteContact = this.urlApi+'/deleteContact';
    console.log(urlDeleteContact);
    return this.http.post<ResponseApi>(urlDeleteContact,contact,this.HttpOptions).toPromise();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }



}