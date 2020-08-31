import { Component, OnInit } from '@angular/core';
import { PreRequestServiceService } from '../Services/pre-request-service.service';
import { PreRequest } from '../Models/PreRequest';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

import { PersonService } from '../Services/person.service';
import { Canal } from '../Models/canal';
import { CanalService } from '../Services/canal.service';
import { VehicleModel } from '../Models/VehicleModel';
import { VehicleModelService } from '../Services/vehicle-model.service';
import { RequestService } from '../Services/request.service';
import { State } from '../Models/state';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tbl-pre-clients',
  templateUrl: './tbl-pre-clients.component.html',
  styleUrls: ['./tbl-pre-clients.component.scss']
})
export class TblPreClientsComponent implements OnInit {
  private lsPreRequest: PreRequest[];
  private lsPreRequestTMP:PreRequest[];
  //pagination
  p: number = 1;
  private isAwaiting: boolean;
  private lsCanalSecondary: Canal[];
  private frmFilter: FormGroup;
  private oLsVehicleModel: VehicleModel[];
  private oLsStateRequest: State[];
  private oLsFirstCanal: Canal[];
  private oLsSecondCanal: Canal[];

  //Filter visualization
  private filterIdIsVisible: boolean;
  private filterClientIsVisible: boolean;
  private filterVehicleModelIsVisible: boolean;
  private filterStateRequestIsVisible: boolean;
  private filterFirstCanalIsVisible: boolean;
  private filterSecondCanalIsVisible: boolean;
  private isFiltred:boolean;



  constructor(
    private preRequestService: PreRequestServiceService,
    private router: Router,
    private personService: PersonService,
    private canalService: CanalService,
    private vehicleModelService: VehicleModelService,
    private requestService: RequestService
  ) {
    this.isAwaiting = false;

    this.frmFilter = new FormGroup({
      cmbKindOfFilter: new FormControl('Seleccione...'),
      txtValue: new FormControl(''),
      cmbVehicleModel: new FormControl('Seleccione...'),
      cmbStateRequest: new FormControl('Seleccione...'),
      cmbFirstCanal: new FormControl('Seleccione...'),
      cmbSecondCanal: new FormControl('Seleccione...')
    });
  }

  ngOnInit() {
    this.initalizeComponents();
  }

  async initalizeComponents() {
    this.isAwaiting = true;
    this.lsPreRequest = await this.preRequestService.GetAllPreRequest();
    this.lsPreRequestTMP = this.lsPreRequest;
    console.log(this.lsPreRequest);
    this.isAwaiting = false;
    this.lsCanalSecondary = await this.canalService.getCanals(1);
    console.log(this.lsCanalSecondary);
    this.oLsVehicleModel = await this.vehicleModelService.GetAllVehicleModels();
    this.oLsStateRequest = await this.requestService.getParentStates("PRE-CLIENTES");
    let canalGroupPreClient = 1;
    let canalGroupTraditionl = 2;
    this.oLsFirstCanal = await this.canalService.getCanals(canalGroupTraditionl);
    this.oLsSecondCanal = await this.canalService.getCanals(canalGroupPreClient);
    //Filter visualization
    this.filterIdIsVisible = true;
    this.filterClientIsVisible = false;
    this.filterVehicleModelIsVisible = false;
    this.filterStateRequestIsVisible = false;
    this.filterFirstCanalIsVisible = false;
    this.filterSecondCanalIsVisible = false;
    this.isFiltred = false;
  }

  markPreRequestToEdit(pPreRequest: PreRequest) {
    this.ClearDataInMemory();
    this.preRequestService.SetPreRequestToUpdate(pPreRequest);
    this.router.navigate(['/UpdatePreRequest']);
  }

  NewPreRequest() {
    this.ClearDataInMemory();
    this.router.navigate(['/NewPreClientRequest']);
  }

  ClearDataInMemory() {
    this.personService.setPerson(null);
    this.canalService.setSelectedCanal(null);
    this.canalService.SetCanalSocialNetworksSelected(null);
    this.vehicleModelService.SetVehicleModelSelected(null);
    this.requestService.SetStateSelected(null);
  }

  async DeletePreRequest(idPreRequest: number) {
    if (confirm('¿Está seguro que desea eliminar esta solicitud?')) {
      var rta = await this.preRequestService.DeletePreRequestById(idPreRequest.toString());
      if (rta.response) {
        alert(rta.message);
        this.ngOnInit();
      }
    }
  }

  GetCanalDescription(canal_id: number): string {
    if (this.lsCanalSecondary != null) {
      let canal = this.lsCanalSecondary.find(c => c.id == canal_id);
      return canal.description;
    }
  }


  setKindOfFilter() {
    let kindOfFilter = this.frmFilter.controls.cmbKindOfFilter.value;
    console.log(kindOfFilter);
    this.TurnOffFilters();
    switch (kindOfFilter) {
      case 'id':
        this.filterIdIsVisible = true;
        break;
      case 'client':
        this.filterClientIsVisible = true;
        break;
      case 'vehicleModel':
        this.filterVehicleModelIsVisible = true;
        break;
      case 'stateRequest':
        this.filterStateRequestIsVisible = true
        break;
      case 'firstCanal':
       this.filterFirstCanalIsVisible = true;
        break;
      case 'secondCanal':
        this.filterSecondCanalIsVisible = true;
        break;
    }
  }

  verifyContent() {
    let valueOfFilter = this.frmFilter.controls.txtValue.value;
    if (valueOfFilter == "") {
      this.lsPreRequest = this.lsPreRequestTMP;
    }
  }

  filterRequests() {
    this.isFiltred = true;
    let kindOfFilter = this.frmFilter.controls.cmbKindOfFilter.value;
    console.log(kindOfFilter);    
    switch (kindOfFilter) {
      case 'id':
          let idPreRequest = this.frmFilter.controls.txtValue.value;
          this.lsPreRequest = this.lsPreRequestTMP.filter(pr  => pr.id.toString().includes(idPreRequest));
        break;
      case 'client':
          let dataClient = this.frmFilter.controls.txtValue.value;        

          if(isNaN(dataClient)){
            
            this.lsPreRequest = this.lsPreRequestTMP.filter(
              pr  => pr.preClient.name.toUpperCase().includes(dataClient.toUpperCase()) || pr.preClient.lastName.toUpperCase().includes(dataClient.toUpperCase()) || (pr.preClient.email !== null && pr.preClient.email.toUpperCase().includes(dataClient.toUpperCase()) ));
          }else{
            this.lsPreRequest = this.lsPreRequestTMP.filter(
              pr  => (pr.preClient.cellPhone !== null && pr.preClient.cellPhone.includes(dataClient))
            );
          }
        break;
      case 'vehicleModel':
        let idVehicleModel = this.frmFilter.controls.cmbVehicleModel.value;
        this.lsPreRequest = this.lsPreRequestTMP.filter(pr => pr.vehicleModel.id == idVehicleModel);
        break;
      case 'stateRequest':
        let idStateRequest = this.frmFilter.controls.cmbStateRequest.value;
        this.lsPreRequest = this.lsPreRequestTMP.filter(pr => pr.stateRequest.id == idStateRequest);
        break;
      case 'firstCanal':
        let idFirstCanal = this.frmFilter.controls.cmbFirstCanal.value;
        this.lsPreRequest = this.lsPreRequestTMP.filter(pr => pr.firstCanal.id == idFirstCanal);       
        break;
      case 'secondCanal':
        let idSecondCanal = this.frmFilter.controls.cmbSecondCanal.value;
        this.lsPreRequest = this.lsPreRequestTMP.filter( pr => pr.secondCanal.id == idSecondCanal);
        break;
    }

  }

  deleteFilter() {
    this.isFiltred = false;
    this.lsPreRequest = this.lsPreRequestTMP;
    this.ClearFilterForms();
  }

  ClearFilterForms(){
    this.frmFilter.controls.txtValue.setValue('');
  }

  TurnOffFilters() {
    this.filterIdIsVisible = false;
    this.filterClientIsVisible = false;
    this.filterVehicleModelIsVisible = false;
    this.filterStateRequestIsVisible = false;
    this.filterFirstCanalIsVisible = false;
    this.filterSecondCanalIsVisible = false;
  }
}
