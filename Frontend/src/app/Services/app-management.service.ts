import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Applications } from './../Models/Applications';
import { CommunService } from './../IdmsServices/commun.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppManagementService {

  private host:String;


  constructor(private http: HttpClient,communService:CommunService) {
    this.host=communService.getHost();
   }

   public addApplication(app:Applications):Observable<Applications>{
     return this.http.post<Applications>(this.host+"addApplication",app).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }
}
