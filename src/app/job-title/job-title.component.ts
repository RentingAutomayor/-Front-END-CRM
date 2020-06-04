import { Component, OnInit, Input } from '@angular/core';
import {  JobTitle } from '../jobTitle';
import {  JobTitlesService } from '../Services/job-titles.service';
/*Para que sirva los pipes de observables se deben importar alkgunas librerias */
import { Observable , Subject } from 'rxjs';
import { debounceTime , distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss']
})
export class JobTitleComponent implements OnInit {
  @Input() jobTitleSelected:JobTitle;
  lsJobTitle$:Observable<JobTitle[]>;
  private description = new Subject<string>();
  isVisible:boolean;
  txtJobTitle= new FormControl('');
  

  constructor( private jobTitleService:JobTitlesService) { }

  ngOnInit() {
    this.jobTitleSelected = new JobTitle();
    this.jobTitleSelected.description ="";
    this.isVisible= true;
   

    this.lsJobTitle$ = this.description.pipe(
                                          //Espera 300 ms despues de cada tecleo
                                          debounceTime(300),
                                          //Ignora un termino si es igual al anterior
                                          distinctUntilChanged(),
                                          //cambia a una busqueda de tipo Observable
                                          switchMap((desc:string) => this.jobTitleService.getJobTitlesByDescription(desc)),    
                                        );
  }

  getJobTitleByDescription(desc:string){
   console.log(desc);
   this.description.next(desc);
   this.isVisible= true;
    //this.jobTitleService.getJobTitlesByDescription(description).subscribe(lsJt => this.lsJobTitle = lsJt);
  }

  setJobTitleInInput(jobTitle:JobTitle){
    this.jobTitleSelected = jobTitle;
    console.log(jobTitle);
    this.isVisible= false;
    console.log(jobTitle.description);
    
    this.jobTitleService.setJobTitleSelected(this.jobTitleSelected.description);
  }

  validateJobTitle(){ 
    this.jobTitleService.setJobTitleSelected(this.txtJobTitle.value);
  }

}
