import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Profil } from './../../Models/Profil';
import { CommunService } from './../../IdmsServices/commun.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalThemeService {

  private host:String;


  constructor(private http: HttpClient,communService:CommunService) {
    this.host=communService.getHost();
   }

   public updateThemeUser(profil:Profil):Observable<Profil>{
     return this.http.post<Profil>(this.host+"updateThemeUser",profil).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }
  }
