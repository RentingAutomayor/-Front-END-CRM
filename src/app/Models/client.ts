import { Person } from './person';
import { EconomicActivity } from './EconomicActivity';
import { Canal } from './canal';
import { Contact } from './contact';

export class Client extends Person{
    economicActivity:EconomicActivity;
    canal:Canal;
    lsContacts:Contact[];

    setClient(paramPerson:Person,paramEconAct:EconomicActivity,paramCanal:Canal){
        this.id = paramPerson.id;
        this.kindOfDocument = paramPerson.kindOfDocument;
        this.name = paramPerson.name;
        this.lastName = paramPerson.lastName;       
        this.cellPhone = paramPerson.cellPhone;
        this.email = paramPerson.email;
        this.city = paramPerson.city;
        this.economicActivity = paramEconAct;
        this.canal = paramCanal;
    }

    
}