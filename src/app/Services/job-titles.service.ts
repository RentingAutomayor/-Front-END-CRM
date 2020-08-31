import { Injectable } from '@angular/core';
import { JobTitle } from '../Models/jobTitle';
/*Para métodos asincronos se debe implementar el uso de observables*/
import { Observable, of } from 'rxjs';
/*Se deben importar las librerias para el amnejo de HTTP*/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class JobTitlesService {

  lsJobTitles: JobTitle[];
  urlAPI = "/Formularios/api/";
  jobTitleSelected : string;
  HttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  setJobTitleSelected(jobTitle:string){
    this.jobTitleSelected = jobTitle; 
  }

  getJobTitleSelected():string{
    return this.jobTitleSelected;
  }

  getJobTitlesByDescription(description: string): Observable<JobTitle[]> {

    if(!description.trim()){
      return of([]);
    }

    let urlJobtitleByDesc = this.urlAPI + "jobTitleClient/Get?description="+description;
    return this.http.get<JobTitle[]>(urlJobtitleByDesc)
      .pipe(
        catchError(this.handleError<JobTitle[]>('getJobTitlesByDescription', []))
      );
  }

  async validateJobTitleClient(jobT:JobTitle):Promise<JobTitle>{
    let urlValidateJobTitle = this.urlAPI + "jobTitleClient/validateJobTitle";
    console.log(urlValidateJobTitle);
    return this.http.post<JobTitle>(urlValidateJobTitle,jobT,this.HttpOptions).toPromise();
                  
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

}
