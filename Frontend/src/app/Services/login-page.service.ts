import { TokenStorageService } from './../auth/token-storage.service';
import { UserIDMS } from './../Models/UserIDMS';
import { UserAppPrivs } from './../Models/UserAppPrivs';
import { Observable } from 'rxjs';
import { CommunService } from './../IdmsServices/commun.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';
import { Role } from '../Models/Role';
import { UsersObject } from '../Models/UsersObject';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {

  private host:String;


  constructor(private http: HttpClient,private token:TokenStorageService) {
   this.host=this.token.getHost();
 // this.host="http://localhost:8080/"
   }

   public getUsersRoles(user:UserIDMS):Observable<Array<Role>>{
    this.host=this.token.getHost();
     return this.http.post<Array<Role>>(this.host+"getUsersRoles",user).pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }
 
   public getUsersObjects(user:UserIDMS):Observable<Array<UsersObject>>{
    this.host=this.token.getHost();
     return this.http.post<Array<UsersObject>>(this.host+"getUsersObjects",user).pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }

   public getUsersAppPrivs(user:UserIDMS):Observable<Array<UserAppPrivs>>{
   this.host=this.token.getHost();
    return this.http.post<Array<UserAppPrivs>>(this.host+"getUsersAppPrivs",user).pipe(
     catchError((err) => {
        ////console.log('error caught in service')
       console.error(err);
       return throwError(err);
     })
   );
  }
}
