import { TokenStorageService } from './../auth/token-storage.service';
import { Profil } from './../Models/Profil';
import { catchError } from 'rxjs/operators';
import { CommunService } from './commun.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserIDMS } from './../Models/UserIDMS';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalAppService {

  private host:String;


  constructor(private http: HttpClient,communService:CommunService,private tokenStorage:TokenStorageService) {
    this.host=communService.getHost();
   }


  public getCurrentUser(user:UserIDMS):Observable<UserIDMS>{
    if(this.host==""){
      this.host=this.tokenStorage.getHost();
    }
    return this.http.post<UserIDMS>(this.host+"getCurrentUser",user).pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public getUsersProfil(profil:Profil):Observable<Profil>{
    return this.http.post<Profil>(this.host+"getUsersProfil",profil).pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }
}
