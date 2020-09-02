import { Component, OnInit, Input, Output, OnChanges, SimpleChange, EventEmitter } from '@angular/core';
import { Contact } from '../Models/contact';
import { FormGroup, FormControl } from '@angular/forms';
import { JobTitlesService } from '../Services/job-titles.service';
import { JobTitle } from '../Models/jobTitle';
import { PersonService } from '../Services/person.service';
import { Person } from '../Models/person';
import { Client } from '../Models/client';
import { ClientService } from '../Services/client.service';
import { Branch } from '../Models/branch';
import { SharedFunctions } from '../shared/sharedFunctions';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  formContact: FormGroup;
  @Input() listOfContacts: Contact[];
  jobTitleSelected: JobTitle;
  owner: Person;
  objClient: Client;
  lsJobtitles: JobTitle[];
  @Output() frmContactIsFinished = new EventEmitter<boolean>();
  @Output() backToFrmClient = new EventEmitter<boolean>();
  @Input() clientWasCreated: boolean;
  @Input() clientWillBeUpdate: boolean;
  oSharedFuntions: SharedFunctions;

  constructor(
    private jobTitleService: JobTitlesService,
    private personService: PersonService,
    private clientService: ClientService
  ) {
    this.formContact = new FormGroup(
      {
        txtName: new FormControl(''),
        txtLastName: new FormControl(''),
        txtCellPhone: new FormControl(''),
        txtPhone: new FormControl(''),
        txtAdress: new FormControl(''),
        txtEmail: new FormControl(''),
      });
  }

  ngOnInit() {
    //this.listOfContacts = [];
    this.owner = new Person();
    this.objClient = new Client();
    this.oSharedFuntions = new SharedFunctions();

  }

  async  addNewContact() {

    var jobTitleDescription = this.jobTitleService.getJobTitleSelected();
    console.log("[Cargo a consultar]");
    console.log(jobTitleDescription);
    let jobTitleVerification = new JobTitle();
    let jobTitleVerified: JobTitle;
    jobTitleVerification.id = 0;
    jobTitleVerification.description = jobTitleDescription;
    jobTitleVerification.state = null;
    jobTitleVerified = await this.jobTitleService.validateJobTitleClient(jobTitleVerification);
    console.log("[Cargo Verificado]");
    console.log(jobTitleVerified);
    this.owner = this.personService.getPerson();
    var client = new Client();
    client.setClient(this.owner, null);

    console.log(this.owner);
    var contact = new Contact();
    //console.log(this.lsJobtitles);

    contact.name = this.formContact.controls.txtName.value;
    contact.lastName = this.formContact.controls.txtLastName.value;
    contact.jobTitle = jobTitleVerified;
    contact.email = this.formContact.controls.txtEmail.value;
    contact.adress = this.formContact.controls.txtAdress.value;
    contact.cellPhone = this.formContact.controls.txtCellPhone.value;
    contact.phone = this.formContact.controls.txtPhone.value;

    let emailOk = this.oSharedFuntions.validateEmail(contact.email);
    let cellPhoneOk = this.oSharedFuntions.validateCellphone(contact.cellPhone);

    if (emailOk && cellPhoneOk) {
      //contact.client = client;
      console.log("[Contacto a añadir]");
      console.log(contact);
      this.listOfContacts.push(contact);
      this.formContact.reset();
      this.jobTitleSelected = new JobTitle();
      this.jobTitleSelected.id = 0;
      this.jobTitleSelected.description = "";
      this.jobTitleService.setJobTitleSelected(this.jobTitleSelected.description);
      this.clientService.setContacts(this.listOfContacts);  
     
      
    } else {
      if (!emailOk) {
        alert("El email que ha ingresado no es válido");
      }
      if (!cellPhoneOk) {
        alert("El número de celular ingresado no es válido");
      }
     
    }


  }

  showFrmRequest() {
    this.frmContactIsFinished.emit(true);
  }

  showFrmClient() {
    this.backToFrmClient.emit(true);
  }





}
