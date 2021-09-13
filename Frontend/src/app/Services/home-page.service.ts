import { MailResponse } from './../Models/MailResponse';
import { MailRequest } from './../Models/MailRequest';
import { UserIDMS } from './../Models/UserIDMS';
import { UserAppPrivs } from './../Models/UserAppPrivs';
import { Observable } from 'rxjs';
import { CommunService } from './../IdmsServices/commun.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  private host:String;


  constructor(private http: HttpClient,communService:CommunService) {
    this.host=communService.getHost();
   }



  public getAppsByMode(privs:Array<UserAppPrivs>,mode:String):Observable<Array<UserAppPrivs>>{
    return this.http.post<Array<UserAppPrivs>>(this.host+"getAppsByMode",privs,{params:new HttpParams().set('mode', mode.toString())}).pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }


  public sendEmail(req:MailRequest):Observable<MailResponse>{
    return this.http.post<MailResponse>(this.host+"sendEmail",req).pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }
}
