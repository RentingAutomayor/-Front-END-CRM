import { Injectable } from '@angular/core';
import { Person } from '../Models/person';
import { ResponseApi } from '../Models/responseApi';
import { kindOfDocument } from '../Models/kindOfDocument';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  isNaturalPerson: boolean;
  frmPersonIsFinish: boolean;
  objPerson: Person;

  constructor() {
    this.objPerson = new Person();
    this.frmPersonIsFinish = false;
  }

  setIsNaturalPerson(value: boolean) {
    this.isNaturalPerson = value;
  }

  getIsNaturalPerson() {
    return this.isNaturalPerson;
  }

  setPerson(paramPerson: Person) {
    this.objPerson = paramPerson;
    //console.log(this.person);
  }

  getPerson(): Person {
    return this.objPerson;
  }

  setFrmPersonWasFinished(value: boolean) {
    this.frmPersonIsFinish = value;
  }

  getFrmPersonWasFinished(): boolean {
    return this.frmPersonIsFinish;
  }


  validateFormPerson(pPerson: Person, pKindOfValidation: string): ResponseApi {
    let rta = new ResponseApi();
    console.log("[Formulario a validar]");
    let msg: string;
    msg = "";
    console.warn("[Validación de campos]");
    console.warn(pKindOfValidation);

    if (pKindOfValidation == "client") {

      console.log(pPerson);
      //console.log(pPerson.kindOfDocument);
      if (pPerson.id == "") {
        msg += "* El campo de documento no puede ser vacío.\n";
      } else {
        let vNum = isNaN(Number.parseInt(pPerson.id));
        if (vNum) {
          msg += "* El campo de documento debe ser númerico.\n";
        }
      }

      if (pPerson.name.trim() == "") {
        msg += "* El campo del nombre no puede ser vacío.\n";
      }

      if (pPerson.kindOfDocument != undefined) {
        if (pPerson.kindOfDocument.description.toUpperCase() != "NIT") {
          if (pPerson.lastName.trim() == "") {
            msg += "* El campo del apellido no puede ser vacío. \n";
          }

          if (pPerson.email.trim() == "") {
            msg += "* El campo del correo electronico no puede ser vacío. \n";
          }

          if (pPerson.cellPhone == "") {
            msg += "* El campo de celular no puede ser vacío. \n";
          }
        }
      } else {
        msg += "* Debe seleccionar al menos un tipo de documento. \n";
      }
    }else if(pKindOfValidation.toUpperCase() == "PRECLIENT"){
      if(pPerson.cellPhone == "" && pPerson.email.trim()==""){
        msg+="* Debe ingresar por lo menos un número de celular o un email para continuar";
      }
    }

    if (msg != "") {
      rta.response = false;
      rta.message = msg;
    } else {
      rta.response = true;
    }

    return rta;
  }

  ValidateChanges(personBD: Person, personForm: Person) {
    let personHasChanges: boolean;
    personHasChanges = false;

    if (personBD.id != personForm.id) {
      personHasChanges = true;
    }

    if (personBD.kindOfDocument.id != personForm.kindOfDocument.id) {
      personHasChanges = true;
    }

    if (personBD.name != personForm.name) {
      personHasChanges = true;
    }

    if (personBD.lastName != personForm.lastName) {
      personHasChanges = true;
    }

    if (personBD.email != personForm.email) {
      personHasChanges = true;
    }

    if (personBD.cellPhone != personForm.cellPhone) {
      personHasChanges = true;
    }

    if (personBD.city.id != personForm.city.id) {
      personHasChanges = true;
    }

    return personHasChanges;
  }
}
