import { Role } from './../../Models/Role';
import { Component, OnInit } from '@angular/core';
import { AddRoleComponent } from './../../Modals/add-role/add-role.component';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomePageService } from './../../Services/home-page.service';
import { UserAppPrivs } from './../../Models/UserAppPrivs';
import { GlobalDialogComponent } from './../../Modals/global-dialog/global-dialog.component';
import { AppManagementService } from './../../Services/app-management.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './../../Modals/error-dialog/error-dialog.component';
import { GlobalAppService } from './../../IdmsServices/global-app.service';
import { UserIDMS } from './../../Models/UserIDMS';
import { TokenStorageService } from './../../auth/token-storage.service';
import { Applications } from './../../Models/Applications';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';
import { IgxPaginatorComponent } from 'igniteui-angular';
import Swal from 'sweetalert2'
export interface dataType{
  id:number,
  desc:string
}
@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.css']
})
export class AddApplicationComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  
  titleAlert: string = 'titleAlert_login';
  modes:dataType[]=[ 
  {"id":0,"desc":"prod"},
  {"id":1,"desc":"pre_prod"},
  {"id":2,"desc":"dev"}
];
navs:dataType[]=[
  {"id":1,"desc":"browser_0"},
  {"id":0,"desc":"browser_1"},
];
flags:dataType[]=[
  {"id":0,"desc":"public_flag"},
  {"id":1,"desc":"private_flag"},
]
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
showSpinner: Boolean = false;
roles:Role[]=[]
apps:UserAppPrivs[]=[];
  constructor(private tokenStorage: TokenStorageService, 
    private globalService:GlobalAppService,
    public dialog: MatDialog,
    private homePageService:HomePageService,private _snackBar: MatSnackBar,
    public translate: TranslateService,
    private appManagementService:AppManagementService) { 

    this.formGroup = new FormGroup({
      applicationtitle: new FormControl('', [Validators.required]),
      applicationdesc: new FormControl('', [Validators.required]),
      applicationdetail:new FormControl('', [Validators.required]),
      iconurl:new FormControl('', ),
      applicationurl:new FormControl('', [Validators.required]),
      applicationmode:new FormControl('', [Validators.required]),
      ieflag:new FormControl('', [Validators.required]),
      publicflag:new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.apps=this.tokenStorage.getAppPrivs();
    //console.log(this.apps)
    this.globalService.getCurrentUser(this.currentUser).subscribe(
      data => {  
       
       this.currentUser=data;
        
       
    },
    error => {
     //console.log(error);
     this.openDialogError("global_error_msg");
     
     
      
    }
    )
  }

 
  getPrivs():Boolean{
    
    if(this.tokenStorage.getRoles().length!=0){
      return true;
    }else{
      return false;
    }
  }

  
  
  onSubmit(form:any){
    //console.log(form)
    this.showSpinner=true
    let app:Applications={
      
      "applicationdesc":form.applicationdesc,
      "applicationtitle":form.applicationtitle,
      "applicationdetail":form.applicationdetail,
      "iconurl":form.iconurl==""?"../assets/img/logo.png":form.iconurl,
      "applicationurl":form.applicationurl,
      "applicationmode":form.applicationmode.id,
      "ieflag":form.ieflag.id,
      "applicationstatus":1,
      "dashbvisibility":1,
      "iduser":this.currentUser.iduser,
      "systemdate":new Date,
      "publicflag":form.publicflag.id

    }
  
//console.log(app)
      this.appManagementService.addApplication(app).subscribe(
      data => {  
        console.log(data);
        if(data!=null){
          let apps:UserAppPrivs={
            "applicationdesc":form.applicationdesc,
            "applicationtitle":form.applicationtitle,
            "applicationdetail":form.applicationdetail,
            "iconurl":form.iconurl==""?"../assets/img/logo.png":form.iconurl,
            "applicationurl":form.applicationurl,
            "applicationmode":form.applicationmode.id,
            "ieflag":form.ieflag.id,
            "publicflag":form.publicflag.id,
            "idapplication":data.idapplication,
            "iduseridms":this.currentUser.iduseridms,
            "interimenddate":new Date('01/01/1900'),
            "interimstartdate":new Date('01/01/1900'),
            "roles":this.roles
          }
          this.apps.push(apps)
          this.tokenStorage.saveAppPrivs(this.apps)
          this.showSpinner=false
          this.showAlert("add_app","add_app_success");
        
        
        }else{
        
        }
        
    },
    error => {
     //console.log(error);
     this.openDialogError("global_error_msg")
     //this.showAlert('Alerte de connexion',"Nom d'utilisateur ou mot de passe incorrect");
     
      
    }
    )  
  }

  //***************************************************Error handling************************************************** */
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
    Swal.fire({
      icon: 'success',
      title: this.translate.instant(title.toString()),
      text: this.translate.instant(msg.toString()),
      showConfirmButton: false,
    }).then((result) => {
     // window.location.reload();
      this.dialog.closeAll()
    })
   /*  const dialogRef = this.dialog.open(GlobalDialogComponent, {
      width: '350px',
      data: {title:title,message: msg}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    }); */
}
}
