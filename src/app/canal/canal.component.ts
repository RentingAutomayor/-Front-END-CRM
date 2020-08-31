import { Component, OnInit , OnChanges,SimpleChange, Input} from '@angular/core';
import { CanalService } from '../Services/canal.service';
import { Canal } from '../Models/canal';
import { FormControl,FormsModule } from '@angular/forms';

@Component({
  selector: 'app-canal',
  templateUrl: './canal.component.html',
  styleUrls: ['./canal.component.scss']
})
export class CanalComponent implements OnInit {
  lsCanals: Canal[];  
  cmbCanal = new FormControl('Seleccione');
  @Input() canalSelected:Canal;
  @Input() CanalGroup:number;

  constructor(private canalSercice: CanalService) {
    this.cmbCanal.setValue(0);  
    
   }

  ngOnInit() {   
    this.getAllCanals();
  }

  async getAllCanals() {
    console.warn("Canal de grupo para prospecto de cliente");
    console.warn(this.CanalGroup);
    this.lsCanals = await this.canalSercice.getCanals(this.CanalGroup);
  }

  setCanal(idCanal: any) {
    let canalSelected = this.lsCanals.find(c=> c.id == idCanal);
    //Debemos evaluar que tipo de canal esta llegando para no afectar
    if(this.CanalGroup == 1){ // canal de pre clientes
      this.canalSercice.SetCanalSocialNetworksSelected(canalSelected);
    }else if(this.CanalGroup == 2){ // canal de prospecto clientes
      this.canalSercice.setSelectedCanal(canalSelected);
    }
   
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
   console.warn("cambio de objetos en el componente canales");
   console.log(changes);
   //this.CanalGroup = changes.CanalGroup.currentValue;
    for (let propName in changes) {
     // console.log("Nombre de la propiedad a evauar");
     // console.log(propName);
      
    
      if (this.canalSelected != undefined) {
        console.log("CANAL DEL CLIENTE");
        console.log(this.canalSelected);
        this.cmbCanal.setValue(this.canalSelected.id);
      }
    }
  }

}
