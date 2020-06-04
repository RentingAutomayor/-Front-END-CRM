import { Component, OnInit ,Input,OnChanges,SimpleChange, Output, EventEmitter} from '@angular/core';
import { Contact } from '../contact';
import { ClientService } from '../Services/client.service';

@Component({
  selector: 'app-tbl-contacts',
  templateUrl: './tbl-contacts.component.html',
  styleUrls: ['./tbl-contacts.component.scss']
})
export class TblContactsComponent implements OnInit {

  @Input() lsContacts:Contact[];
 

  constructor(
    private clientService:ClientService
  ) { }

  ngOnInit() {
  }
  async deleteContact(contact:Contact){
    if(confirm("¿Está seguro que desea eliminar el contacto:  "+contact.name+" "+contact.lastName+"?")){
      if(contact.id == undefined){
        //alert("Se buscará y eliminará el contacto");
       let lsTmp= new Array<Contact>();
       for(let i = 0; i < this.lsContacts.length ; i++){
          if(this.lsContacts[i].name == contact.name && this.lsContacts[i].lastName == contact.lastName && this.lsContacts[i].cellPhone == contact.cellPhone && this.lsContacts[i].email == contact.email ){
            console.error("evaluación de contacto a eliminar");
            console.log(this.lsContacts[i]);
            
          }else{
            console.warn("evaluación de contacto a dejar");
            console.log(this.lsContacts[i]);
            lsTmp.push(this.lsContacts[i]);
          }        
       }
       this.lsContacts = lsTmp;
       this.clientService.setContacts(this.lsContacts);
      }else{
        //alert("se eliminará el contacto "+contact.id);
        let response = await this.clientService.deleteContactById(contact);
        if(response.response){
          alert(response.message); 
          let oCli = this.clientService.getClientTmp();
          this.lsContacts = await this.clientService.getContactsByClient(oCli.id);
        }
      }
    }

    
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log("Funcionó");
    console.log(changes);
    for (let propName in changes) {
      if (this.lsContacts != undefined) {
        console.log(this.lsContacts);
      }
    }
  }
  

}
