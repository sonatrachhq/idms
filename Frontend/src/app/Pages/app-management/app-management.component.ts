import { GlobalDialogComponent } from './../../Modals/global-dialog/global-dialog.component';
import { AppManagementService } from './../../Services/app-management.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './../../Modals/error-dialog/error-dialog.component';
import { GlobalAppService } from './../../IdmsServices/global-app.service';
import { UserIDMS } from './../../Models/UserIDMS';
import { TokenStorageService } from './../../auth/token-storage.service';
import { Applications } from './../../Models/Applications';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';
export interface dataType{
  id:number,
  desc:string
}
@Component({
  selector: 'app-app-management',
  templateUrl: './app-management.component.html',
  styleUrls: ['./app-management.component.css']
})
export class AppManagementComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  titleAlert: string = 'titleAlert_login';
  modes:dataType[]=[ 
  {"id":0,"desc":"prod"},
  {"id":1,"desc":"pre_prod"},
  {"id":2,"desc":"dev"}
];
navs:dataType[]=[
  {"id":0,"desc":"browser_0"},
  {"id":1,"desc":"browser_1"},
];
currentUser:UserIDMS={
  "idlang":0,
  "iduser":0,
  "iduseridms":0,
  "pswuser":"",
  "sonuser":this.tokenStorage.getSonuser(),
  "sysdate":new Date,
  "userstatus":0
};
formSettings: MbscFormOptions = {
  theme: 'mobiscroll',
  themeVariant: 'light'
};
  constructor(private tokenStorage: TokenStorageService, 
    private globalService:GlobalAppService,
    public dialog: MatDialog,
    private appManagementService:AppManagementService) { 

    this.formGroup = new FormGroup({
      applicationtitle: new FormControl('', [Validators.required]),
      applicationdesc: new FormControl('', [Validators.required]),
      applicationdetail:new FormControl('', [Validators.required]),
      iconurl:new FormControl('', [Validators.required]),
      applicationurl:new FormControl('', [Validators.required]),
      applicationmode:new FormControl('', [Validators.required]),
      ieflag:new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.globalService.getCurrentUser(this.currentUser).subscribe(
      data => {  
       
       this.currentUser=data;
      
       
    },
    error => {
     console.log(error);
     this.openDialogError("global_error_msg");
     
     
      
    }
    )
  }
  onSubmit(form:any){
    console.log(form)
    let app:Applications={
      "applicationdesc":form.applicationdesc,
      "applicationtitle":form.applicationtitle,
      "applicationdetail":form.applicationdetail,
      "iconurl":form.iconurl,
      "applicationurl":form.applicationurl,
      "applicationmode":form.applicationmode,
      "ieflag":form.ieflag,
      "applicationstatus":1,
      "dashbvisibility":1,
      "iduser":this.currentUser.iduser,
      "systemdate":new Date

    }

    this.appManagementService.addApplication(app).subscribe(
      data => {  
        console.log(data);
        if(data!=null){
        
          this.showAlert("add_app","add_app_success");
        
        
        }else{
        
        }
        
    },
    error => {
     console.log(error);
     this.openDialogError("global_error_msg")
     //this.showAlert('Alerte de connexion',"Nom d'utilisateur ou mot de passe incorrect");
     
      
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
  showAlert(title:String,msg:String) {
    const dialogRef = this.dialog.open(GlobalDialogComponent, {
      width: '350px',
      data: {title:title,message: msg}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
}
}