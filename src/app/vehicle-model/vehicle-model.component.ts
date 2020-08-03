import { Component, OnInit , Input,OnChanges,SimpleChange} from '@angular/core';
import { FormControl,FormsModule } from '@angular/forms';
import { VehicleModelService } from '../Services/vehicle-model.service';
import { VehicleModel } from '../VehicleModel';

@Component({
  selector: 'app-vehicle-model',
  templateUrl: './vehicle-model.component.html',
  styleUrls: ['./vehicle-model.component.scss']
})
export class VehicleModelComponent implements OnInit{ 
  private lsVehicleModel: VehicleModel[];
  private cmbVehicleModel = new FormControl('Seleccione...');
  @Input() vehicleModelSelected : VehicleModel;

  constructor(
    private vehicleModelService: VehicleModelService
  ) { 
    this.cmbVehicleModel.setValue(0);
  }

  ngOnInit() {
    this.initComponents();
  }

  async initComponents(){
    this.lsVehicleModel = await this.vehicleModelService.GetAllVehicleModels();
    console.warn("Linea de vehiculos");
    console.log(this.lsVehicleModel);    
  }

  setVehicleModel(modelID:any){
    let vehicleModelSelected = this.lsVehicleModel.find(vm => vm.id == modelID);
    this.vehicleModelService.SetVehicleModelSelected(vehicleModelSelected);
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.warn("cambio de objetos componente de VehicleModel");
    console.log(changes);    
     for (let propName in changes) {         
      if(this.vehicleModelSelected != null){
        this.cmbVehicleModel.setValue(this.vehicleModelSelected.id);
      }
     }
   }
}
