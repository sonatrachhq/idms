import { Observable } from 'rxjs';
import { Languages } from './../Models/Languages';
import { CommunService } from './../IdmsServices/commun.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';
import { Profil } from '../Models/Profil';

@Injectable({
  providedIn: 'root'
})
export class RegisterPageService {

  private host:String;


  constructor(private http: HttpClient,communService:CommunService) {
    this.host=communService.getHost();
   }

  

  
}
