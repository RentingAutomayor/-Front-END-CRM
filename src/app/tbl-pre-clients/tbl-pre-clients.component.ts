import { Component, OnInit } from '@angular/core';
import { PreRequestServiceService } from '../Services/pre-request-service.service';
import { PreRequest } from '../PreRequest';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

import { PersonService } from '../Services/person.service';
import { Canal } from '../canal';
import { CanalService } from '../Services/canal.service';
import { VehicleModel } from '../VehicleModel';
import { VehicleModelService } from '../Services/vehicle-model.service';
import { RequestService } from '../Services/request.service';
import { State } from '../state';

@Component({
  selector: 'app-tbl-pre-clients',
  templateUrl: './tbl-pre-clients.component.html',
  styleUrls: ['./tbl-pre-clients.component.scss']
})
export class TblPreClientsComponent implements OnInit {
  private lsPreRequest: PreRequest[];
  //pagination
  p: number = 1;
  private isAwaiting: boolean;
  private lsCanalSecondary: Canal[];

  constructor(
    private preRequestService: PreRequestServiceService,
    private router: Router,
    private personService: PersonService,
    private canalService: CanalService,
    private vehicleModelService: VehicleModelService,
    private requestService: RequestService
  ) {
    this.isAwaiting = false;
  }

  ngOnInit() {
    this.initalizeComponents();
  }

  async initalizeComponents() {
    this.isAwaiting = true;
    this.lsPreRequest = await this.preRequestService.GetAllPreRequest();
    console.log(this.lsPreRequest);
    this.isAwaiting = false;   
    this.lsCanalSecondary = await  this.canalService.getCanals(1);
    console.log(this.lsCanalSecondary);
  }

  markPreRequestToEdit(pPreRequest:PreRequest){
    this.ClearDataInMemory();
    this.preRequestService.SetPreRequestToUpdate(pPreRequest);
    this.router.navigate(['/UpdatePreRequest']);
  }

  NewPreRequest(){
    this.ClearDataInMemory();
    this.router.navigate(['/NewPreClientRequest']);
  }

  ClearDataInMemory(){
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

  GetCanalDescription(canal_id:number):string{

    if(this.lsCanalSecondary != null){
      let canal = this.lsCanalSecondary.find(c => c.id == canal_id);
      return canal.description;
    }
    
 
  }
}
