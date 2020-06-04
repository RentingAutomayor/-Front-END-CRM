import { Injectable } from '@angular/core';
import { Person } from '../person';
import { ResponseApi } from '../responseApi';
import { kindOfDocument } from '../kindOfDocument';
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


  validateFormPerson(pPerson: Person): ResponseApi {
    let rta = new ResponseApi();
    console.log("[Formulario a validar]");
 
    let msg: string;
    msg = "";
    console.warn("[Validación de campos]");


    console.log(pPerson);
    //console.log(pPerson.kindOfDocument);
    if (pPerson.id == "") {
      msg += "* El campo de documento no puede ser vacío.\n";
    } else {
      let vNum = isNaN(Number.parseInt(pPerson.id));
      if (vNum) {
        msg += "* El campo de documento DEBE ser númerico.\n";
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


    if (msg != "") {
      rta.response = false;
      rta.message = msg;
    } else {
      rta.response = true;
    }

    return rta;
  }
}
