import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TblRequestsComponent } from './tbl-requests/tbl-requests.component';
import { AddRequestComponent } from './add-request/add-request.component';
import { RequestRiskComponent } from './request-risk/request-risk.component';
import { RequestOperationComponent } from './request-operation/request-operation.component';
import { LoginComponent } from './login/login.component';
import { RequestReviewComponent } from './request-review/request-review.component';
import { UpdateRequestComponent } from './update-request/update-request.component';
import { AddPreClientComponent } from './add-pre-client/add-pre-client.component';
import { TblPreClientsComponent } from './tbl-pre-clients/tbl-pre-clients.component';
import { UpdatePreRequestComponent } from './update-pre-request/update-pre-request.component';

const routes: Routes = [
  { path: 'MasterRequests', component: TblRequestsComponent },
  { path: 'NewRequest', component: AddRequestComponent},
  { path: 'UpdateRiskInformation',component: RequestRiskComponent },
  { path: 'UpdateOperationalInformation',component:RequestOperationComponent},
  { path: 'Login', component:LoginComponent },
  { path: 'RequestReview', component:RequestReviewComponent},
  { path: 'UpdateRequest', component:UpdateRequestComponent},
  { path: 'NewPreClientRequest', component:AddPreClientComponent},
  { path: 'MasterPreClients', component:TblPreClientsComponent},
  { path: 'UpdatePreRequest', component:UpdatePreRequestComponent},
  { path: '',   redirectTo: '/Login', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
