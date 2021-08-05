import { Router } from '@angular/router';
import { AuthLoginInfo } from './../auth/login-info';
import { AuthService } from './../auth/auth.service';
import { CommunService } from './../IdmsServices/commun.service';
import { Languages } from './../Models/Languages';
import { Option } from './../Theme/Models/Option';
import { Profil } from './../Models/Profil';
import { GlobalAppService } from './../IdmsServices/global-app.service';
import { MatDialog } from '@angular/material/dialog';

import { UserIDMS } from './../Models/UserIDMS';
import { LangsService } from './../Languages/service/langs.service';
import { TokenStorageService } from './../auth/token-storage.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateDirective, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateCacheModule, TranslateCacheService, TranslateCacheSettings } from 'ngx-translate-cache';
import { ErrorDialogComponent } from '../Modals/error-dialog/error-dialog.component';


@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    TranslateCacheModule.forRoot({
      cacheService: {
        provide: TranslateCacheService,
        useFactory: translateCacheFactory,
        deps: [TranslateService, TranslateCacheSettings]
      },
      cacheMechanism: 'Cookie'
    })
  ],
  exports: [TranslateModule]
})
export class I18nModule {
   browserLang:string="";
   currentUser:UserIDMS={
    "idlang":0,
    "iduser":0,
    "iduseridms":0,
    "pswuser":"",
    "sonuser":"",
    "sysdate":new Date,
    "userstatus":0
  };
  langs:Languages[]=[];
  constructor(
    private translate: TranslateService,
    translateCacheService: TranslateCacheService,
    private tokenStorage: TokenStorageService,
    private langsService:LangsService,
    public dialog: MatDialog,
    private globalService:GlobalAppService,
    private communService:CommunService,
    private authService: AuthService,
    private router: Router
  ) {
    translateCacheService.init();
    translate.addLangs(['en', 'fr']);
    this.communService.load().then(
      (value) => {
         if (this.tokenStorage.getToken()!="") {
        //get all languages
     this.langsService.getAllLanguages().subscribe(
       data => {  
         
        this.langs=data;
        this.checkToken();
     },
     error => {
      console.log(error);
      this.openDialogError("global_error_msg");
      
      
       
     }
     )
       
       }else{
         this.browserLang = translateCacheService.getCachedLanguage() || translate.getBrowserLang();
         translate.use(this.browserLang.match(/en|fr/) ? this.browserLang:'fr');///en|ar|fr/
       }
      }
    );
    

    
  }

//check if token is epired or not before  getting user's profile
  checkToken(){
    let info:AuthLoginInfo={
      sonuser:this.tokenStorage.getToken(),
      password:""
    }
   
      this.authService.checkToken(info).subscribe(
      (data)=>{
      
          if(data.password=="true"){
              this.getUsersProfil();
          }else{
           this.login();
          }
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  login(){
   
      this.router.navigateByUrl("login")
  }
  getUsersProfil(){
  
    this.currentUser.sonuser=this.tokenStorage.getSonuser();
      this.globalService.getCurrentUser(this.currentUser).subscribe(
        data => {  
         
         this.currentUser=data;
        this.getProfil();
       
      },
      error => {
       console.log(error);
       this.openDialogError("global_error_msg");
       
       
        
      }
      )

    
  }

  getProfil(){
    let profil:Profil={
      "iduseridms":this.currentUser.iduseridms,
      "idapplication":1,
      "idtheme":0,
      "idlanguage":0 ,
      "iduser":0,
      "systemdate":new Date
    }
    this.globalService.getUsersProfil(profil).subscribe(
      data => {  
       
       if(data!=null){
        let  currentLang:Languages=this.langs.find(lang =>lang.idlang==data.idlanguage);
        this.browserLang=currentLang.symbollang;
        this.translate.use(this.browserLang);
       }
    },
    error => {
     console.log(error);
     this.openDialogError("global_error_msg");
     
     
      
    }
    )
  }
  openDialogError(error:String): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '650px',
      data: {message: error}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }
}

export function httpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export function translateCacheFactory(translateService: TranslateService, translateCacheSettings: TranslateCacheSettings) {
  return new TranslateCacheService(translateService, translateCacheSettings);
}