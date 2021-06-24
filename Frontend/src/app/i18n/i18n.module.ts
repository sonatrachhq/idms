import { CommunService } from './../IdmsServices/commun.service';
import { Languages } from './../Models/Languages';
import { Option } from './../Theme/Models/Option';
import { Profil } from './../Models/Profil';
import { GlobalAppService } from './../IdmsServices/global-app.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './../Components/error-dialog/error-dialog.component';
import { UserIDMS } from './../Models/UserIDMS';
import { LangsService } from './../Languages/service/langs.service';
import { TokenStorageService } from './../auth/token-storage.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateDirective, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateCacheModule, TranslateCacheService, TranslateCacheSettings } from 'ngx-translate-cache';

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
    private communService:CommunService
  ) {
    translateCacheService.init();
    translate.addLangs(['en', 'fr']);
    this.communService.load().then(
      (value) => {
         if (this.tokenStorage.getToken()!="") {
        //get all languages
     this.langsService.getAllLanguages().subscribe(
       data => {  
         console.log(data);
        this.langs=data;
        this.getUsersProfil();
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
  getUsersProfil(){
  
    this.currentUser.sonuser=this.tokenStorage.getSonuser();
      this.globalService.getCurrentUser(this.currentUser).subscribe(
        data => {  
          console.log(data);
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
        console.log(data);
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