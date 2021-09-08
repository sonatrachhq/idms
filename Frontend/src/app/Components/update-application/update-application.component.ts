import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-update-application',
  templateUrl: './update-application.component.html',
  styleUrls: ['./update-application.component.css']
})
export class UpdateApplicationComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  
 
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
app:Applications={
      "idapplication":0,
  "applicationdesc":"",
  "applicationtitle":"",
  "applicationdetail":"",
  "iconurl":"",
  "applicationurl":"",
  "applicationmode":0,
  "ieflag":0,
  "applicationstatus":1,
  "dashbvisibility":1,
  "iduser":this.currentUser.iduser,
  "systemdate":new Date,
  "publicflag":0};
formSettings: MbscFormOptions = {
  theme: 'mobiscroll',
  themeVariant: 'light'
};
apps:UserAppPrivs[]=[];
  constructor(private tokenStorage: TokenStorageService, 
    private globalService:GlobalAppService,
    public dialog: MatDialog,
    private homePageService:HomePageService,private _snackBar: MatSnackBar,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private router:Router,
    private appManagementService:AppManagementService) { 
     
    this.formGroup = new FormGroup({
      applicationtitle: new FormControl('', [Validators.required]),
      applicationdesc: new FormControl('',[Validators.required]),
      applicationdetail:new FormControl('',[Validators.required]),
      iconurl:new FormControl(''),
      applicationurl:new FormControl('',[Validators.required]),
      applicationmode:new FormControl('',[Validators.required]),
      ieflag:new FormControl('',[Validators.required]),
      publicflag:new FormControl('',[Validators.required]),
    });

     this.route.queryParams.subscribe(Params=>
      {
        this.app.idapplication=Params["idapplication"],
        this.app.applicationdesc=Params["applicationdesc"],
        this.app.applicationtitle=Params["applicationtitle"],
        this.app.applicationdetail=Params["applicationdetail"],
        this.app.iconurl=Params["iconurl"],
        this.app.applicationurl=Params["applicationurl"],
        this.app.applicationmode=Params["applicationmode"],
        this.app.ieflag=Params["ieflag"],
        this.app.publicflag=Params["publicflag"]
   
      
  });
  
 
  }

  ngOnInit(): void {
    console.log(this.app)
    this.formGroup.get('applicationdesc').setValue(this.app.applicationdesc)
    this.formGroup.get('applicationtitle').setValue(this.app.applicationtitle)
    this.formGroup.get('applicationdetail').setValue(this.app.applicationdetail)
    this.formGroup.get('iconurl').setValue(this.app.iconurl)
    this.formGroup.get('applicationurl').setValue(this.app.applicationurl)
    this.formGroup.get('applicationmode').setValue(this.app.applicationmode==0?this.modes[0]:this.app.applicationmode==1?this.modes[1]:this.modes[2])
    this.formGroup.get('ieflag').setValue(this.app.ieflag==0?this.navs[1]:this.navs[0])
    this.formGroup.get('publicflag').setValue(this.app.publicflag==0?this.flags[0]:this.flags[1])
    this.globalService.getCurrentUser(this.currentUser).subscribe(
      data => {  
       
       this.currentUser=data;
        
       
    },
    error => {
     //console.log(error);
     this.openDialogError("global_error_msg");
     
     
      
    }
    )
    this.apps=this.tokenStorage.getAppPrivs();
  }

 
  getPrivs():Boolean{
    
    if(this.tokenStorage.getRoles().length!=0){
      return true;
    }else{
      return false;
    }
  }

  
  
  onSubmit(form:any){
    console.log(form)
    if(form.applicationurl==" " ){
      console.log("yeydg")
    }
    let app:Applications={
      "idapplication":this.app.idapplication,
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
  
console.log(app)
      this.appManagementService.updateApplication(app).subscribe(
      data => {  
        //console.log(data);
        if(data!=null){
        
         
          this.apps.forEach(appl=>{
            if(appl.idapplication==app.idapplication){
              appl.idapplication=app.idapplication,
              appl.applicationdesc=app.applicationdesc,
              appl.applicationtitle=app.applicationtitle,
              appl.applicationdetail=app.applicationdetail,
              appl.iconurl=app.iconurl,
              appl.applicationurl=app.applicationurl,
              appl.applicationmode=app.applicationmode,
              appl.ieflag=app.ieflag,
              appl.publicflag=app.publicflag
            }
            
          });
          console.log(this.apps)
         this.tokenStorage.saveAppPrivs(this.apps);
          this.showAlert("update_app","update_app_success");
        
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
      //window.location.reload();
      this.router.navigateByUrl("homePage")
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
