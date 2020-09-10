import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Canal } from '../Models/canal';
import { CanalService } from '../Services/canal.service';
import { VehicleModel } from '../Models/VehicleModel';
import { VehicleModelService } from '../Services/vehicle-model.service';
import { State } from '../Models/state';
import { RequestService } from '../Services/request.service';
import { PreRequest } from '../Models/PreRequest';
import { PreClient } from '../Models/PreClient';
import { PersonService } from '../Services/person.service';
import { UserService } from '../Services/user.service';
import { PreRequestServiceService } from '../Services/pre-request-service.service';
import { Router, Route } from '@angular/router';
import { PreclientServiceService } from '../Services/preclient-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PreRequestObservation } from '../Models/PreRequestObservation';

@Component({
  selector: 'app-request-pre-client',
  templateUrl: './request-pre-client.component.html',
  styleUrls: ['./request-pre-client.component.scss']
})
export class RequestPreClientComponent implements OnInit {
  private CanalGroupNaturalPerson: number;
  private CanalGroupPrincipal: number;
  private stateGroup: string;
  @Output() frmPersonCombeBack = new EventEmitter<boolean>();
  private oCanalSelected: Canal;
  private oCanalSocialNetwork: Canal;
  private oVehicleModelSelected: VehicleModel;
  private oStateSelected: State;
  private oPreRequest: PreRequest;
  private isAwaiting: boolean;
  @Input() isFrmToUpdate: boolean;
  private frmPreRequest: FormGroup;
  private listObservation: PreRequestObservation[];
  private Observation:PreRequestObservation;


  constructor(
    private canalService: CanalService,
    private vehicleModelService: VehicleModelService,
    private requestService: RequestService,
    private personService: PersonService,
    private userService: UserService,
    private preRequestService: PreRequestServiceService,
    private router: Router,
    private preClientService: PreclientServiceService

  ) {
    this.CanalGroupNaturalPerson = 1; // Grupos de pre cliente
    this.CanalGroupPrincipal = 2; // Grupo de principal
    this.stateGroup = "PRE-CLIENTES";
    this.frmPreRequest = new FormGroup({
      txtObservation: new FormControl('')
    });
  }

  ngOnInit() {
    this.GetValues();
  }

  GetValues() {
    this.oCanalSelected = this.canalService.getSelectedCanal();
    this.oCanalSocialNetwork = this.canalService.GetCanalSocialNetworksSelected();
    this.oVehicleModelSelected = this.vehicleModelService.GetVehicleModelSelected();
    this.oStateSelected = this.requestService.GetStateSelected();
    this.isAwaiting = false;
   
    let preRequest = this.preRequestService.GetPreRequestToUpdate();
    if(preRequest != null){
      if(preRequest.lsObservation != null){
        this.listObservation = preRequest.lsObservation;
      }
    }   
    this.Observation = new PreRequestObservation();
    this.Observation.observation = this.frmPreRequest.controls.txtObservation.value;
  }

  ComeBackPerson() {
    this.frmPersonCombeBack.emit(true);
  }

  async SavePreClientRequest() {
    let objPerson = this.personService.getPerson();
    let oPreClient = new PreClient();
    oPreClient.id = objPerson.id;
    oPreClient.kindOfDocument = objPerson.kindOfDocument;
    oPreClient.name = objPerson.name;
    oPreClient.lastName = objPerson.lastName;
    oPreClient.phone = objPerson.phone;
    oPreClient.cellPhone = objPerson.cellPhone;
    oPreClient.email = objPerson.email;
    oPreClient.city = objPerson.city;

    this.GetValues();
    let StateRequest = new State();
    StateRequest = this.oStateSelected;

    let firstCanal = new Canal();
    firstCanal = this.oCanalSelected;

    let secondCanal = new Canal()
    secondCanal = this.oCanalSocialNetwork;

    let vehicleModel = new VehicleModel();
    vehicleModel = this.oVehicleModelSelected;

    let lsObservation = [];
    if(this.Observation.observation != null){      
      lsObservation.push(this.Observation);
    }

    let objPreRequest = new PreRequest();
    objPreRequest.preClient = oPreClient;
    objPreRequest.stateRequest = StateRequest;
    objPreRequest.vehicleModel = vehicleModel;
    objPreRequest.firstCanal = firstCanal;
    objPreRequest.secondCanal = secondCanal;
    objPreRequest.user = this.userService.getUserAuth();
    objPreRequest.lsObservation = lsObservation;    

    console.warn("Pre - Request a crear:");
    console.log(objPreRequest);

    let rta = null;
    this.isAwaiting = true;

    if (this.isFrmToUpdate) {
      //TODO: Update preClient IF this have one o more changes
      let preClientBdTmp = this.preClientService.GetPreClientBD();
      console.error("Cliente extraido de la bd");
      console.log(preClientBdTmp);
      
      let preClientBD = new PreClient();
      
      if(preClientBdTmp != null){
        preClientBD = preClientBdTmp;        
      }else{
        preClientBD = this.preRequestService.GetPreRequestToUpdate().preClient;
      }       

      console.error("Validación de actualización de cliente en la bd");
      console.log(preClientBD);
      console.log(objPreRequest.preClient);


      let personHasChanges = this.personService.ValidateChanges(preClientBD, objPreRequest.preClient);
      if (personHasChanges) {
        console.log("El pre-cliente tiene cambios en su composición");
        objPreRequest.preClient.idPreClient = preClientBD.idPreClient;
        let rtaUpdatePreClient = await this.preClientService.UpdatePreClient(objPreRequest.preClient);
        if (rtaUpdatePreClient.response) {
          console.log(rtaUpdatePreClient.message);
        }
      }

      objPreRequest.preClient = preClientBD;


      objPreRequest.id = this.preRequestService.GetPreRequestToUpdate().id;
      console.log(objPreRequest);

      rta = await this.preRequestService.UpdatePreRequest(objPreRequest);
    } else {
      //TODO: Include logic to update pre client
      rta = await this.preRequestService.AddPreRequest(objPreRequest);
    }
    this.isAwaiting = false;

    if (rta.response) {
      alert(rta.message);
      this.ClearDataInMemory();
      this.router.navigate(["/MasterPreClients"]);

    }

  }

  ClearDataInMemory() {
    this.personService.setPerson(null);
    this.canalService.setSelectedCanal(null);
    this.canalService.SetCanalSocialNetworksSelected(null);
    this.vehicleModelService.SetVehicleModelSelected(null);
    this.requestService.SetStateSelected(null);
    this.preClientService.SetPreClientBD(null);
  }

  ComeBactToTable() {
    if (confirm("¿Está seguro que desea cancelar?")) {
      this.ClearDataInMemory();
      this.router.navigate(['/MasterPreClients']);
    }
  }
}
