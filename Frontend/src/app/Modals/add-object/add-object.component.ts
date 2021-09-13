import { Router } from '@angular/router';
import { AppObjects } from './../../Models/AppObjects';
import { ObjectType } from './../../Models/ObjectType';
import { UsersObject } from './../../Models/UsersObject';
import { ErrorDialogComponent } from './../error-dialog/error-dialog.component';
import { Applications } from './../../Models/Applications';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from './../../auth/token-storage.service';
import { AppManagementService } from './../../Services/app-management.service';
import { ObjType } from './../../Models/ObjType';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
export interface DialogData {
 
  app:Applications,
  currentUser:number
  
 }
@Component({
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.css']
})
export class AddObjectComponent implements OnInit {
  allObjType:ObjType[]=[];
  formGroup: FormGroup = new FormGroup({});
  allObjects: UsersObject[] = [];
  allObjc: AppObjects[] = [];
  allObj: ObjectType[] = [];

  appObj:AppObjects={
    "descobject":"",
    "idapplication":0,
    "idobjecttype":0,
    "idparentobject":0,
    "idstatus":1
  }
  constructor(private appManagementService:AppManagementService,
    private tokenStorage: TokenStorageService,
    private translate: TranslateService,
    private router: Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      this.formGroup = new FormGroup({
    
        idobjecttype: new FormControl('', [Validators.required]),
        idparentobject:new FormControl('', [Validators.required]),
        descobject:new FormControl('', [Validators.required]),
      });
  }


  ngOnInit(): void {
    this.allObjects = this.tokenStorage.getObjects().filter(ob => ob.idapplication == this.data.app.idapplication);
    console.log(this.router.url)
    let app:Applications={
      "idapplication":this.data.app.idapplication,
      "applicationdesc":"",
      "applicationtitle":"",
      "applicationdetail":"",
      "iconurl":"",
      "applicationurl":"",
      "applicationmode":0,
      "ieflag":0,
      "applicationstatus":1,
      "dashbvisibility":1,
      "iduser":0,
      "systemdate":new Date,
      "publicflag":0

    }
    this.appManagementService.findObjectsByApp(app).subscribe(
      data => {  
       if(data!=null){
        this.allObjc=data;
       }
     },
     error => {
      //console.log(error);
      this.openDialogError("global_error_msg");
      
      
       
     }
    )
    
  
 
    

  
    console.log(this.allObjc)
    this.appManagementService.getAllObjTypes().subscribe(
      data => {  
        this.allObjType=data;
     },
     error => {
      //console.log(error);
      this.openDialogError("global_error_msg");
      
      
       
     }
    )
  }
  onSubmit(form:any){
    console.log(form)
    this.appObj.descobject=form.descobject;
    this.appObj.idapplication=this.data.app.idapplication;
    this.appObj.idobjecttype=form.idobjecttype.idobjecttype;
    this.appObj.idparentobject=form.idparentobject.idparentobject;
    this.appManagementService.addAppObject(this.appObj).subscribe(
      data=>{
        if(data!=null){
          this.showAlert("add_obj","update_app_success");
        }
      },
      error=>{
        this.openDialogError("global_error_msg");
      }
    )
   // this.showConfirm("delete_role_qts");
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
    /*  Swal.close()
     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([this.router.url]); 
  });*/
    
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
