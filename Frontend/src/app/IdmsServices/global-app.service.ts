import { DataSharingService } from './data-sharing.service';
import { RegisterPageService } from './../Services/register-page.service';
import { Ntlm } from './../Models/Ntlm';
import { TranslateService } from '@ngx-translate/core';
import { LoginPageService } from './../Services/login-page.service';
import { Router } from '@angular/router';
import { JwtResponse } from './../auth/jwt-response';
import { TokenStorageService } from './../auth/token-storage.service';
import { Profil } from './../Models/Profil';
import { catchError } from 'rxjs/operators';
import { CommunService } from './commun.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserIDMS } from './../Models/UserIDMS';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class GlobalAppService {

  private host:String;
  currentUser:UserIDMS={
    "idlang":0,
    "iduser":0,
    "iduseridms":0,
    "pswuser":"",
    "sonuser":"",
    "sysdate":new Date,
    "userstatus":0,
    "username":""
  };

  constructor(private http: HttpClient,private tokenStorage:TokenStorageService,private router:Router,
    //private dataSharingService: DataSharingService,
    private translate: TranslateService,
    private loginPageService:LoginPageService,
    ) {
     
    this.host=this.tokenStorage.getHost();
   }

   public getIntlmParams(): Promise<Object>{
      
    return  this.http.get( 'http://localhost/ntlm/' , {
     headers:{skip:"true"},
   }).toPromise();

 
}
  public getCurrentUser(user:UserIDMS):Observable<UserIDMS>{
    if(this.host==""){
      this.host=this.tokenStorage.getHost();
    }
    return this.http.post<UserIDMS>(this.host+"getCurrentUser",user).pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public getUsersProfil(profil:Profil):Observable<Profil>{
    return this.http.post<Profil>(this.host+"getUsersProfil",profil).pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }
  public checkUsersState(): Promise<void> {
    this.host=this.tokenStorage.getHost();
    let ntlm:Ntlm={
      "domain":this.tokenStorage.getDomain(),
      "username":this.tokenStorage.getSonuser(),
      "workstation":this.tokenStorage.geWorkstation()
    }
    console.log("checkUsersState")
    console.log(ntlm)
    return this.http.post<JwtResponse>(this.host+"api/auth/authUser",ntlm, {
      headers:{skip:"true"},
    })
    .toPromise()
    .then((data)=>{
      if(data!=null){
        if(data.accessToken!=""){
          console.log(data)
          this.tokenStorage.saveToken(data.accessToken);
          
          this.tokenStorage.saveTheme(2);
          this.tokenStorage.saveLang(1);
          this.tokenStorage.saveEmail(data.email);
          this.tokenStorage.saveUsername(data.name);
          this.currentUser.sonuser=data.sonuser;
         
            this.getUsersRoles();
        }else{
          Swal.fire({
            icon: 'error',
            title: this.translate.instant("error_alert"),
            text: this.translate.instant("global_error_msg"),
            showConfirmButton: false,
          })
        }
       
      }else{
       // this.tokenStorage.signOut();
       this.findUserBySON(ntlm)
    }
  
  })
}

findUserBySON(ntlm:Ntlm){
  this.http.post<Boolean>(this.host+"api/auth/findUserBySON",ntlm, {
    headers:{skip:"true"},
  }).toPromise()
  .then(data=>{
    if(data){
      console.log(data)
      Swal.fire({
        icon: 'error',
        title: this.translate.instant("auth_login"),
        text: this.translate.instant("error_auth_redirect_mail"),
        showConfirmButton: false,
      }).then((result) => {
        
        //Swal.close()
        this.router.navigate(["login"])
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: this.translate.instant("auth_login"),
        text: this.translate.instant("connect_as_guest"),
        showConfirmButton: false,
      }).then((result) => {
        
        //Swal.close()
        this.router.navigate([""])
      })
    }
  })
}
  getUsersRoles(){
    this.loginPageService.getUsersRoles(this.currentUser).subscribe(
      (data)=>{
       // console.log(data)
      
          this.tokenStorage.saveRoles(data);
        this.getUsersAppPrivs();
      
        
        
      },
      error => {
        //console.log(error);
       
        //this.showAlert('Alerte de connexion',"Nom d'utilisateur ou mot de passe incorrect");
        
         
       }
    )
  }
  getUsersAppPrivs(){
    this.loginPageService.getUsersAppPrivs(this.currentUser).subscribe(
      (data)=>{
       //console.log(data)
         
       this.tokenStorage.saveAppPrivs(data);
      this.getUsersObjects();

      },
      (error)=>{
        //console.log(error)
      }
    )
  }

  getUsersObjects(){
    this.loginPageService.getUsersObjects(this.currentUser).subscribe(
      (data)=>{
       //console.log(data)
         
       this.tokenStorage.saveObjects(data);
      /*  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {    
        this.router.navigate(['homePage'] );
        }); */
        this.getCurrentUser(this.currentUser).subscribe(
          (data)=>{
            let profil:Profil={
              "idapplication":1,
              "idlanguage":1,
              "idtheme":2,
              "iduser":0,
              "iduseridms":data.iduseridms,
              "systemdate":new Date
    
            }
            this.createProfil(profil);
          }
        )
       
     
      

      },
      (error)=>{
        //console.log(error)
      }
    )
  }
  createProfil(profil:Profil){
    this.loginPageService.saveProfil(profil).subscribe(
      data => {
        //console.log(data);
       // this.dataSharingService.isUserLoggedIn.next(true);
        this.router.navigateByUrl("homePage" /* ,{skipLocationChange: true} */ )
      },
      error => {
        //console.log(error);
        Swal.fire({
          icon: 'error',
          title: this.translate.instant("error_alert"),
          text: this.translate.instant("global_error_msg"),
          showConfirmButton: false,
        })
         
       
        
      }
    )
}
}
/*  export function initCheckLogin(config: GlobalAppService): () => Promise<void> {
  
  return () => config.checkUsersState();

}  */