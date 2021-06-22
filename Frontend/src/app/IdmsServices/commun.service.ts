import { TokenStorageService } from './../auth/token-storage.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Config {

  url: string;

}
@Injectable({
  providedIn: 'root'
})


export class CommunService {
  public host:string="";
  constructor(private http: HttpClient,private tokenStorage: TokenStorageService) { 
 
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/hostPath.json");
}
  

  
public load(): Promise<void> {
  
      return this.http.get<Config>("./assets/hostPath.json")
      .toPromise()
      .then(config => {
        this.host = config.url;
        this.tokenStorage.saveHost(this.host);
        });

    }
    public getHost():String{
      return this.host;
    }
 
  }
 
  export function initConfig(config: CommunService): () => Promise<void> {
  
    return () => config.load();
 
  }

