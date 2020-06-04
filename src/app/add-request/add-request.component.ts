import { Component, OnInit ,Output,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit {
  
  frmRequestIsVisible:boolean;
  frmContactIsBack:boolean;

  constructor() { }

  ngOnInit() {
    this.frmRequestIsVisible = false;
    this.frmContactIsBack = false;
  }
  
  onShowFrmRequest($event){
    this.frmRequestIsVisible = true;
  }

  onShowFrmContact(){
    this.frmContactIsBack = true;
    this.frmRequestIsVisible = false;
  }
}
