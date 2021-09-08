import { ErrorDialogComponent } from './../error-dialog/error-dialog.component';
import { AppObjects } from './../../Models/AppObjects';
import { UsersObject } from './../../Models/UsersObject';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from './../../auth/token-storage.service';
import { AppManagementService } from './../../Services/app-management.service';
import { Applications } from './../../Models/Applications';
import { ObjectType } from './../../Models/ObjectType';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2'
export interface DialogData {
 
  app:Applications,
  currentUser:number
  
 }
@Component({
  selector: 'app-delete-object',
  templateUrl: './delete-object.component.html',
  styleUrls: ['./delete-object.component.css']
})
export class DeleteObjectComponent implements OnInit {
  idsobject = new FormControl('', [Validators.required]);
  allObjc: ObjectType[] = [];
  allObjects: UsersObject[] = [];
  allObj: UsersObject[] = [];
  distinctObj: ObjectType[] = [];
  appObjects:AppObjects[]=[];
  constructor(private appManagementService:AppManagementService,
    private tokenStorage: TokenStorageService,
    private translate: TranslateService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {  }

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
    console.log(this.allObjc)
  }
  onSubmit() {
    console.log(this.idsobject.value)
    for(let i=0;i<this.idsobject.value.length;i++){
      let obj:AppObjects={
        "idobject":this.idsobject.value[i].idobject,
        "descobject":this.idsobject.value[i].descobject,
        "idapplication": this.data.app.idapplication,
        "idobjecttype":this.idsobject.value[i].idobjecttype,
        "idparentobject":this.idsobject.value[i].idparentobject,
        "idstatus":1
      }

      console.log(obj)
      this.appObjects.push(obj);
    }
   this.showConfirm("delete_obj_qts")
  }

  
  showConfirm(title:String) {
    Swal.fire({
      title:this.translate.instant(title.toString()),
      showDenyButton: true,
      confirmButtonColor:"#FF8500",
      focusConfirm:false,
      focusDeny:true,
      confirmButtonText: this.translate.instant("btn_role_select_valid"),
      denyButtonText: this.translate.instant("btn_role_select_cancel"),
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
      
       
        this.appManagementService.deleteAppObject(this.appObjects).subscribe(
         data=>{
           if(data!=null){
             //delete from local storage
             this.appObjects.forEach(
          object=>{
            this.allObj.forEach(
              obj=>{
                if(obj.idapplication==this.data.app.idapplication){
                  
                  for(let i=0;i<obj.objects.length;i++){
                   
                    if(obj.objects[i].idobject==object.idobject){
                      
                      obj.objects.splice(i,1)
                      i--;
                      
                    }
                  }
                  
                }
              }
            )
          }
        )
           this.tokenStorage.saveObjects(this.allObj);
            this.showAlert("delete_obj","update_app_success");
           }
          
           

         },
         error=>{
          this.openDialogError("global_error_msg");
         }
       ) 
      } else if (result.isDenied) {
        Swal.close();
     
      }
    })
  
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
