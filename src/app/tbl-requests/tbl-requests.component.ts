import { Component, OnInit } from '@angular/core';
import { RequestRenting } from '../requestRenting';
import { RequestService } from '../Services/request.service';
import { User } from '../user';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { ModulesByApp, PermissionType } from '../Enums';
import { FormGroup, FormControl } from '@angular/forms';
import { Probability } from '../probability';
import { State } from '../state';
import { ResponseApi } from '../responseApi';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-tbl-requests',
  templateUrl: './tbl-requests.component.html',
  styleUrls: ['./tbl-requests.component.scss']
})
export class TblRequestsComponent implements OnInit {
  lsRequest: RequestRenting[];
  lsRequestTemp: RequestRenting[];
  RequestToDelete: RequestRenting;
  RequestToEdit: RequestRenting;
  isAwaiting: boolean;
  userAuth: User;
  frmFilter: FormGroup;

  //Permisos
  insertIsAllowed: boolean;
  updateIsAllowed: boolean;
  readIsAllowed: boolean;
  deleteIsAllowed: boolean;
  updateRiskIsAllowed: boolean;
  updateOperationsIsAllowed: boolean;
  exportFileIsAllowed:boolean;

  //Filtros
  filterIdIsVisible: boolean;
  filterClientIsVisible: boolean;
  filterProbabilityIsVisible: boolean;
  filterUserIsVisible: boolean;
  filterParentStateIsVisbible: boolean;
  filterChildStateIsVisible: boolean;
  filterRegistrationDateIsVisible: boolean;

  isFiltred: boolean;

  //Lista de filtros
  oLsProbabilities: Probability[];
  oLsUsers: User[];
  oLsParentStates: State[];
  oLsChildState: State[];

  //pagination
  p:number = 1;

  constructor(
    private requestService: RequestService,
    private userService: UserService,
    private router: Router
  ) {
    this.frmFilter = new FormGroup({
      cmbKindOfFilter: new FormControl('Seleccione...'),
      txtValue: new FormControl(''),
      cmbProbability: new FormControl('Seleccione...'),
      cmbUser: new FormControl('Seleccione...'),
      cmbParentState: new FormControl('Seleccione...'),
      cmbChildState: new FormControl('Seleccione...'),
      txtRegistrationDate: new FormControl('Seleccione...')
    });
  }

  async ngOnInit() {
    this.isAwaiting = false;
    this.loadRequest();
    this.userAuth = this.userService.getUserAuth();

    this.readIsAllowed = false;
    this.updateIsAllowed = false;
    this.insertIsAllowed = false;
    this.deleteIsAllowed = false;
    this.updateRiskIsAllowed = false;
    this.updateOperationsIsAllowed = false;
    this.exportFileIsAllowed = false;

    //Visibilidad de filtros
    this.filterIdIsVisible = true;
    this.filterClientIsVisible = false;
    this.filterProbabilityIsVisible = false;
    this.filterUserIsVisible = false;
    this.filterParentStateIsVisbible = false;
    this.filterChildStateIsVisible = false;
    this.filterRegistrationDateIsVisible = false;
    this.isFiltred = false;
    //Llenado de listas
    this.oLsProbabilities = await this.requestService.getProbabilities();
    this.userService.getUsersByArea("COMERCIAL").subscribe(lsu => this.oLsUsers = lsu);
    this.oLsParentStates = await this.requestService.getParentStates("TODOS");
    this.oLsChildState = await this.requestService.getStatesByParent(0);
    

    console.log(this.userAuth);

    if (this.userAuth != undefined) {
      //alert("El usuario si se encentra autenticado");
      for (let permissionByMod of this.userAuth.rol.permissionByModule) {
        //console.log(permissionByMod);

        if (permissionByMod.module.id == ModulesByApp.REQUESTS) {
          //console.log(permissionByMod.module.name);
          if (permissionByMod.permission.id == PermissionType.READ) {
            this.readIsAllowed = true;
          }

          if (permissionByMod.permission.id == PermissionType.UPDATE) {
            this.updateIsAllowed = true;
          }

          if (permissionByMod.permission.id == PermissionType.INSERT) {
            this.insertIsAllowed = true;
          }

          if (permissionByMod.permission.id == PermissionType.DELETE) {
            this.deleteIsAllowed = true;
          }

          if(permissionByMod.permission.id == PermissionType.EXPORT){
            this.exportFileIsAllowed = true;
          }
        }

        if (permissionByMod.module.id == ModulesByApp.RISKS) {
          if (permissionByMod.permission.id == PermissionType.UPDATE) {
            this.updateRiskIsAllowed = true;
          }
        }

        if (permissionByMod.module.id == ModulesByApp.OPERATIONS) {
          if (permissionByMod.permission.id == PermissionType.UPDATE) {
            this.updateOperationsIsAllowed = true;
          }
        }
      }
    } else {
      alert("No se encuentra autenticado");
      this.router.navigate(['/Login']);
    }

  }

  async loadRequest() {
    this.isAwaiting = true;
    this.lsRequest = await this.requestService.getAllRequest();
    this.isAwaiting = false;
    console.log(this.lsRequest);
    this.lsRequestTemp = this.lsRequest;
    
  }

  async deleteRequest() {
    //alert(pRequest_id);
    let rta: RequestRenting;
    rta = await this.requestService.deleteRequest(this.RequestToDelete);
    this.lsRequest = await this.requestService.getAllRequest();
  }

  markRequestToDelete(pRequest: RequestRenting) {
    this.RequestToDelete = pRequest;
  }

  markRequestToEdit(pRequest: RequestRenting) {
    this.RequestToEdit = pRequest;
  }

  setRequestToEdit() {
    this.requestService.setRequestToEdit(this.RequestToEdit);
  }

  viewRequestReview(pRequest: RequestRenting) {
    this.requestService.setRequestToView(pRequest);
    this.router.navigate(["/RequestReview"]);

  }

  setKindOfFilter() {
    let kindOfFilter = this.frmFilter.controls.cmbKindOfFilter.value;
    if (kindOfFilter == 'id') {
      this.turnOffFilters();
      this.filterIdIsVisible = true;
    } else if (kindOfFilter == 'client') {
      this.turnOffFilters();
      this.filterClientIsVisible = true;
    } else if (kindOfFilter == 'probability') {
      this.turnOffFilters();
      this.filterProbabilityIsVisible = true;
    } else if (kindOfFilter == 'user') {
      this.turnOffFilters();
      this.filterUserIsVisible = true;
    } else if (kindOfFilter == 'parentState') {
      this.turnOffFilters();
      this.filterParentStateIsVisbible = true;
    } else if (kindOfFilter == 'childState') {
      this.turnOffFilters();
      this.filterChildStateIsVisible = true;
    } else if (kindOfFilter == 'registrationDate') {
      this.turnOffFilters();
      this.filterRegistrationDateIsVisible = true;
    }
  }

  turnOffFilters() {
    this.filterIdIsVisible = false;
    this.filterClientIsVisible = false;
    this.filterProbabilityIsVisible = false;
    this.filterUserIsVisible = false;
    this.filterParentStateIsVisbible = false;
    this.filterChildStateIsVisible = false;
    this.filterRegistrationDateIsVisible = false;
  }

  verifyContent() {
    let valueOfClient = this.frmFilter.controls.txtValue.value;
    if (valueOfClient == "") {
      this.lsRequest = this.lsRequestTemp;
    }
  }
  deleteFilter() {
    this.lsRequest = this.lsRequestTemp;
    this.frmFilter.controls.txtValue.setValue('');
    this.frmFilter.controls.txtRegistrationDate.setValue('');
    this.isFiltred = false;
  }

  filterRequests() {
    this.p = 1;
    this.isFiltred = true;
    // alert("Buscando filtros " + this.frmFilter.controls.cmbKindOfFilter.value + ' ' + this.frmFilter.controls.txtValue.value ) ;
    let kindOfFilter = this.frmFilter.controls.cmbKindOfFilter.value;
    //console.warn("[Tipo de filtro]: "+kindOfFilter);
    if (kindOfFilter == 'id') {
      let idRequest = this.frmFilter.controls.txtValue.value;
      console.log("[Id de la solicitud filtrada]:" + idRequest);
      this.lsRequest = this.lsRequestTemp.filter(r => r.id.toString().includes(idRequest));
    } else if (kindOfFilter == 'client') {
      let valueOfClient = this.frmFilter.controls.txtValue.value;
      
      this.lsRequest = this.lsRequestTemp.filter(r => r.client.name.toUpperCase().includes(valueOfClient.toUpperCase())|| r.client.id.includes(valueOfClient));
    } else if (kindOfFilter == 'probability') {
      let valueOfProbability = this.frmFilter.controls.cmbProbability.value;
      this.lsRequest = this.lsRequestTemp.filter(r => r.probability.id == valueOfProbability);
    } else if (kindOfFilter == 'user') {
      let valueOfUser = this.frmFilter.controls.cmbUser.value;
      this.lsRequest = this.lsRequestTemp.filter(r => r.user.id == valueOfUser);
    } else if (kindOfFilter == 'parentState') {
      let valueOfParentstate = this.frmFilter.controls.cmbParentState.value;
      this.lsRequest = this.lsRequestTemp.filter(r => r.parentState.id == valueOfParentstate);
    } else if (kindOfFilter == 'childState') {
      let valueOfChildState = this.frmFilter.controls.cmbChildState.value;
      this.lsRequest = this.lsRequestTemp.filter(r => r.childState.id == valueOfChildState);
    } else if (kindOfFilter == 'registrationDate') {
      let registrationDate = this.frmFilter.controls.txtRegistrationDate.value;
      this.lsRequest = this.lsRequestTemp.filter(r => r.registrationDate.toString().substr(0, 10) == registrationDate);
    }
  }

  async generateFile() {
    let rta = new ResponseApi();
    rta = await this.requestService.generateFile();
    if (rta.response) {
      let msg = rta.message.split(";");
      alert(msg[0]);
      let pathFile = msg[1].replace("file:","");
      console.log(pathFile);

      var reader  = new FileReader();
      var file = pathFile;     

      //window.open(pathFile,"_blank");
    }
  }

  validateLastName(lastname:string):string{
    if(lastname == null){
      return '';
    }else{
      return lastname;
    }
  }

}
