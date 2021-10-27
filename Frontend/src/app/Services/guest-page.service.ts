import { Observable } from 'rxjs';
import { Applications } from './../Models/Applications';
import { CommunService } from './../IdmsServices/commun.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuestPageService {

  private host:String;


  constructor(private http: HttpClient,communService:CommunService) {
    this.host=communService.getHost();
   }

   getVisibleApps(): Observable<Array<Applications>>{
      return this.http.get<Array<Applications>>(this.host+"api/auth/getVisibleApps", {
        headers:{skip:"true"},
      }).pipe(
        catchError((err) => {
           ////console.log('error caught in service')
          console.error(err);
          return throwError(err);
        })
      );
   }
  }