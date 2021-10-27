import { TokenStorageService } from './token-storage.service';
import { ResponseMessage } from './response-message';
import { CommunService } from './../IdmsServices/commun.service';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';

const httpOptions = {
  headers: new HttpHeaders({ skip:"true"})
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
  private url;

  constructor(private http: HttpClient,communService:CommunService,private tokenStorage:TokenStorageService) {
   
    this.url=communService.getHost();
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    if(this.url==""){
      this.url=this.tokenStorage.getHost();
    }
    return this.http.post<JwtResponse>(this.url+'api/auth/signin', credentials,httpOptions);
  }

  signUp(info: SignUpInfo): Observable<ResponseMessage> {
    if(this.url==""){
      this.url=this.tokenStorage.getHost();
    }
    return this.http.post<ResponseMessage>(this.url+'api/auth/signup', info, httpOptions);
  }

  checkToken(info:AuthLoginInfo):Observable<AuthLoginInfo>{
    if(this.url==""){
      this.url=this.tokenStorage.getHost();
    }
    return this.http.post<AuthLoginInfo>(this.url+'api/auth/checkToken',info, httpOptions);
  }
}
