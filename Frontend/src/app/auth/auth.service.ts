import { ResponseMessage } from './response-message';
import { CommunService } from './../IdmsServices/commun.service';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
     /*
     .set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
 
     // Request headers you wish to allow
     
 
     // Set to true if you need the website to include cookies in the requests sent
     // to the API (e.g. in case you use sessions)
     .set('Access-Control-Allow-Credentials', "true")
     .set('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
     .set('Access-Control-Allow-Origin', '*')*/
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl ;
  private signupUrl ;

  constructor(private http: HttpClient,communService:CommunService) {
    this.loginUrl = communService.getHost()+'api/auth/signin';
    this.signupUrl=communService.getHost()+'api/auth/signup';
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials,httpOptions);
  }

  signUp(info: SignUpInfo): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(this.signupUrl, info, httpOptions);
  }
}
