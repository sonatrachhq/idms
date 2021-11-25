import { TokenStorageService } from './../auth/token-storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public isUserLoggedIn: BehaviorSubject<boolean> ;
  public shouldReload: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false) ;
  constructor(private tokenStorage: TokenStorageService) { 
    if (this.tokenStorage.getToken()!="") {
      this.isUserLoggedIn =new BehaviorSubject<boolean>(true);
    }else{
      this.isUserLoggedIn =new BehaviorSubject<boolean>(false);
    }
  }
 
}
