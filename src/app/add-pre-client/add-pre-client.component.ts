import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-pre-client',
  templateUrl: './add-pre-client.component.html',
  styleUrls: ['./add-pre-client.component.scss']
})
export class AddPreClientComponent implements OnInit {

  private kindOfForm: string;
  private frmPersonIsActive:boolean;
  private frmRequestIsActive:boolean;
  private isAwaiting:boolean;

  constructor() { }

  ngOnInit() {
    this.kindOfForm = 'PreClient';
    this.frmPersonIsActive = true;
    this.frmRequestIsActive = false;  
    this.isAwaiting = false;  
  }

  ShowFrmRequest(){    
    this.frmPersonIsActive = false;
    this.frmRequestIsActive = true;
  }

  ShowFrmPerson(){
    this.frmPersonIsActive = true;
    this.frmRequestIsActive = false;
  }
}
