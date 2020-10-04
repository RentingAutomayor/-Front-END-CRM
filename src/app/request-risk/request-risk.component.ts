import { Component, OnInit } from '@angular/core';
import { State } from '../Models/state';
import { RequestService } from '../Services/request.service';
import { RequestRenting } from '../Models/RequestRenting';
import { FormGroup, FormControl } from '@angular/forms';
import { ResponseApi } from '../Models/responseApi';
import { RiskInformation } from '../Models/riskInformation';
import { Router } from '@angular/router';
import { SharedFunctions } from '../shared/sharedFunctions';
import { NavigationService } from '../Services/navigation.service';




@Component({
  selector: 'app-request-risk',
  templateUrl: './request-risk.component.html',
  styleUrls: ['./request-risk.component.scss']
})
export class RequestRiskComponent implements OnInit {

  lsRiskStates: State[];
  isApproved: boolean;
  requestToUpdate: RequestRenting;
  frmRiskInformation: FormGroup;
  numAmmountApproved: string;
  numInputByUser: string;
  sharedFunction:SharedFunctions;


  constructor(
    private requestService: RequestService,
    private navigationService: NavigationService,
    private router: Router
  ) {
    this.isApproved = false;
    this.frmRiskInformation = new FormGroup({
      cmbRiskState: new FormControl('Seleccione ...'),
      txtAmmountApproved: new FormControl(''),
      txtDateApproved: new FormControl(''),
      txtFilingDate: new FormControl('')
    });
  }

  async ngOnInit() {
    this.sharedFunction = new SharedFunctions();
    this.lsRiskStates = await this.requestService.getParentStates("RIESGOS");
    this.requestToUpdate = this.requestService.getRequestToEdit();
    this.numInputByUser = "";

    if (this.requestToUpdate != null) {

      if (this.requestToUpdate.riskInformation != undefined) {
        this.frmRiskInformation.controls.cmbRiskState.setValue(this.requestToUpdate.riskInformation.riskState.id);
console.log(this.requestToUpdate.riskInformation.datefiling);
        if(this.requestToUpdate.riskInformation.datefiling != null){
          this.frmRiskInformation.controls.txtFilingDate.setValue(this.requestToUpdate.riskInformation.datefiling.toString().substr(0,10));
        }
        if (this.requestToUpdate.riskInformation.riskState.description.toUpperCase() == "APROBADO") {
          this.isApproved = true;
          this.frmRiskInformation.controls.txtAmmountApproved.setValue(this.sharedFunction.formatNumber(this.requestToUpdate.riskInformation.ammountApproved.toString()));
          if(this.requestToUpdate.riskInformation.dateApproved != null){
            this.frmRiskInformation.controls.txtDateApproved.setValue(this.requestToUpdate.riskInformation.dateApproved.toString().substr(0,10));
          }
          this.numInputByUser = this.requestToUpdate.riskInformation.ammountApproved.toString();
          this.frmRiskInformation.controls.filingDate
        } else {
          this.isApproved = false;
        }

      }
    } else {
      this.router.navigate(["MasterRequests"]);
      this.navigationService.SetNavigationElement('nav-requests');
    }

  }

  formatAmmountApproved(event: any) {

    console.log(event.key);
    let char = event.key;
    if(char == "Backspace"){
      let numBack = this.numInputByUser.substr(0,this.numInputByUser.length-1);      
      this.numInputByUser = numBack;
    }
    else if (isNaN(char)) {
      char = "";
    } else {
      this.numInputByUser += char;
      console.log(this.numInputByUser);
    }
    this.frmRiskInformation.controls.txtAmmountApproved.setValue(this.numInputByUser);
    let numTmp = this.frmRiskInformation.controls.txtAmmountApproved.value.replace(/\./g, "");

    console.log(numTmp);

    
    let numberFormated = this.sharedFunction.formatNumber(numTmp);
 
    this.frmRiskInformation.controls.txtAmmountApproved.setValue(numberFormated);

  }

  setAmmountApproved() {
    this.frmRiskInformation.controls.txtAmmountApproved.setValue(this.numAmmountApproved.replace(",00", ""));
  }

  setStateRisk(value: any) {
    let state = this.lsRiskStates.find(st => st.id == value);
    if (state.description.toUpperCase() == "APROBADO") {
      this.isApproved = true;
    } else {
      this.isApproved = false;
    }
  }

  async UpdateRequest() {

    let riskState = this.frmRiskInformation.controls.cmbRiskState.value;
    let rskState = new RiskInformation();
    let oRskState = this.lsRiskStates.find(st => st.id == riskState);
    let ammountApproved = this.frmRiskInformation.controls.txtAmmountApproved.value.replace(/\./g,'');
    let dateApprobed = this.frmRiskInformation.controls.txtDateApproved.value;
    let filingDate = this.frmRiskInformation.controls.txtFilingDate.value;
    

    rskState.riskState = oRskState;
    rskState.ammountApproved = ammountApproved;
    rskState.datefiling = filingDate;
    rskState.dateApproved = dateApprobed;
    console.log("[Fecha de radicación]"+filingDate);
    rskState.user = JSON.parse(localStorage.getItem("CurrentUser"));
 
    console.log("Monto aprobado: "+ammountApproved);

    console.log("[Estado de riesgo]");
    console.log(oRskState);


    this.requestToUpdate.riskInformation = rskState;


    console.log(this.requestToUpdate);
    let responseApi = await this.requestService.updateRiskInformation(this.requestToUpdate);

    alert(responseApi.message);
    this.navigationService.SetNavigationElement('nav-requests');
    this.router.navigate(["/MasterRequests"]);
  }

  BackToMaster(){
    this.navigationService.SetNavigationElement('nav-requests');
    this.router.navigate(["/MasterRequests"]);
  }

}
