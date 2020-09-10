import { Component, OnInit } from '@angular/core';
import { PreRequestServiceService } from '../Services/pre-request-service.service';
import { PreRequest } from '../Models/PreRequest';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, Navigation } from '@angular/router';

import { PersonService } from '../Services/person.service';
import { Canal } from '../Models/canal';
import { CanalService } from '../Services/canal.service';
import { VehicleModel } from '../Models/VehicleModel';
import { VehicleModelService } from '../Services/vehicle-model.service';
import { RequestService } from '../Services/request.service';
import { State } from '../Models/state';
import { FormGroup, FormControl } from '@angular/forms';
import { NavigationService } from '../Services/navigation.service';

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
  private filterRegistrationDateIsVisible: boolean;
  private isFiltred:boolean;



  constructor(
    private preRequestService: PreRequestServiceService,
    private router: Router,
    private personService: PersonService,
    private canalService: CanalService,
    private vehicleModelService: VehicleModelService,
    private requestService: RequestService,
    private navigationService:NavigationService
  ) {
    this.isAwaiting = false;

    this.frmFilter = new FormGroup({
      cmbKindOfFilter: new FormControl('Seleccione...'),
      txtValue: new FormControl(''),
      cmbVehicleModel: new FormControl('Seleccione...'),
      cmbStateRequest: new FormControl('Seleccione...'),
      cmbFirstCanal: new FormControl('Seleccione...'),
      cmbSecondCanal: new FormControl('Seleccione...'),
      txtRegistrationDate: new FormControl('')
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
    this.filterRegistrationDateIsVisible = false;
    this.isFiltred = false;
  }

  async markPreRequestToEdit(pPreRequest_Id: any) {
    this.ClearDataInMemory();
    this.isAwaiting = true;
    let PreRequestBD = await this.preRequestService.GetPreRequestByID(pPreRequest_Id);
    this.isAwaiting = false;
    this.preRequestService.SetPreRequestToUpdate(PreRequestBD);
    this.navigationService.SetNavigationElement('nav-pre-clients');
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
        //alert(rta.message);
        this.lsPreRequest = await this.preRequestService.GetAllPreRequest();
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
      case 'registrationDate':
        this.filterRegistrationDateIsVisible = true;
        break;
    }
  }

  verifyContent() {
    let valueOfFilter = this.frmFilter.controls.txtValue.value;
    if (valueOfFilter == "") {
      this.lsPreRequest = this.lsPreRequestTMP;
    }
  }

  async filterRequests() {
    this.isFiltred = true;
    let kindOfFilter = this.frmFilter.controls.cmbKindOfFilter.value;
    console.log(kindOfFilter); 
    let filteredValue ="";   
    switch (kindOfFilter) {
      case 'id':
        filteredValue = this.frmFilter.controls.txtValue.value;          
        break;
      case 'client':
          filteredValue= this.frmFilter.controls.txtValue.value;       
        break;
      case 'vehicleModel':
        filteredValue = this.frmFilter.controls.cmbVehicleModel.value;        
        break;
      case 'stateRequest':
        filteredValue = this.frmFilter.controls.cmbStateRequest.value;        
        break;
      case 'firstCanal':
        filteredValue = this.frmFilter.controls.cmbFirstCanal.value;        
        break;
      case 'secondCanal':
        filteredValue = this.frmFilter.controls.cmbSecondCanal.value;        
        break;
      case 'registrationDate':
        filteredValue = this.frmFilter.controls.txtRegistrationDate.value;
        filteredValue = filteredValue.replace(/-/g,'/');
        break;
    }
    this.isAwaiting = true;
    this.lsPreRequest = await this.preRequestService.GetPreRequestByFilter(kindOfFilter,filteredValue);
    this.isAwaiting = false;
  }

  async deleteFilter() {
    this.isFiltred = false;
    this.isAwaiting = true;
    this.lsPreRequest = await this.preRequestService.GetAllPreRequest();
    this.isAwaiting = false;
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
    this.filterRegistrationDateIsVisible = false;
  }

  async ViewRequestReview(pPreRequest_id:number){
    let PreRequestDB = await this.preRequestService.GetPreRequestByID(pPreRequest_id);
    this.preRequestService.SetPreRequestToReview(PreRequestDB);
    this.navigationService.SetNavigationElement('nav-pre-clients');
    this.router.navigate(['/PreRequestReview']);
  }
}
