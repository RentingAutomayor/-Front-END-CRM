import { Component, OnInit, HostBinding, ɵConsole, Input,Output,EventEmitter,OnChanges,SimpleChange} from '@angular/core';
import { PersonService } from '../Services/person.service';
import { Person } from '../Models/person';
import { Client } from '../Models/client';
import { ClientService } from '../Services/client.service';
import { EconomicActivity } from '../Models/EconomicActivity';
import { EconomicActivityService } from '../Services/economic-activity.service';
import { Contact } from '../Models/contact';
import { concat } from 'rxjs';
import { Canal } from '../Models/canal';
import { CanalService } from '../Services/canal.service';
import { FormControl } from '@angular/forms';
import { ResponseApi } from '../Models/responseApi';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  animations: [
    //Las animaciones van aqui
  ]
})
export class ClientComponent implements OnInit {
  isNaturalPerson: boolean;
  oPerson: Person;
  oClient: Client;
  lsCli: Client[];
  oEconomicActivity: EconomicActivity;
  lsContacts: Contact[];
  kindOfForm: string;

  @Output() formContactsWasFinish = new EventEmitter<boolean>();
  @Output() backToFrmClient = new EventEmitter<boolean>();
  @Input() frmContactIsBack:boolean;
  @Input() oClientToUpdate:Client;
  bClientWillBeUpdate:boolean;

  responseApi:ResponseApi;


  frmClientIsActive:boolean;
  frmContactsIsActive:boolean;
  dataClientIsFinished:boolean;

  frmClientBack:boolean;
  isAwaiting:boolean;
  oCanal: Canal;
  oClientCreated: Client;
  btnSaveClient = new FormControl('Guardar cliente');

  clientWasCreated:boolean;


  constructor(
    private personService: PersonService,
    private economicActivityService: EconomicActivityService,
    private clientService: ClientService,
    private canalService: CanalService
  ) { 
    this.lsContacts = [];
  }

  ngOnInit() {
    this.isNaturalPerson = this.personService.getIsNaturalPerson();
    this.kindOfForm = "client";
    this.frmClientIsActive = true ;
    this.frmContactsIsActive = false;
    this.dataClientIsFinished = false;
    this.frmClientBack = false;
    this.isAwaiting = false;
    this.clientWasCreated=false;

    if(this.frmContactIsBack){
      this.frmContactsIsActive = true;
      this.frmClientIsActive = false;
      alert("Está funcionando el back");
    }

    if(this.oClientToUpdate != null){
      this.frmClientBack = true;
      this.clientService.setClientTmp(this.oClientToUpdate);
      this.bClientWillBeUpdate = true;
      this.clientService.setContacts(this.oClientToUpdate.lsContacts);
    }else{
      this.bClientWillBeUpdate = false;
    }
    
  }

  async saveClient() {  
   

    this.oClient = new Client();
    this.oClient = this.clientService.getClientTmp();
    

    // console.log("[Cliente a ser creado] = ");
    console.log(this.oClient);
    console.log("Documento a buscar: "+this.oClient.id);
    let existClient :boolean;
    existClient = await this.clientService.existsClientInBD(this.oClient.id);


    if (!existClient) {    
      this.isAwaiting = true;
      this.lsContacts = this.clientService.getContacts();
      console.warn("[Validaciones de la sección de contactos]");
      console.log(this.oClient);
      console.log("Contactos");
      console.log(this.lsContacts);
      
      this.oClient.lsContacts =  this.lsContacts;
      this.responseApi = await this.clientService.addClient(this.oClient);

      if(this.responseApi.response){       
        alert(this.responseApi.message);
      }
      this.isAwaiting = false;
     
    }else{
      this.oClient.lsContacts = this.clientService.getContacts();

      console.log("El Cliente ya existe en la BD");
      console.log(this.oClient);

      console.log(this.oClient.lsContacts);

      let clientWasModified = this.clientService.getClientWasModified();
      if(clientWasModified){
        console.log("Aqui se debe mandar a actualizar el cliente");
        let rtaUpdate = await this.clientService.updateClient(this.oClient);

        console.warn("[Contanctos por cliente a actualizar]");
        console.log(this.oClient.lsContacts);

        if(rtaUpdate.response){
          alert(rtaUpdate.message);
        }
      }
      this.lsContacts = await this.clientService.getContactsByClient(this.oClient.id);
    }
    this.clientService.setClientCreated(this.oClient);

    this.btnSaveClient.disable();
    this.clientWasCreated = true;
  }

  async onClientSetted(pClient: Client) {
    console.warn("Cliente seteado:");
    console.log(pClient);
    this.lsContacts = null;
    this.lsContacts = await this.clientService.getContactsByClient(pClient.id);
    console.log("[Contactos]")
    console.log(this.lsContacts)
    
  }

  showFrmContacts(value:boolean){
    this.frmClientIsActive = false;
    this.frmContactsIsActive = true;
  }

  showFrmRequest(){  
   
    this.frmClientIsActive = false;
    this.frmContactsIsActive = false;
    this.dataClientIsFinished = true;
    this.formContactsWasFinish.emit(true);
  }

  onShowFrmClient(){
    this.frmClientIsActive = true;
    this.frmContactsIsActive = false;
    this.dataClientIsFinished = false;
    //let client =  this.clientService.get
    console.warn("[Persona Back]");
    //console.log(person);
    this.frmClientBack = true;
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log("Funciona el back para cliente - contactos");
    console.log(changes);

    for (let propName in changes) {
      if(propName == "frmContactIsBack"){
        console.log("Funcionó el back de solicitud a contacto");
        this.frmContactsIsActive = true;
        this.frmClientIsActive = false;
        this.dataClientIsFinished = false;
      }
    }
   
  }

}
