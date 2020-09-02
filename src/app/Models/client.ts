import { Person } from './person';
import { EconomicActivity } from './EconomicActivity';
import { Canal } from './canal';
import { Contact } from './contact';

export class Client extends Person{
    economicActivity:EconomicActivity;    
    lsContacts:Contact[];

    setClient(paramPerson:Person,paramEconAct:EconomicActivity){
        this.id = paramPerson.id;
        this.kindOfDocument = paramPerson.kindOfDocument;
        this.name = paramPerson.name;
        this.lastName = paramPerson.lastName;       
        this.cellPhone = paramPerson.cellPhone;
        this.phone = paramPerson.phone;
        this.email = paramPerson.email;
        this.city = paramPerson.city;
        this.economicActivity = paramEconAct;      
    }

    

    
}