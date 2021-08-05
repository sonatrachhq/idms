import { Profil } from './../../Models/Profil';
import { TokenStorageService } from './../../auth/token-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserIDMS } from './../../Models/UserIDMS';
import { Languages } from './../../Models/Languages';
import { CommunService } from './../../IdmsServices/commun.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LangsService {

  private host:String;
 

  constructor(private tokenStorage: TokenStorageService,private http: HttpClient,private communService:CommunService) {
  
   
    this.host=communService.getHost();
    
    
   }

 

   public updateLangUser(profil:Profil ):Observable<Profil>{
     return this.http.post<Profil>(this.host+"updateLangUser",profil).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }
   public getAllLanguages(): Observable<Array<Languages>>{
    if(this.host==""){
      this.host=this.tokenStorage.getHost();
    }
    return this.http.get<Array<Languages>>(this.host+"api/auth/getAllLanguages").pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }


}
