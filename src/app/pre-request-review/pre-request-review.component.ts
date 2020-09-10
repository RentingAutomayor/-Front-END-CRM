import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, Navigation } from '@angular/router';
import { NavigationService } from '../Services/navigation.service';
import { PreRequestServiceService } from '../Services/pre-request-service.service';
import { PreRequest } from '../Models/PreRequest';
import { Canal } from '../Models/canal';
import { CanalService } from '../Services/canal.service';
import { Department } from '../Models/department';
import { CityService } from '../Services/city.service';


@Component({
  selector: 'app-pre-request-review',
  templateUrl: './pre-request-review.component.html',
  styleUrls: ['./pre-request-review.component.scss']
})
export class PreRequestReviewComponent implements OnInit {
  private formPerson: FormGroup;
  private preRequest:PreRequest;
  private oLsSecondCanal: Canal[];
  private oLsDepartments: Department[];
  
  constructor(
    private router:Router,
    private navigationService:NavigationService,
    private preRequestService:PreRequestServiceService,
    private canalService:CanalService,
    private cityService:CityService
  ) { 
    this.formPerson = new FormGroup({
      txtIdPreRequest: new FormControl(''),
      txtRegistrationDate: new FormControl(''),
      txtFirstCanal: new FormControl(''),
      txtSecondCanal: new FormControl(''),
      txtVehicleModel: new FormControl(''),
      txtStateRequest: new FormControl(''),
      txtKindOfDocument: new FormControl(''),
      txtDocument: new FormControl(''),
      txtName: new FormControl(''),
      txtLastName: new FormControl(''),
      txtCellphone: new FormControl(''),
      txtPhone: new FormControl(''),
      txtEmail: new FormControl(''),
      txtDepartment: new FormControl(''),
      txtCity: new FormControl('')
    });
  }

  ngOnInit() {
    this.InitComponents();
  }

  async InitComponents(){
    this.preRequest = this.preRequestService.GetPreRequestToReview();
    let canalGroupPreClient = 1;
    this.cityService.getDepartments().subscribe(deptos => this.oLsDepartments = deptos);
    this.oLsSecondCanal = await this.canalService.getCanals(canalGroupPreClient);    
    this.SetDataInForm(this.preRequest);
    
  }

  SetDataInForm(pPreRequest:PreRequest){
    this.formPerson.controls.txtIdPreRequest.setValue(pPreRequest.id);
    let smallDate = pPreRequest.registrationDate.toString().substr(0,10);
    this.formPerson.controls.txtRegistrationDate.setValue(smallDate);
    this.formPerson.controls.txtFirstCanal.setValue(pPreRequest.firstCanal.description);
    let secondCanal = this.oLsSecondCanal.find( sc => sc.id == pPreRequest.secondCanal.id)
    this.formPerson.controls.txtSecondCanal.setValue(secondCanal.description);
    this.formPerson.controls.txtVehicleModel.setValue(pPreRequest.vehicleModel.name);
    this.formPerson.controls.txtStateRequest.setValue(pPreRequest.stateRequest.description);
    
    let kindOfDocument = pPreRequest.preClient.kindOfDocument.description;
    if(kindOfDocument != null){
      this.formPerson.controls.txtKindOfDocument.setValue(kindOfDocument);
    }

    let document = pPreRequest.preClient.id;    
    if(document != null){
      this.formPerson.controls.txtDocument.setValue(document);
    }

    let Name = pPreRequest.preClient.name;
    if(Name != null){
      this.formPerson.controls.txtName.setValue(Name);
    }

    let lastName = pPreRequest.preClient.lastName;
    if(lastName != null){
      this.formPerson.controls.txtLastName.setValue(lastName);
    }

    let cellPhone = pPreRequest.preClient.cellPhone;
    if(cellPhone != null){
      this.formPerson.controls.txtCellphone.setValue(cellPhone);
    }

    let phone = pPreRequest.preClient.phone;
    if(phone != null){
      this.formPerson.controls.txtPhone.setValue(phone);
    }

    let email = pPreRequest.preClient.email;
    if(email != null){
      this.formPerson.controls.txtEmail.setValue(email);
    }

    let departmentId = pPreRequest.preClient.city.departmentId;
    let department = this.oLsDepartments.find(d => d.id == departmentId);
    if(department.name != null){
      this.formPerson.controls.txtDepartment.setValue(department.name.toLowerCase());
    }
    
    let city = pPreRequest.preClient.city.name;
    if(city != null){
      this.formPerson.controls.txtCity.setValue(city);
    }
    
    

  }

  BackToMaster(){
    this.navigationService.SetNavigationElement('nav-pre-clients');
    this.router.navigate(['/MasterPreClients']);
  }

}
