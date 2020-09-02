import { Component, OnInit } from '@angular/core';
import { RequestRenting } from '../Models/RequestRenting';
import { RequestService } from '../Services/request.service';
import { FormGroup, FormControl } from '@angular/forms';
import { OperationalInformation } from '../Models/operationalInformation';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SharedFunctions } from '../shared/sharedFunctions';
import { State } from '../Models/state';
import { NavigationService } from '../Services/navigation.service';
@Component({
  selector: 'app-request-operation',
  templateUrl: './request-operation.component.html',
  styleUrls: ['./request-operation.component.scss']
})
export class RequestOperationComponent implements OnInit {
  requestToUpdate: RequestRenting;
  frmOperationalInformation: FormGroup;
  datePipe: DatePipe;
  inputAmmount: string;
  inputQuantity: string;
  sharedFunctions: SharedFunctions;
  lsParentState: State[];
  lsSecondState: State[];
  oSelectedParentState: State;
  oSelectedChildState: State;

  constructor(
    private requestService: RequestService,
    private navigationService:NavigationService,
    private router: Router
  ) {
    this.frmOperationalInformation = new FormGroup({
      txtDeliveredVehicles: new FormControl(''),
      txtDeliveredAmmount: new FormControl(''),
      txtLegalizationDate: new FormControl(''),
      txtDeliveredDate: new FormControl(''),
      cmbParentState: new FormControl(''),
      cmbChildState: new FormControl('')
    });
  }

  async ngOnInit() {
    this.sharedFunctions = new SharedFunctions();
    this.inputAmmount = "";
    this.inputQuantity = "";
    this.requestToUpdate = this.requestService.getRequestToEdit();
    this.lsParentState = await this.requestService.getParentStates("OPERACIONES");

    if (this.requestToUpdate != null) {

      console.log(this.requestToUpdate.parentState);

      let pState = this.lsParentState.find( s=> s.id == this.requestToUpdate.parentState.id);
      if(pState == null){
        this.frmOperationalInformation.controls.cmbParentState.setValue(0);       
      }else{
        this.frmOperationalInformation.controls.cmbParentState.setValue(pState.id);
        this.lsSecondState = await this.requestService.getStatesByParent(pState.id);
        let chState = this.lsSecondState.find(s => s.id == this.requestToUpdate.childState.id);
        (chState == null)?this.frmOperationalInformation.controls.cmbChildState.setValue(0):this.frmOperationalInformation.controls.cmbChildState.setValue(chState.id);
      }

    
      //this.frmOperationalInformation.controls.cmbParentState.setValue()

      if (this.requestToUpdate.operationalInformation != undefined) {
        this.inputAmmount = this.requestToUpdate.operationalInformation.deliveredAmmount.toString();
        let ammountDelivered = this.sharedFunctions.formatNumber(this.requestToUpdate.operationalInformation.deliveredAmmount.toString());

        this.inputQuantity = this.requestToUpdate.operationalInformation.deliveredVehicles.toString();
        let quantityDelivered = this.sharedFunctions.formatNumber(this.requestToUpdate.operationalInformation.deliveredVehicles.toString());

        this.frmOperationalInformation.controls.txtDeliveredVehicles.setValue(quantityDelivered);
        this.frmOperationalInformation.controls.txtDeliveredAmmount.setValue(ammountDelivered);
        console.log(this.requestToUpdate.operationalInformation.legalizationDate);
        let legalizationDate = this.requestToUpdate.operationalInformation.legalizationDate.toString().substr(0, 10);


        this.frmOperationalInformation.controls.txtLegalizationDate.setValue(legalizationDate);
        let deliveredDate = this.requestToUpdate.operationalInformation.deliveredDate.toString().substr(0, 10);

        this.frmOperationalInformation.controls.txtDeliveredDate.setValue(deliveredDate);
      }
    } else {
      this.router.navigate(["MasterRequests"]);
    }
  }

  async UpdateRequest() {

    console.log(this.frmOperationalInformation.controls.txtDeliveredVehicles.value);
    console.log(this.frmOperationalInformation.controls.txtDeliveredAmmount.value);

    let opInf = new OperationalInformation();
    opInf.deliveredVehicles = this.frmOperationalInformation.controls.txtDeliveredVehicles.value.replace(/\./g, '');
    opInf.deliveredAmmount = this.frmOperationalInformation.controls.txtDeliveredAmmount.value.replace(/\./g, '');
    opInf.legalizationDate = this.frmOperationalInformation.controls.txtLegalizationDate.value;
    opInf.deliveredDate = this.frmOperationalInformation.controls.txtDeliveredDate.value;
    opInf.user = JSON.parse(localStorage.getItem("CurrentUser"));

    this.requestToUpdate.parentState = this.oSelectedParentState;
    this.requestToUpdate.childState = this.oSelectedChildState;
    this.requestToUpdate.operationalInformation = opInf;

    let response = await this.requestService.updateOperationalInformation(this.requestToUpdate);
    alert(response.message);
    this.navigationService.SetNavigationElement('nav-requests');
    this.router.navigate(["/MasterRequests"]);

  }

  setAmmountDelivered(event: any) {
    console.log(event.key);
    let char = event.key;

    if (char == "Backspace") {
      let numBack = this.inputAmmount.substr(0, this.inputAmmount.length - 1);
      this.inputAmmount = numBack;
    }
    else if (isNaN(char)) {
      char = "";
    } else {
      this.inputAmmount += char;
      console.log(this.inputAmmount);
    }

    let numberFormated = this.sharedFunctions.formatNumber(this.inputAmmount);
    console.log(numberFormated);
    this.frmOperationalInformation.controls.txtDeliveredAmmount.setValue(numberFormated);
  }

  setQuantityDelivered(event: any) {
    console.log(event.key);
    let char = event.key;

    if (char == "Backspace") {
      let numBack = this.inputQuantity.substr(0, this.inputQuantity.length - 1);
      this.inputQuantity = numBack;
    }
    else if (isNaN(char)) {
      char = "";
    } else {
      this.inputQuantity += char;
      console.log(this.inputQuantity);
    }

    let numberFormated = this.sharedFunctions.formatNumber(this.inputQuantity);
    console.log(numberFormated);
    this.frmOperationalInformation.controls.txtDeliveredVehicles.setValue(numberFormated);
  }

  async changeSecondStates(obj: any) {
    if(obj != 0){
      this.lsSecondState = await this.requestService.getStatesByParent(obj);
    }
    
    this.setParentState(obj);
  }

  setChildState(idChildState: number) {
    this.oSelectedChildState = this.lsSecondState.find(cs => cs.id == idChildState);
  }


  setParentState(idParentState: number) {
    this.oSelectedParentState = this.lsParentState.find(ps => ps.id == idParentState);
  }

  BackToMaster(){
    this.navigationService.SetNavigationElement('nav-requests');
    this.router.navigate(["/MasterRequests"]);
  }

}
