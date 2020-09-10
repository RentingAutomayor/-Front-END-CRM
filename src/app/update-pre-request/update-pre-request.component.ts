import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { PreRequest } from '../Models/PreRequest';
import { PreRequestServiceService } from '../Services/pre-request-service.service';
import { DatePipe } from '@angular/common';
import { Person } from '../Models/Person';

import { PersonService } from '../Services/person.service';
import { Canal } from '../Models/canal';
import { CanalService } from '../Services/canal.service';
import { VehicleModel } from '../Models/VehicleModel';
import { VehicleModelService } from '../Services/vehicle-model.service';
import { RequestService } from '../Services/request.service';
import { State } from '../Models/state';

@Component({
  selector: 'app-update-pre-request',
  templateUrl: './update-pre-request.component.html',
  styleUrls: ['./update-pre-request.component.scss']
})
export class UpdatePreRequestComponent implements OnInit {
  private kindOfForm: string;
  private frmRequestIsActive: boolean;
  private frmPersonIsActive: boolean;
  private isAwaiting: boolean;
  private frmRquest: FormGroup;
  private PreRequestToUpdate: PreRequest;
  private sRequestId: string;
  private sRegistrationDate: string;
  constructor(
    private preRequestService: PreRequestServiceService,
    private datePipe: DatePipe,
    private personService: PersonService,
    private canalService: CanalService,
    private vehicleModelService: VehicleModelService,
    private requestService: RequestService
  ) {
    this.frmRquest = new FormGroup({
      txtRequestID: new FormControl(''),
      txtRequestRegistrationDate: new FormControl(''),
    });
  }

  ngOnInit() {
    this.initComponets();
  }

  initComponets() {
    this.kindOfForm = 'PreClient';
    this.frmPersonIsActive = true;
    this.frmRequestIsActive = false;
    this.isAwaiting = false;
    this.sRequestId = "N° Solicitud";
    this.sRegistrationDate = "Fecha de registro";
    this.PreRequestToUpdate = null;
    this.PreRequestToUpdate = this.preRequestService.GetPreRequestToUpdate();
    


    if (this.PreRequestToUpdate != null) {
      this.sRequestId = this.PreRequestToUpdate.id.toString();
      this.sRegistrationDate = this.PreRequestToUpdate.registrationDate.toString().substr(0, 10);
      this.SetDataInMemory(
        this.PreRequestToUpdate.preClient,
        this.PreRequestToUpdate.firstCanal,
        this.PreRequestToUpdate.secondCanal,
        this.PreRequestToUpdate.vehicleModel,
        this.PreRequestToUpdate.stateRequest
      )
    }

  }

  SetDataInMemory(pPerson: Person, pFirstCanal: Canal, pSecondCanal: Canal, pVehicleModel: VehicleModel, stateRequest: State) {
    this.personService.setPerson(pPerson);
    this.canalService.setSelectedCanal(pFirstCanal);
    this.canalService.SetCanalSocialNetworksSelected(pSecondCanal);
    this.vehicleModelService.SetVehicleModelSelected(pVehicleModel);
    this.requestService.SetStateSelected(stateRequest);
  }

  ShowFrmRequest() {
    this.frmPersonIsActive = false;
    this.frmRequestIsActive = true;
  }

  ShowFrmPerson() {
    this.frmPersonIsActive = true;
    this.frmRequestIsActive = false;
  }

}
