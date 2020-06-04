import { Component, OnInit, Input,Output, OnChanges, SimpleChange ,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  frmClientIsVisible:boolean;
  frmContactIsVisible:boolean;
  frmRequestIsVisible:boolean;

  ngOnInit() {
   this.frmClientIsVisible = true;
   this.frmContactIsVisible = false;
   this.frmRequestIsVisible = false;
  }

  onShowFrmRequest(value:boolean){
    alert("funciona en maestro");
  }
}
