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
  constructor(
    translate: TranslateService,
    translateCacheService: TranslateCacheService,
    private tokenStorage: TokenStorageService,
    private langsService:LangsService,
    public dialog: MatDialog
  ) {
    translateCacheService.init();
    translate.addLangs(['en', 'fr']);
    if (this.tokenStorage.getToken()!="") {
      let user:UserIDMS={
        "idlang":0,
        "iduser":0,
        "iduseridms":0,
        "pswuser":"",
        "sonuser":"",
        "sysdate":new Date,
        "userstatus":0
      };
      console.log(this.tokenStorage.getSonuser())
      user.sonuser=this.tokenStorage.getSonuser();
      this.langsService.getCurrentUserLang(user).subscribe(
        data => {  
          console.log(data);
          if(data!=null){
            this.browserLang=data.symbollang;
            translate.use(this.browserLang);
          }
         
      },
      error => {
       console.log(error);
       this.openDialogError(error);
       
        
      }
      )
    }else{
      this.browserLang = translateCacheService.getCachedLanguage() || translate.getBrowserLang();
      translate.use(this.browserLang.match(/en|fr/) ? this.browserLang:'fr');///en|ar|fr/
    }

    
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