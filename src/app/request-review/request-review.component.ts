import { Component, OnInit } from '@angular/core';
import { RequestRenting } from '../Models/RequestRenting';
import { RequestService } from '../Services/request.service';
import { Router } from '@angular/router';
import { SharedFunctions } from '../shared/sharedFunctions';
import { NavigationService } from '../Services/navigation.service';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.scss']
})
export class RequestReviewComponent implements OnInit {
  request: RequestRenting;
  RiskState: String;
  DateFiling:String;
  ApprovedAmmount: string;
  DateApproved:string;
  LegalizationDate: string;
  DeliveredDate: string;
  sharedFunctions:SharedFunctions;
  constructor(
    private requestService: RequestService,
    private navigationService: NavigationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sharedFunctions = new SharedFunctions();
    this.request = this.requestService.getRequestToView();

    if (this.request != null) {
     // console.warn(this.request);

      if (this.request.riskInformation == null) {
        this.RiskState = "Sin definir ...";
        this.ApprovedAmmount = "0";
        this.DateApproved = "Sin fecha de aprobación ..."; 
        this.DateFiling = "Sin fecha de radicación ..."       ;
      } else {
        this.RiskState = this.request.riskInformation.riskState.description;
        this.ApprovedAmmount = this.sharedFunctions.formatNumber(this.request.riskInformation.ammountApproved.toString());        
        this.DateApproved = (this.request.riskInformation.dateApproved == null) ? "Sin fecha de aprobación" : this.request.riskInformation.dateApproved.toString().substr(0,10);
        this.DateFiling = (this.request.riskInformation.datefiling == null) ? "Sin fecha de radicación" : this.request.riskInformation.datefiling.toString().substr(0,10);
      }

      if (this.request.operationalInformation == null) {
        this.LegalizationDate = "Sin fecha de legalización...";
        this.DeliveredDate = "Sin fecha de entrega...";
      } else {
        this.LegalizationDate = (this.request.operationalInformation.legalizationDate == null) ? "Sin fecha de legalización ..." : this.request.operationalInformation.legalizationDate.toString().substr(0, 10);
        this.DeliveredDate = (this.request.operationalInformation.deliveredDate == null) ? "Sin fecha de entrega ..." : this.request.operationalInformation.deliveredDate.toString().substr(0, 10);
      }
    } else {
      this.router.navigate(["MasterRequests"]);
    }
  }

  validateLastName(lastname:string):string{
    if(lastname == null){
      return '';
    }else{
      return lastname;
    }
  }

  BackToMaster(){
    this.navigationService.SetNavigationElement('nav-requests');
    this.router.navigate(["MasterRequests"]);
  }
}
