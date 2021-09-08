import { ErrorDialogComponent } from './../error-dialog/error-dialog.component';
import { AppObjects } from './../../Models/AppObjects';
import { UsersObject } from './../../Models/UsersObject';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from './../../auth/token-storage.service';
import { AppManagementService } from './../../Services/app-management.service';
import { Applications } from './../../Models/Applications';
import { ObjectType } from './../../Models/ObjectType';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2'
export interface DialogData {
 
  app:Applications,
  currentUser:number
  
 }

@Component({
  selector: 'app-update-object',
  templateUrl: './update-object.component.html',
  styleUrls: ['./update-object.component.css']
})
export class UpdateObjectComponent implements OnInit {

  
  allObjc: ObjectType[] = [];
  allObjects: UsersObject[] = [];
  allObj: UsersObject[] = [];
  distinctObj: ObjectType[] = [];
  appObjects:AppObjects[]=[];
  formGroup: FormGroup = new FormGroup({});
  constructor(private appManagementService:AppManagementService,
    private tokenStorage: TokenStorageService,
    private translate: TranslateService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      this.formGroup = new FormGroup({
    
        idobject: new FormControl('', [Validators.required]),
       
        descobject:new FormControl('', [Validators.required]),
      });
     }

  ngOnInit(): void {
    this.allObjects = this.tokenStorage.getObjects().filter(ob => ob.idapplication == this.data.app.idapplication);
    this.allObj=this.tokenStorage.getObjects();
    this.allObjc=this.allObjects[0].objects;
    //supprimer les objets redondants (differents role meme objet)
    var unique = [],  l = this.allObjc.length, i;
    for( i=0; i<l; i++) {
    if( unique[this.allObjc[i].idobject]) continue;
    unique[this.allObjc[i].idobject] = true;
    this.distinctObj.push(this.allObjc[i]);
    }
    //console.log(this.allObjc)
  }
  onSubmit(form:any) {
 
   
      let obj:AppObjects={
        "idobject":form.idobject.idobject,
        "descobject":form.descobject,
        "idapplication": this.data.app.idapplication,
        "idobjecttype":form.idobject.idobjecttype,
        "idparentobject":form.idobject.idparentobject,
        "idstatus":1
      }

     // console.log(obj)
     
    this.appManagementService.updateAppObject(obj).subscribe(
      data=>{
        //console.log(data)
        if(data!=null){
          //update in  local storage
        
         this.allObj.forEach(
           obj=>{
             if(obj.idapplication==this.data.app.idapplication){
               
               for(let i=0;i<obj.objects.length;i++){
                
                 if(obj.objects[i].idobject==data.idobject){
                   
                    obj.objects[i].descobject=data.descobject;
                   
                 }
               }
               
             }
           }
         )
       
     
        this.tokenStorage.saveObjects(this.allObj);
         this.showAlert("update_obj","update_app_success");
        }
       
        

      },
      error=>{
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
