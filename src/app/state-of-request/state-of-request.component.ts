import { Component, OnInit, Input ,SimpleChange, OnChanges} from '@angular/core';
import { FormControl,FormsModule } from '@angular/forms';
import { State } from '../Models/state';
import { RequestService } from '../Services/request.service';

@Component({
  selector: 'app-state-of-request',
  templateUrl: './state-of-request.component.html',
  styleUrls: ['./state-of-request.component.scss']
})
export class StateOfRequestComponent implements OnInit {
  private cmbState = new FormControl('Seleccione');
  private lsStates:State[];
  @Input() GroupOfStates:string;
  @Input() stateSelected:State;

  constructor(
    private requestService: RequestService
  ) {
    this.cmbState.setValue(0);
   }

  ngOnInit() {
    console.warn("Grupo de estados a mostrar");    
    console.warn(this.GroupOfStates);
    this.initComponent();
  }

  async initComponent(){
    this.lsStates = await this.requestService.getParentStates(this.GroupOfStates);
    console.log(this.lsStates);
  }

  setState(idState:any){
    let stateSelected = this.lsStates.find(st => st.id == idState);
    this.requestService.SetStateSelected(stateSelected);
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.warn("cambio de objetos componente de VehicleModel");
    console.log(changes);    
     for (let propName in changes) {         
      if(this.stateSelected != null){
        this.cmbState.setValue(this.stateSelected.id);
      }
     }
   }

}
