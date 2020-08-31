import { Injectable } from '@angular/core';
/*Importamos la libreria para el manejo de Observables*/
import { Observable, of } from 'rxjs';
/*importamos la libreria para el manejo de HTTP */
import { HttpClient, HttpHeaders } from '@angular/common/http';
/*Importamos las librerias para el manejo de excepciones*/
import { catchError, map, tap } from 'rxjs/operators';
import {User} from '../Models/user';
import { Login } from '../Models/login';
import { ResponseApi } from '../Models/responseApi';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /* 
    Debemos hacer la inyección de dependencias del cliente de Http para poder usarlo en el servicio y eso se realiza 
    instanciando el HttpClient desde el constructor.
  */
  HttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  urlApi = '/Formularios/api/user';

  oUserSelected:User;
  oUserAuthenticated:User;
  private results:ResponseApi;
  constructor(private http: HttpClient) { }

  addUser(user:User):Observable<User>{
  
    return this.http.post<User>(this.urlApi,user,this.HttpOptions)
                    .pipe(
                      tap((usu :User) => console.log('usuario agregado')),
                      catchError(this.handleError<User>('addUser'))
                    );
  }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.urlApi)
                    .pipe(
                      catchError(this.handleError<User[]>('getAllUsers',[]))
                    );
  }

  getUsersByArea(area_name:string):Observable<User[]>{
    let urlNew = this.urlApi + "sByArea/get?area_name="+area_name;
    console.log(urlNew);
    return this.http.get<User[]>(urlNew)
                    .pipe(
                      catchError(this.handleError<User[]>('getUsersByArea',[]))
                    );
  }

  setUserSelected(pUser:User){
    this.oUserSelected = pUser;
  }

  getUserSelected(){
    return this.oUserSelected;
  }

  setUserAuth(user:User){
    this.oUserAuthenticated = user;
    localStorage.setItem("CurrentUser",JSON.stringify(this.oUserAuthenticated));
  }

  getUserAuth():User{
    let objTmp = JSON.parse(localStorage.getItem("CurrentUser"));
   console.log(objTmp.id);
    if(objTmp.id == null){
      this.oUserAuthenticated == null;
    }else{
      this.oUserAuthenticated = JSON.parse(localStorage.getItem("CurrentUser"));
    }
    return this.oUserAuthenticated;

  }

  async authUser(login:Login):Promise<ResponseApi>{
    let urlAuth = this.urlApi + '/authUser';
    return this.http.post<ResponseApi>(urlAuth,login,this.HttpOptions).toPromise();
          
  }

  
  




  private handleError<T> (operation = 'operation',result?:T){
    return (error:any):Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  
}
