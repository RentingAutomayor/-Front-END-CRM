import { Component, OnInit } from '@angular/core';
import { RequestService } from '../Services/request.service';
import { RequestRenting } from '../RequestRenting';
import { Client } from '../client';

@Component({
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.scss']
})
export class UpdateRequestComponent implements OnInit {

  containerClientIsVisible:boolean;
  containerRequestIsVisible:boolean;
  oRequestToEdit:RequestRenting;
  pClientToUpdate:Client;

  constructor(
    private requestService : RequestService
  ) { }

  ngOnInit() {
    
    this.containerClientIsVisible = true;
    this.containerRequestIsVisible = false;

    this.oRequestToEdit = this.requestService.getRequestToEdit();
    console.log("[Solicitud para editar GENERAL]");
    console.log(this.oRequestToEdit);
    this.pClientToUpdate = this.oRequestToEdit.client;

  }

  showContainerClient(){
    this.containerClientIsVisible = true;
    this.containerRequestIsVisible = false;
  }

  showContainerRequest(){
    this.containerClientIsVisible = false;
    this.containerRequestIsVisible = true;
  }

}
