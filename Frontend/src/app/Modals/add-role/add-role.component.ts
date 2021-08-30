import { TranslateService } from '@ngx-translate/core';
import { UserAppPrivs } from './../../Models/UserAppPrivs';
import { TokenStorageService } from './../../auth/token-storage.service';
import { Role } from './../../Models/Role';
import { GlobalDialogComponent } from './../global-dialog/global-dialog.component';
import { AppPrivs } from './../../Models/AppPrivs';
import { Applications } from './../../Models/Applications';

import { AppRoles } from './../../Models/AppRoles';
import { UserIDMS } from './../../Models/UserIDMS';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDialogComponent } from './../error-dialog/error-dialog.component';
import { AppManagementService } from './../../Services/app-management.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2'
export interface DialogData {
 
  app:Applications,
  currentUser:number
  
 }
@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  allApps:UserAppPrivs[]=[];




  constructor(private appManagementService:AppManagementService,
    private tokenStorage: TokenStorageService,
    private translate: TranslateService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    this.formGroup = new FormGroup({
      
      descrole: new FormControl('', [Validators.required]),
     
    });
  }

  ngOnInit(): void {
    this.allApps=this.tokenStorage.getAppPrivs();
    //.filter(app=>app.idapplication==this.data.app.idapplication );
    
  }
  
  onSubmit(form:any){
    //console.log(form)
    let role:AppRoles={
      "descrole":form.descrole,
      "idapplication":this.data.app.idapplication,
      "idstatus":1
    }
    ////console.log(role)
    this.appManagementService.saveNewRole(role).subscribe(
      result => {  
        let newRole:Role={
          "descrole":form.descrole,
          "idrole":result.idrole,
          "idstatus":1,
          "privenddate":new Date(),
          "privstartdate":new Date()
        }
        for(let i=0;i<this.allApps.length;i++){
          if(this.allApps[i].idapplication==this.data.app.idapplication){
            this.allApps[i].roles.push(newRole);
          }
        }
        this.tokenStorage.saveAppPrivs(this.allApps);
        this.showAlert("add_role","add_role_success");
        
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
 /*    const dialogRef = this.dialog.open(GlobalDialogComponent, {
      width: '350px',
      data: {title:title,message: msg}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    }); */
}
}
