import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  lsUsers:User[];

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getAllUsers().subscribe(users => this.lsUsers = users);
  }

}
