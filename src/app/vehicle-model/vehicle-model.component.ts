import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { VehicleModelService } from '../Services/vehicle-model.service';
import { VehicleModel } from '../Models/VehicleModel';
/*Para que sirva los pipes de observables se deben importar alkgunas librerias */
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-vehicle-model',
  templateUrl: './vehicle-model.component.html',
  styleUrls: ['./vehicle-model.component.scss']
})
export class VehicleModelComponent implements OnInit {
  private lsVehicleModel: VehicleModel[];
  private txtVehicleModel = new FormControl('');
  lsVehicleModel$: Observable<VehicleModel[]>;
  description = new Subject<string>();
  private lsVehicleModelIsVisible: boolean;
  @Input() vehicleModelSelected: VehicleModel;

  constructor(
    private vehicleModelService: VehicleModelService
  ) {

  }

  ngOnInit() {
    this.initComponents();    
    this.SearchVehicleModelByDescription();   
  }

  SearchVehicleModelByDescription() {
    this.lsVehicleModel$ = this.description.pipe(
      //Espera 300 ms despues de cada tecleo
      debounceTime(300),
      //Ignora un termino si es igual al anterior
      distinctUntilChanged(),
      //cambia a una busqueda de tipo Observable
      switchMap((desc: string) => this.vehicleModelService.GetVehicleModelByDescription(desc)),
    );
  }

  async initComponents() {
    if(this.vehicleModelSelected == null){
      this.vehicleModelSelected = new VehicleModel();
      this.vehicleModelSelected.name = "";
    }
   
    this.lsVehicleModelIsVisible = false;
    this.lsVehicleModel = await this.vehicleModelService.GetAllVehicleModels();
    console.warn("Linea de vehiculos");
    console.log(this.lsVehicleModel);
  }

  SetVehicleModel(pVehicleModel:VehicleModel) {   
    this.vehicleModelSelected = pVehicleModel; 
    this.vehicleModelService.SetVehicleModelSelected(pVehicleModel);
    this.lsVehicleModelIsVisible = false;
  }

  GetVehicleModelByDescription(pdescription: string) {
    this.description.next(pdescription);
    this.lsVehicleModelIsVisible = true;
  }

  ValidateVehicleModelSelected(){
    let txtValue = this.txtVehicleModel.value;
    let oVehicleModelSelected = this.lsVehicleModel.find(vm => vm.name.toUpperCase() == txtValue.toString().toUpperCase());
    
    if(oVehicleModelSelected == null){
      oVehicleModelSelected = new VehicleModel();
      oVehicleModelSelected.id = 0;
      oVehicleModelSelected.name = this.txtVehicleModel.value.toString().toUpperCase();
    }   
    this.vehicleModelService.SetVehicleModelSelected(oVehicleModelSelected);

    console.log("[Perdida foco vehicle model]");
    console.log(oVehicleModelSelected);
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.warn("cambio de objetos componente de VehicleModel");
    console.log(changes);
    for (let propName in changes) {
      if (this.vehicleModelSelected != null) {

      }
    }
  }
}
