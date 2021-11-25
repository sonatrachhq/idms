import { ErrorDialogComponent } from 'src/app/Modals/error-dialog/error-dialog.component';
import { Applications } from './../../Models/Applications';
import { AppPrivs } from './../../Models/AppPrivs';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from './../../auth/token-storage.service';
import { AppManagementService } from './../../Services/app-management.service';
import { UserIDMS } from './../../Models/UserIDMS';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Role } from './../../Models/Role';
import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2'
export interface DialogData {
 
  app:Role[],
  currentUser:number
  
 }
@Component({
  selector: 'app-affect-role-admin',
  templateUrl: './affect-role-admin.component.html',
  styleUrls: ['./affect-role-admin.component.css']
})
export class AffectRoleAdminComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  allIdmsUsers:UserIDMS[]=[];
  
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
   
   this.roles=this.data.app;
   
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
        if(data!=null){
          this.showAlert("affect_role","affect_role_success");
        }
        
     
        
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
