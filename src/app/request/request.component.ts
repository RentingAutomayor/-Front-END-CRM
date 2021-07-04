import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Probability } from '../Models/probability';
import { RequestService } from '../Services/request.service';
import { State } from '../Models/state';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../Models/user';
import { UserService } from '../Services/user.service';
import { RequestRenting } from '../Models/RequestRenting';
import { Client } from '../Models/client';
import { Canal} from '../Models/canal';
import { ClientService } from '../Services/client.service';
import { Contact } from '../Models/contact';
import { AllyServiceService } from '../Services/ally-service.service';
import { ResponseApi } from '../Models/responseApi';
import { Router } from '@angular/router';
import { CanalService } from '../Services/canal.service';
import { NavigationService } from '../Services/navigation.service';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  lsProbabilities: Probability[];
  lsParentState: State[];
  lsSecondState: State[];
  lsAccountManagerBank:Contact[];
  lsAccountManagerBankTmp:Contact[];
  frmRequest: FormGroup;
  oSelectedProbability: Probability;
  oSelectedParentState: State;
  oSelectedChildState: State;
  oSelectedUser: User;
  oRequestRenting: RequestRenting;
  oNewRequest: RequestRenting;
  oSelectedAccountManager: Contact;
  @Output() eventBackTofrmContact = new EventEmitter<boolean>();
  oResponseApi : ResponseApi;
  isAwaiting:boolean;
  oUserAuth:User;
  @Input() oRequestToUpdate:RequestRenting;
  isANewRequest:boolean;
  @Input() oCanalSelected:Canal;
  canalGroup_id:number;
  canalClientProspect = 2;
  CANAL_AV_VILLAS = 1;
  isAccountManagerVisible:boolean;



  constructor(
    private requestService: RequestService,
    private userService: UserService,
    private clientService: ClientService,
    private allyService:AllyServiceService,
    private canalService :CanalService,
    private navigationService: NavigationService,
    private router:Router
  ) {
    this.frmRequest = new FormGroup({
      txtInitialDate: new FormControl(''),
      txtLastDate: new FormControl(''),
      cmbAccounManager: new FormControl('Seleccione ...'),
      cmbProbability: new FormControl('Seleccione ...'),
      cmbParentState: new FormControl('Seleccione ...'),
      cmbChildState: new FormControl('Seleccione ...'),
      btnSaveRequest: new FormControl('Guardar solicitud'),
      txtObservation: new FormControl('')
    });

    this.isAccountManagerVisible = false;
  }

  async ngOnInit() {
    
    this.canalGroup_id = this.canalClientProspect;
    this.lsProbabilities = await this.requestService.getProbabilities();
    this.lsParentState = await this.requestService.getParentStates("COMERCIAL");
    this.lsAccountManagerBankTmp = await this.allyService.getAccountmanagers();
    this.lsAccountManagerBank = this.lsAccountManagerBankTmp.filter( acm => acm.state);
    this.isAwaiting = false;
    this.oUserAuth = this.userService.getUserAuth();
    this.isANewRequest = true;

    //this.oRequestToUpdate = this.requestService.getRequestToEdit();

    if(this.oRequestToUpdate != null){
      //alert("Se debe mostrar la información de la solicitud");
      console.log(this.oRequestToUpdate);
      this.setRequestToUpdate(this.oRequestToUpdate);
     
      this.isANewRequest = false;
    }else{
      this.isANewRequest = true;
    }

    this.requestService.setRequestToEdit(null);
  }

  setCanal(){
    let canalSelected = this.canalService.getSelectedCanal();
    if(canalSelected.id == this.CANAL_AV_VILLAS){
      this.isAccountManagerVisible = true;
    }  else{
      this.isAccountManagerVisible = false;
    }  
  }

  setRequestToUpdate(pRequest:RequestRenting){
    //TODO: validate that changes
    if(!pRequest.contact.state){
      this.lsAccountManagerBank.push(pRequest.contact);
    }
    this.frmRequest.controls.cmbAccounManager.setValue(pRequest.contact.id);
    
    if(pRequest.initialDate != null){
      this.frmRequest.controls.txtInitialDate.setValue(pRequest.initialDate.toString().substr(0,10));
    }

    if(pRequest.lastDate != null){
      this.frmRequest.controls.txtLastDate.setValue(pRequest.lastDate.toString().substr(0,10));
    }    
    this.frmRequest.controls.cmbProbability.setValue(pRequest.probability.id);  
    this.frmRequest.controls.cmbParentState.setValue(pRequest.parentState.id);
    console.log(pRequest.childState.id);
    this.changeSecondStates(pRequest.parentState.id) ;
    this.frmRequest.controls.cmbChildState.setValue(pRequest.childState.id);
    this.setAccountManager(pRequest.contact.id);
    this.setProbability(pRequest.probability.id);
    this.setParentState(pRequest.parentState.id);
    this.oSelectedChildState = pRequest.childState;

    this.oCanalSelected = pRequest.canal;
    this.canalService.setSelectedCanal(this.oCanalSelected);
    this.setCanal();
    this.frmRequest.controls.txtObservation.setValue(pRequest.observation);

  }

  async changeSecondStates(obj: any) {
    this.lsSecondState = await   this.requestService.getStatesByParent(obj);
    this.setParentState(obj);

  }

  setProbability(idProbability: any) {
    this.oSelectedProbability = this.lsProbabilities.find(p => p.id == idProbability);
  }

  setParentState(idParentState: number) {
    this.oSelectedParentState = this.lsParentState.find(ps => ps.id == idParentState);
  }

  setChildState(idChildState: number) {
    this.oSelectedChildState = this.lsSecondState.find(cs => cs.id == idChildState);
  }

  setAccountManager(idAccountManager: number){
    this.oSelectedAccountManager = this.lsAccountManagerBank.find(acm => acm.id == idAccountManager);
    if(!this.oSelectedAccountManager.state){
      this.oSelectedAccountManager.state = true;
    }
  }

  async saveRequest() {
    this.isAwaiting = true;
    this.frmRequest.controls.btnSaveRequest.disable();
    let txtInitialDate = this.frmRequest.controls.txtInitialDate.value;
    let txtLastDate = this.frmRequest.controls.txtLastDate.value;
    this.oSelectedUser =  this.oUserAuth;
    let oClient = this.clientService.getClientCreated();
    this.oRequestRenting = new RequestRenting();
    this.oRequestRenting.initialDate = txtInitialDate;
    this.oRequestRenting.lastDate = txtLastDate;
    this.oRequestRenting.probability = this.oSelectedProbability;
    this.oRequestRenting.parentState = this.oSelectedParentState;
    this.oRequestRenting.childState = this.oSelectedChildState;
    this.oRequestRenting.user = this.oSelectedUser;
    this.oRequestRenting.client = oClient;
    this.oRequestRenting.contact = this.oSelectedAccountManager;

    let oCanalSelected = this.canalService.getSelectedCanal();


    this.oRequestRenting.canal = oCanalSelected;
    this.oRequestRenting.observation = this.frmRequest.controls.txtObservation.value;

    console.log(this.oRequestRenting);

    if(this.isANewRequest){
      this.oResponseApi = await this.requestService.addNewRequest(this.oRequestRenting);
    }
    else{
      this.oRequestRenting.id = this.oRequestToUpdate.id;     
      this.oResponseApi = await this.requestService.updateRequest(this.oRequestRenting);
    }
   

    if(this.oResponseApi.response){
      alert(this.oResponseApi.message);

    }
    this.isAwaiting = false;
    this.navigationService.SetNavigationElement('nav-requests');
    this.router.navigate(['/MasterRequests']);


  }

  backToFrmContact() {
    this.eventBackTofrmContact.emit(true);
  }



}
