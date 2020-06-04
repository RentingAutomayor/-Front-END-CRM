import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { User } from '../user';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  userAuth:User;
  constructor(
    private router:Router,
    private userService:UserService
  
    ) { }

  ngOnInit() {
    this.userAuth = this.userService.getUserAuth();
  }

  logout(){
    if(confirm("¿Está seguro que desea cerrar sesión?")){
      localStorage.setItem("CurrentUser",JSON.stringify("id:null"));
      this.router.navigate(["/Login"]);
    }
  }

  setActive(idElement:any){
    console.log(idElement);

    // let btnRequests = document.getElementById("nav-requests");   
    // btnRequests.classList.remove("active");
    

    // let btnClients= document.getElementById("nav-clients");
    // btnClients.classList.remove("active");

    // let btnUsers= document.getElementById("nav-users");
    // btnUsers.classList.remove("active");

    // let btnLogout= document.getElementById("nav-logout");
    // btnLogout.classList.remove("active");    

    // let btn = document.getElementById(idElement);
    // console.log(btn);
    // btn.classList.add("active");

    if(idElement == "nav-logout"){
      this.logout();
    }
  }
  
}
