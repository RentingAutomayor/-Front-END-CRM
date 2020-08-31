import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { User } from '../Models/user';
import { UserService } from '../Services/user.service';
import { NavigationService } from '../Services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  userAuth: User;
  constructor(
    private router: Router,
    private userService: UserService,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.userAuth = this.userService.getUserAuth();
    this.InitComponents();
  }

  InitComponents(){
    let navigationElement = this.navigationService.GetNavigationElement();
    if(navigationElement != null && navigationElement != ""){
      this.setActive(navigationElement);
    }
  }

  logout() {
    if (confirm("¿Está seguro que desea cerrar sesión?")) {
      localStorage.setItem("CurrentUser", JSON.stringify("id:null"));
      this.router.navigate(["/Login"]);
    }
  }

  setActive(idElement: any) {
    console.log(idElement);
   let aBtnNav = document.getElementsByTagName('a');
   
    let btnNav = document.getElementById(idElement);
    btnNav.classList.add("active");    
  }

  NavigateToComponent(idElement:string){
    if (idElement == "nav-logout") {
      this.logout();
    }
    this.navigationService.SetNavigationElement(idElement);
    this.navigate(idElement);    
  }


  navigate(navElement: string) {
    var pathToNavigate = "";
    console.log("ruta: " + navElement)
    switch (navElement) {
      case 'nav-requests':
        pathToNavigate = "/MasterRequests";
        break;
      case 'nav-pre-clients':
        pathToNavigate = "/MasterPreClients";
        break;
    }

    if (navElement != 'nav-logout') {
      console.log(pathToNavigate);
      this.router.navigate([pathToNavigate]);
    }
  }

}
