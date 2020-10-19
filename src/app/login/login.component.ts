import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Login } from '../Models/login';
import { UserService } from '../Services/user.service';
import { ResponseApi } from '../Models/responseApi';
import { Router } from '@angular/router';
import { NavigationService } from '../Services/navigation.service';
import * as CryptoJS from 'crypto-js';

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
  key:string;
  iv:string;
  constructor(
    private userService: UserService,
    private router:Router,
    private navigationService:NavigationService
  ) {
   }

  ngOnInit() {
    this.loginIsInvalid = false;
    this.messageError="";
    this.isAwaiting = false;
    this.key = CryptoJS.enc.Utf8.parse("r3nt1ng4ut0m4y0rr3nt1ng4ut0m4y0r");
    this.iv = CryptoJS.enc.Utf8.parse("r3nt1ng4ut0m4y0r");
  }

  async login(){
   
    let logUser = new Login()
    logUser.userName  = this.txtUsername.value;
    let password = this.txtPassword.value;
    logUser.password = this.EncryptData(password);   
    let responseApi = new  ResponseApi();
    this.isAwaiting = true;
    responseApi = await this.userService.authUser(logUser);
    this.isAwaiting = false;
    //alert(responseApi.message);
    if(responseApi.response){
      this.navigationService.SetNavigationElement('nav-requests');
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

  EncryptData(value:string){
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), this.key, {
      keySize: 256,
      blockSize:128,
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
  }

}
