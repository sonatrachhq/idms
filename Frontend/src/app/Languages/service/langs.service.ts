import { TokenStorageService } from './../../auth/token-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserIDMS } from './../../Models/UserIDMS';
import { Languages } from './../../Models/Languages';
import { CommunService } from './../../IdmsServices/commun.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LangsService {

  private host:String;
 

  constructor(private tokenStorage: TokenStorageService,private http: HttpClient,private communService:CommunService) {
  
    this.host=this.tokenStorage.getHost();
    
    
    
   }

   public getCurrentUserLang(user:UserIDMS):Observable<Languages>{
     return this.http.post<Languages>(this.host+"api/auth/getCurrentUserLang",user).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }



}
