import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Login } from '../Models/login';
import { UserService } from '../Services/user.service';
import { ResponseApi } from '../Models/responseApi';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  txtUsername = new FormControl('');
  txtPassword = new FormControl('');
  loginIsInvalid: boolean;
  messageError:string;
  isAwaiting:boolean;
  constructor(
    private userService: UserService,
    private router:Router
  ) {
   }

  ngOnInit() {
    this.loginIsInvalid = false;
    this.messageError="";
    this.isAwaiting = false;
  }

  async login(){
   
    let logUser = new Login()
    logUser.userName  = this.txtUsername.value;
    logUser.password  = this.txtPassword.value;
    let responseApi = new  ResponseApi();
    this.isAwaiting = true;
    responseApi = await this.userService.authUser(logUser);
    this.isAwaiting = false;
    //alert(responseApi.message);
    if(responseApi.response){
      this.router.navigate(["/MasterRequests"]);
      this.loginIsInvalid = false;
      this.messageError="";
      console.log(responseApi.user);
      this.userService.setUserAuth(responseApi.user);
    }  
    else{
      this.loginIsInvalid = true;
      this.messageError = responseApi.message;
    }
    
  }

}
