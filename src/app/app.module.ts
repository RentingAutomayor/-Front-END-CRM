import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
/*Para el manejo de peticiones se requiere el uso del modulo de HTTP */
import { HttpClientModule } from '@angular/common/http';
import { PersonComponent } from './person/person.component';
import { CityComponent } from './city/city.component';
 
/*
Para el manejo de formularios reactivos es importante importar las librerias
dentro del app.module.ts
*/
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { EconomicActivityComponent } from './economic-activity/economic-activity.component';
import { CanalComponent } from './canal/canal.component';
import { LsUserByAreaComponent } from './ls-user-by-area/ls-user-by-area.component';
import { ClientComponent } from './client/client.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ContactComponent } from './contact/contact.component';
import { JobTitleComponent } from './job-title/job-title.component';
import { TblContactsComponent } from './tbl-contacts/tbl-contacts.component';
import { RequestComponent } from './request/request.component';

/*Modulo para importar animaciones a la aplicación. */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddRequestComponent } from './add-request/add-request.component';
import { TblRequestsComponent } from './tbl-requests/tbl-requests.component';
import { AppRoutingModule } from './app-routing.module';
import { RequestRiskComponent } from './request-risk/request-risk.component';
import { RequestOperationComponent } from './request-operation/request-operation.component';
import { LoginComponent } from './login/login.component';
import { RequestReviewComponent } from './request-review/request-review.component';
import { UpdateRequestComponent } from './update-request/update-request.component';
import { ImgLoadingComponent } from './img-loading/img-loading.component';




@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    CityComponent,
    UserDetailComponent,
    EconomicActivityComponent,
    CanalComponent,
    LsUserByAreaComponent,
    ClientComponent,
    NavigationComponent,
    ContactComponent,
    JobTitleComponent,
    TblContactsComponent,
    RequestComponent,
    AddRequestComponent,
    TblRequestsComponent,
    RequestRiskComponent,
    RequestOperationComponent,
    LoginComponent,
    RequestReviewComponent,
    UpdateRequestComponent,
    ImgLoadingComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
