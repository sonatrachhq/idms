import { Observable } from 'rxjs';
import { Languages } from './../Models/Languages';
import { CommunService } from './../IdmsServices/commun.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterPageService {

  private host:String;


  constructor(private http: HttpClient,communService:CommunService) {
    this.host=communService.getHost();
   }

   public getAllLanguages(): Observable<Array<Languages>>{
    return this.http.get<Array<Languages>>(this.host+"api/auth/getAllLanguages").pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }
}
