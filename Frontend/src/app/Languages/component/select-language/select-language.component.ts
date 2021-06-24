import { Profil } from './../../../Models/Profil';
import { LangsService } from './../../service/langs.service';
import { GlobalAppService } from './../../../IdmsServices/global-app.service';
import { TokenStorageService } from './../../../auth/token-storage.service';
import { UserIDMS } from './../../../Models/UserIDMS';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './../../../Components/error-dialog/error-dialog.component';
import { Languages } from '../../../Models/Languages';
import { RegisterPageService } from '../../../Services/register-page.service';
import { Observable } from 'rxjs';
import { Directionality } from '@angular/cdk/bidi';
import { Component, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
})
export class SelectLanguageComponent {
  langs:Languages[]=[];
  currentUser:UserIDMS={
    "idlang":0,
    "iduser":0,
    "iduseridms":0,
    "pswuser":"",
    "sonuser":"",
    "sysdate":new Date,
    "userstatus":1
  }
  constructor(private tokenStorage: TokenStorageService,
    public translate: TranslateService,
    private registerService: RegisterPageService,
    public dialog: MatDialog ,
    private globalService:GlobalAppService,
    private langService :LangsService) {
  
}
ngOnInit(): void {
  //get all languages
  this.langService.getAllLanguages().subscribe(
    data => {  
      console.log(data);
     this.langs=data;
  },
  error => {
   console.log(error);
   this.openDialogError(error);
   
   
    
  }
  )




}
idmsTranslate(lang:Languages){
  this.translate.use(lang.symbollang);
  if(this.tokenStorage.getSonuser()!=""){
   
      //get current user

  if(this.tokenStorage.getSonuser()!=""){
    this.currentUser.sonuser=this.tokenStorage.getSonuser();
    this.globalService.getCurrentUser(this.currentUser).subscribe(
      data => {  
        console.log(data);
       this.currentUser=data;
       let profil:Profil={
        "iduseridms":this.currentUser.iduseridms,
        "idapplication":1,
        "idtheme":parseInt(this.tokenStorage.getTheme()),
        "idlanguage":lang.idlang ,
        "iduser":0,
        "systemdate":new Date
      }
      console.log(profil);
       this.updateLang(profil );
    },
    error => {
     console.log(error);
     this.openDialogError(error);
     
     
      
    }
    )
  }

  }
  console.log(lang)
}
updateLang(profil:Profil){
  this.langService.updateLangUser(profil).subscribe(
    data => {  
      console.log(data);
     
  },
  error => {
   console.log(error);
   this.openDialogError(error);
   
   
    
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
