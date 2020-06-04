import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { City } from '../city';
import { Department } from '../department';
/*Importamos el servicio que traera los datos de los departamentos y las ciudades */
import { CityService } from '../Services/city.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  cities: City[];
  departments: Department[];
  formCity: FormGroup;
  @Input() selectedCity: City;
  slCity: City;


  constructor(private cityService: CityService) {
    this.formCity = new FormGroup({
      cmbCity: new FormControl('Seleccione ...'),
      cmbDepartment: new FormControl('Seleccione ...')
    });
     this.formCity.controls.cmbDepartment.setValue(0);
     this.formCity.controls.cmbCity.setValue(0);
   }

  ngOnInit() {
   

    this.getDepartments();
    this.getAllCities();

  

  }

  getDepartments(): void {
    this.cityService.getDepartments().subscribe(deptos => this.departments = deptos);
  }

  getAllCities(): void {
    this.cityService.getCities().subscribe(cities => this.cities = cities);
  }

  getCitiesByDepto(obj: any) {
    let dep = this.departments.find(d => d.id == obj.value);
    this.cityService.getCitiesByDepartment(dep.id).subscribe(cts => this.cities = cts);
    this.formCity.controls.cmbCity.setValue(0);
  }

  setSelectedCity(objSelected: any) {
    console.log(objSelected);
    let objCity = this.cities.find(c => c.id == objSelected.value);
    console.log(objCity);
    this.cityService.setSelectedCity(objCity);

  }

  setFormCity(pCity: City) {
    //console.log(pCity);
    this.cityService.getCitiesByDepartment(pCity.departmentId).subscribe(cts => this.cities = cts);
    this.formCity.controls.cmbDepartment.setValue(pCity.departmentId);
    this.formCity.controls.cmbCity.setValue(pCity.id);
  }
  
  
  
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log(changes.currentValue);
    for (let propName in changes) {
      //let changedProp = changes[propName];
      //let slCity;
      if (this.selectedCity != undefined) {
        // console.log(this.selectedCity); 
        console.log(propName);
        console.log(this.selectedCity);
        this.formCity.controls.cmbDepartment.setValue(this.selectedCity.departmentId);
        this.formCity.controls.cmbCity.setValue(this.selectedCity.id);       

      }
    }
  }




}
