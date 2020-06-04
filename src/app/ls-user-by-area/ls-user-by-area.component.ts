import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-ls-user-by-area',
  templateUrl: './ls-user-by-area.component.html',
  styleUrls: ['./ls-user-by-area.component.scss']
})
export class LsUserByAreaComponent implements OnInit {

  lsUsers:User[];
  oUserSelected:User;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.getUsersByArea();
  }
  
  getUsersByArea(){
    this.userService.getUsersByArea("comercial").subscribe(lsU => this.lsUsers = lsU);
  }

  setUserSelected(idUser:any){
    this.oUserSelected = this.lsUsers.find( us => us.id == idUser);
    this.userService.setUserSelected(this.oUserSelected);
  }
}
