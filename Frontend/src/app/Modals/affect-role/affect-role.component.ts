import { TranslateService } from '@ngx-translate/core';
import { Role } from './../../Models/Role';
import { TokenStorageService } from './../../auth/token-storage.service';
import { UserAppPrivs } from './../../Models/UserAppPrivs';

import { Component, OnInit, Inject } from '@angular/core';
import { GlobalDialogComponent } from './../global-dialog/global-dialog.component';
import { AppPrivs } from './../../Models/AppPrivs';
import { Applications } from './../../Models/Applications';

import { AppRoles } from './../../Models/AppRoles';
import { UserIDMS } from './../../Models/UserIDMS';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDialogComponent } from './../error-dialog/error-dialog.component';
import { AppManagementService } from './../../Services/app-management.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
export interface DialogData {
 
  app:Applications,
  currentUser:number
  
 }
@Component({
  selector: 'app-affect-role',
  templateUrl: './affect-role.component.html',
  styleUrls: ['./affect-role.component.css']
})
export class AffectRoleComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  allIdmsUsers:UserIDMS[]=[];
  allApps:UserAppPrivs[]=[];
  apps:UserAppPrivs[]=[];
  roles:Role[]=[];



  constructor(private appManagementService:AppManagementService,
    private tokenStorage: TokenStorageService,
    private translate: TranslateService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    this.formGroup = new FormGroup({
      iduseridms: new FormControl('', [Validators.required]),
      idrole: new FormControl('', [Validators.required]),
      privstartdate:new FormControl('', [Validators.required]),
      privenddate:new FormControl('', [Validators.required]),
     /* applicationurl:new FormControl('', [Validators.required]),
      applicationmode:new FormControl('', [Validators.required]),
      ieflag:new FormControl('', [Validators.required]),*/
    });
  }

  ngOnInit(): void {
    this.apps=this.tokenStorage.getAppPrivs();
    this.allApps=this.tokenStorage.getAppPrivs().filter(app=>app.idapplication==this.data.app.idapplication );
    for(let i=0;i<this.allApps[0].roles.length;i++){
      this.roles.push(this.allApps[0].roles[i]);
    }
    //console.log(this.roles)
    //console.log(this.allApps)
    //get all idms users
    this.appManagementService.getAllIdmsUsers().subscribe(
      data => {  
        ////console.log(data)
        this.allIdmsUsers=data;
     
        
     },
     error => {
      //console.log(error);
      this.openDialogError("global_error_msg");
      
      
       
     }
    );

  }
  
  
  onSubmit(form:any){
    ////console.log(form)
    let privs:AppPrivs={
      "idrole":form.idrole.idrole,
      "idstatus":1,
      "iduser":this.data.currentUser,
      "iduseridms":form.iduseridms.iduseridms,
      "privenddate":form.privenddate,
      "privstartdate":form.privstartdate,
      "systemdate":new Date()
    }
    ////console.log(privs)
    this.savePrivs(privs);
    
  }

  savePrivs(privs:AppPrivs){
    this.appManagementService.saveNewPrivs(privs).subscribe(
      data => {  
        //console.log(data)
        for(let i=0;i<this.apps.length;i++){
          if(this.apps[i].idapplication==this.data.app.idapplication ){
            for(let j=0;j<this.apps[i].roles.length;j++){
              if(this.apps[i].roles[j].idrole==privs.idrole){
                this.apps[i].roles[j].privstartdate=privs.privstartdate;
                this.apps[i].roles[j].privenddate=privs.privenddate;
              }
            }
            
          }
        }
        this.tokenStorage.saveAppPrivs(this.apps);
        this.showAlert("affect_role","affect_role_success");
     
        
     },
     error => {
      //console.log(error);
      this.openDialogError("global_error_msg");
      
      
       
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
      window.location.reload();
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
