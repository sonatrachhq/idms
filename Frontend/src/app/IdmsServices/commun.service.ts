import { GlobalAppService } from './global-app.service';
import { JwtResponse } from './../auth/jwt-response';
import { TokenStorageService } from './../auth/token-storage.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Config {

  url: string;
  emailReceiver:string;

}
@Injectable({
  providedIn: 'root'
})


export class CommunService {
  public host:string="";
  public emailReceiver="";
  constructor(private http: HttpClient,private tokenStorage: TokenStorageService,private globalAppService:GlobalAppService) { 
 
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/hostPath.json");
}
  

  
public load(): Promise<void> {
    //console.log("load")
      return this.http.get<Config>("./assets/hostPath.json")
      .toPromise()
      .then(config => {

        this.host = config.url;
        this.emailReceiver=config.emailReceiver;
        this.tokenStorage.saveHost(this.host);
        //this.getIntlmParams();
        });

    }

    public getIntlmParams(): Promise<void>{
      
        return  this.http.get('http://localhost/ntlm/', {
         headers:{skip:"true"},
       }).toPromise().then(
        data=>{
         console.log("ntlm data",data)
       /* console.log("data[0]",data["infos"][0])
        console.log("USERNAME",data["infos"][0].USERNAME)
        console.log("DOMAIN",data["infos"][0].DOMAIN) */
        this.tokenStorage.saveSonuser(data["infos"][0].USERNAME);
        this.tokenStorage.saveDomain(data["infos"][0].DOMAIN);
        this.tokenStorage.saveWorkstation(data["infos"][0].WORKSTATION)
      }
     );
      
     
    }
    public getHost():String{
      return this.host;
    }
    public getEmailReceiver():string{
      return this.emailReceiver;
    }
 
  }
 
    export function initConfig(config: CommunService): () => Promise<void> {
  
    return () => config.load();
 
  } 
 


