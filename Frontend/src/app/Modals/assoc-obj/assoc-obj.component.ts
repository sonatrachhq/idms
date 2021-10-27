
import { TranslateService } from '@ngx-translate/core';
import { RoleObjects } from './../../Models/RoleObjects';
import { ObjectUsers } from './../../Models/ObjectUsers';
import { AppObjects } from './../../Models/AppObjects';
import { GlobalDialogComponent } from './../global-dialog/global-dialog.component';
import { ErrorDialogComponent } from './../error-dialog/error-dialog.component';
import { ObjectType } from './../../Models/ObjectType';
import { UsersObject } from './../../Models/UsersObject';
import { Applications } from './../../Models/Applications';
import { UserAppPrivs } from './../../Models/UserAppPrivs';
import { Role } from './../../Models/Role';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from './../../auth/token-storage.service';
import { AppManagementService } from './../../Services/app-management.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { thisYear } from '@igniteui/material-icons-extended';
import { from } from 'rxjs';
import Swal from 'sweetalert2'
export interface DialogData {

  app: Applications,
  currentUser: number

}
@Component({
  selector: 'app-assoc-obj',
  templateUrl: './assoc-obj.component.html',
  styleUrls: ['./assoc-obj.component.css']
})
export class AssocObjComponent implements OnInit {
  chooseObj: Boolean = false;
  formGroup: FormGroup = new FormGroup({});
  form: FormGroup = new FormGroup({});
  roles: Role[] = [];
  allApps: UserAppPrivs[] = [];
  apps: UserAppPrivs[] = [];
  objects: UsersObject[] = [];
  allObjects: UsersObject[] = [];
  allObj: ObjectType[] = [];
  allObjc: ObjectType[] = [];
  selectedObjects: ObjectType[] = [];
  selectedRoles: Role[] = [];
 objUsersToAdd: boolean=false;
    roleObjectsToAdd:boolean=false;
   objUsersToDrop: boolean=false;
  roleObjectsToDrop:boolean=false;
  temp: ObjectType[]=[];
  idsobject = new FormControl(this.selectedObjects, [Validators.required]);

  selectedExistingObjects: ObjectType[] = [];
  idsobjectExisting = new FormControl(this.selectedExistingObjects);
  showSpinner: Boolean = false;


  constructor(private appManagementService: AppManagementService,
    private tokenStorage: TokenStorageService,
    public dialog: MatDialog,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    //first grp 
    this.formGroup = new FormGroup({

      idrole: new FormControl('', [Validators.required]),


    });
    //second grp
    this.form = new FormGroup({

      idrole: new FormControl('', [Validators.required]),
      existidrole: new FormControl('', [Validators.required])

    });
  }

  ngOnInit(): void {
    this.apps = this.tokenStorage.getAppPrivs();
    //get app objects for selected app
    this.allObjects = this.tokenStorage.getObjects().filter(ob => ob.idapplication == this.data.app.idapplication);
    ////console.log(this.allObjects)
    this.objects = this.tokenStorage.getObjects().filter(ob => ob.idapplication == this.data.app.idapplication);
    //get app roles for selected app
    this.allApps = this.tokenStorage.getAppPrivs().filter(app => app.idapplication == this.data.app.idapplication);
    ////console.log(this.allApps)
    for (let i = 0; i < this.allApps[0].roles.length; i++) {
      this.roles.push(this.allApps[0].roles[i]);
    }
    ////console.log(this.roles)
    this.appManagementService.findObjectsByApp(this.data.app).subscribe(
      data => {
        data.forEach(obj => {
          let userObj: ObjectType = {
            "idobject": obj.idobject,
            "descobject": obj.descobject,
            "idobjecttype": obj.idobjecttype,
            "idparentobject": obj.idparentobject,
            "idrole": 0,
            "idstatus": obj.idstatus,
            "privenddate": new Date,
            "privstartdate": new Date,
            "interimstartdate":new Date,
            "interimenddate":new Date
          }
          this.allObj.push(userObj);
          this.allObjc.push(userObj);
        })



      },
      error => {
        ////console.log(error);
        this.openDialogError("global_error_msg");



      }
    )

  }
  //*********************************************First modal controls (choosing role and associate objects)************************************************ */

  ischekedindex(ibObject: number, allObj: ObjectType[]) {
    for (let i = 0; i < allObj.length; i++) {
      if (allObj[i].idobject == ibObject) {
        allObj.splice(i, 1);
      }
    }

  }


  firstDropDownChanged() {
    
   
    let selectedRole = this.formGroup.get("idrole").value.idrole;
    //this.objects=this.tokenStorage.getObjects().filter(app=>app.idapplication==this.data.app.idapplication);
    this.objects.forEach(ob => {
      this.selectedObjects = ob.objects.filter(obj => obj.idrole == selectedRole);
    });

    
    this.idsobject = new FormControl(this.selectedObjects, [Validators.required]);
    this.idsobject.setValue(this.selectedObjects)
    ////console.log(this.objects)
    
      this.objects[0].objects.forEach(obj => {
        if(obj.idrole==selectedRole){
          this.ischekedindex(obj.idobject, this.allObj);
        
          this.allObj.push(obj)
        }
     
      }

      );

   
    ////console.log(this.allObj)

  }
  filterSelectedObjects(idrole:number,selectedObjects: ObjectType[] ) {
    //////console.log(this.temp)
    let add : ObjectType[] = [];
   
    let temp: ObjectType[]=[];
    
    let drop: ObjectType[] = selectedObjects;
   this.temp.forEach(
     obj=>add.push(obj)
   )
   this.temp.forEach(
     obj=>temp.push(obj)
   )
  /*  ////console.log(add);
   ////console.log(temp); */
    //to add
    selectedObjects.forEach(ob => {
      this.ischekedindex(ob.idobject, add)

    })

    
   // ////console.log(add);

    //to drop 
    temp.forEach(ob=>{
      this.ischekedindex(ob.idobject,drop)
    })
   
   // ////console.log(drop);

    let objUsersToAdd: ObjectUsers[]=[];
    let roleObjectsToAdd: RoleObjects[]=[];
    let objUsersToDrop: ObjectUsers[]=[];
    let roleObjectsToDrop: RoleObjects[]=[];
    let state:number;
    if(add.length!=0&&drop.length!=0){
      state=0
    }else if(add.length!=0&&drop.length==0){
      state=1
    }else{
      state=2
    }
    let allObjects = this.tokenStorage.getObjects();
    
    if(add.length!=0){
      add.forEach(obj=>{
        let objToSave:ObjectUsers={
          "idobject":obj.idobject,
          "iduser":this.data.currentUser,
          "iduseridms":this.data.currentUser,
          "systemdate":new Date
        }
        let roleToSave:RoleObjects={
          "idobject":obj.idobject,
          "idrole":idrole,
          "iduser":this.data.currentUser,
          "systemdate":new Date
        }
        objUsersToAdd.push(objToSave);
        roleObjectsToAdd.push(roleToSave);
        obj.idrole=idrole;
        allObjects.forEach(object=>{
          if(object.idapplication==this.data.app.idapplication){
            object.objects.push(obj)
          }
        })
      })
     /* ////console.log("to add");
      ////console.log(objUsersToAdd)
      ////console.log(roleObjectsToAdd) */

      this.saveObjUser(objUsersToAdd,state)
      this.saveRoleObj(roleObjectsToAdd,state)
     
     
     
    }
    if(drop.length!=0){
      drop.forEach(obj=>{
        let objToSave:ObjectUsers={
          "idobject":obj.idobject,
          "iduser":this.data.currentUser,
          "iduseridms":this.data.currentUser,
          "systemdate":new Date
        }
        let roleToSave:RoleObjects={
          "idobject":obj.idobject,
          "idrole":idrole,
          "iduser":this.data.currentUser,
          "systemdate":new Date
        }
        objUsersToDrop.push(objToSave);
        roleObjectsToDrop.push(roleToSave);
      
      
        allObjects.forEach(object=>{
          if(object.idapplication==this.data.app.idapplication){
            for(let i=0;i<object.objects.length;i++){
              if(object.objects[i].idobject==obj.idobject){
                
                object.objects.splice(i,1);
              }
            }
          }
        })
      })
      /*////console.log("to drop");
      ////console.log(objUsersToDrop)
      ////console.log(roleObjectsToDrop)*/
  
      
      this.deleteObjUser(objUsersToDrop,state)
      this.deleteRoleObj(roleObjectsToDrop,state)
      
    }
    //////console.log(allObjects)
    this.tokenStorage.saveObjects(allObjects)
  }
  fillArray( temp: ObjectType){
    this.temp.push(temp)
  }

  onSubmit(form) {
this.showSpinner=true;
    this.temp=[];
   ////console.log(this.idsobject.value)
   let listObjts: ObjectType[] = this.idsobject.value;
   
   for(let i=0;i<listObjts.length;i++){
    //////console.log(listObjts[i])
    this.fillArray(listObjts[i])
   }
 
   
  
   this.filterSelectedObjects(form.idrole.idrole,this.selectedObjects);
  
  }
  saveObjUser(objUsers: ObjectUsers[],state:number){
  /*   ////console.log("saveObjUser")
    ////console.log(objUsers) */
    this.appManagementService.saveObjectUser(objUsers).subscribe(
      data => {
        if(data!=null){
          ////console.log(data)
          this.objUsersToAdd=true;
         this.showSucessAlert("assoc_obj", "assoc_obj_success",state);
        }
        
     },
     error => {
      ////console.log(error);
      this.openDialogError("global_error_msg");
      
      
       
     }
    )
   
  }
  deleteObjUser(objUsers: ObjectUsers[],state:number){
    this.appManagementService.deleteObjectUser(objUsers).subscribe(
      data => {
        if(data!=null){
          ////console.log(data)
          this.objUsersToDrop=true
         this.showSucessAlert("assoc_obj", "assoc_obj_success",state);
        }
        
     },
     error => {
      ////console.log(error);
      this.openDialogError("global_error_msg");
      
      
       
     }
    )
    
  }
  saveRoleObj(roleObjects: RoleObjects[],state:number) {
    this.appManagementService.saveRoleObjects(roleObjects).subscribe(
      data => {
        if (data != null) {
          ////console.log(data)
          this.roleObjectsToAdd=true
          this.showSucessAlert("assoc_obj", "assoc_obj_success",state);
        }

      },
      error => {
        ////console.log(error);
        this.openDialogError("global_error_msg");



      }
    )

  }
  deleteRoleObj(roleObjects: RoleObjects[],state:number) {
    this.appManagementService.deleteRoleObjects(roleObjects).subscribe(
      data => {
        if (data != null) {
          ////console.log(data)
          this.roleObjectsToDrop=true;
          this.showSucessAlert("assoc_obj", "assoc_obj_success",state);
         
        }
        
      },
      error => {
        ////console.log(error);
        
        this.openDialogError("global_error_msg");
       


      }
     
    )
    
  }
  //*********************************************Second modal controls (choosing existing role and associate its objects)************************************************ */
  roleSelectChanged() {
    let selectedRole = this.form.get('existidrole').value.idrole;

    //////console.log(selectedRole)
    this.allObjects.forEach(obj => {
      this.selectedExistingObjects = obj.objects.filter(ob => ob.idrole == selectedRole)
    });
  
    this.idsobjectExisting = new FormControl(this.selectedExistingObjects);
    //////console.log(this.idsobjectExisting)
    this.idsobjectExisting.setValue(this.selectedExistingObjects)
    
    this.selectedExistingObjects.forEach(obj => {
        this.ischekedindex(obj.idobject, this.allObjc);
       
        this.allObjc.push(obj)
      }) 
   
  }
  associateObj(form) {
    ////console.log(form.idrole)
    ////console.log(form.existidrole)
    ////console.log(this.idsobjectExisting.value)
    this.showSpinner=true;
    this.temp=[];
    let listObjts: ObjectType[] = this.idsobjectExisting.value;
   
    for(let i=0;i<listObjts.length;i++){
     //////console.log(listObjts[i])
     this.fillArray(listObjts[i])
    }
  this.filterExistingObjects(form.idrole.idrole,this.selectedExistingObjects);
  }
  filterExistingObjects(idrole:number,selectedObjects: ObjectType[] ) {
    const iterator =this.selectedExistingObjects.values()
    let selectedObj: ObjectType[]=[];
    for (let value of iterator) {
  
      let userObj: ObjectType = {
        "idobject": value.idobject,
        "descobject": value.descobject,
        "idobjecttype": value.idobjecttype,
        "idparentobject": value.idparentobject,
        "idrole": value.idrole,
        "idstatus": value.idstatus,
        "privenddate": value.privenddate,
        "privstartdate": value.privstartdate,
        "interimstartdate":value.interimstartdate,
        "interimenddate":value.interimenddate
      }
      ////console.log(userObj)
      selectedObj.push(userObj)
    
    }
   
   
    let temp: ObjectType[]=[];
    
    let drop: ObjectType[] = this.selectedExistingObjects;
  
   this.temp.forEach(
     obj=>temp.push(obj)
   )

  
   ////console.log(temp);
    

    //to drop 
    temp.forEach(ob=>{
      this.ischekedindex(ob.idobject,drop)
    })
    ////console.log("to drop");
   ////console.log(drop);
//to add
////console.log(this.temp)
////console.log(selectedObj)
selectedObj.forEach(ob => {
  this.ischekedindex(ob.idobject, temp)

})

////console.log("to add");
////console.log(temp);
    let objUsersToAdd: ObjectUsers[]=[];
    let roleObjectsToAdd: RoleObjects[]=[];
    let objUsersToDrop: ObjectUsers[]=[];
    let roleObjectsToDrop: RoleObjects[]=[];
    let state:number;
    if(temp.length!=0&&drop.length!=0){
      state=0
    }else if(temp.length!=0&&drop.length==0){
      state=1
    }else{
      state=2
    }
    let allObjects = this.tokenStorage.getObjects();
    
     if(temp.length!=0){
      temp.forEach(obj=>{
        let objToSave:ObjectUsers={
          "idobject":obj.idobject,
          "iduser":this.data.currentUser,
          "iduseridms":this.data.currentUser,
          "systemdate":new Date
        }
        let roleToSave:RoleObjects={
          "idobject":obj.idobject,
          "idrole":idrole,
          "iduser":this.data.currentUser,
          "systemdate":new Date
        }
        objUsersToAdd.push(objToSave);
        roleObjectsToAdd.push(roleToSave);
        obj.idrole=idrole;
        allObjects.forEach(object=>{
          if(object.idapplication==this.data.app.idapplication){
            object.objects.push(obj)
          }
        })
      })
     ////console.log("to add");
      ////console.log(objUsersToAdd)
      ////console.log(roleObjectsToAdd)

      this.saveObjUser(objUsersToAdd,state)
      this.saveRoleObj(roleObjectsToAdd,state)
     
     
     
    }
    if(drop.length!=0){
      drop.forEach(obj=>{
        let objToSave:ObjectUsers={
          "idobject":obj.idobject,
          "iduser":this.data.currentUser,
          "iduseridms":this.data.currentUser,
          "systemdate":new Date
        }
        let roleToSave:RoleObjects={
          "idobject":obj.idobject,
          "idrole":idrole,
          "iduser":this.data.currentUser,
          "systemdate":new Date
        }
        objUsersToDrop.push(objToSave);
        roleObjectsToDrop.push(roleToSave);
      
      
        allObjects.forEach(object=>{
          if(object.idapplication==this.data.app.idapplication){
            for(let i=0;i<object.objects.length;i++){
              if(object.objects[i].idobject==obj.idobject){
                
                object.objects.splice(i,1);
              }
            }
          }
        })
      })
      /*////console.log("to drop");
      ////console.log(objUsersToDrop)
      ////console.log(roleObjectsToDrop)*/
  
      
      this.deleteObjUser(objUsersToDrop,state)
      this.deleteRoleObj(roleObjectsToDrop,state)
      
    }
    ////console.log(allObjects)
    this.tokenStorage.saveObjects(allObjects) 
  }


  //***************************************************Error handling************************************************** */
  openDialogError(error: String): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '650px',
      data: { message: error }
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }


  showAlert(title: String, msg: String) {
    const dialogRef = this.dialog.open(GlobalDialogComponent, {
      width: '350px',
      data: { title: title, message: msg }
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }
  showSucessAlert(title: String, msg: String,state:number) {
    //////console.log(state)
    this.showSpinner=false
     if(state==0){
       if(this.objUsersToAdd&&this.objUsersToDrop&&this.roleObjectsToAdd&&this.roleObjectsToDrop){
        Swal.fire({
          icon: 'success',
          title: this.translate.instant(title.toString()),
          text: this.translate.instant(msg.toString()),
          showConfirmButton: false,
        }).then((result) => {
        //  window.location.reload();
        this.dialog.closeAll()
        })
       /* const dialogRef = this.dialog.open(GlobalDialogComponent, {
          width: '350px',
          data: { title: title, message: msg }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          window.location.reload();
        });*/
       }
     }else{
       if(state==1){
        if(this.objUsersToAdd&&this.roleObjectsToAdd){
          Swal.fire({
            icon: 'success',
            title: this.translate.instant(title.toString()),
            text: this.translate.instant(msg.toString()),
            showConfirmButton: false,
          }).then((result) => {
           // window.location.reload();
           this.dialog.closeAll()
          })
         /* const dialogRef = this.dialog.open(GlobalDialogComponent, {
            width: '350px',
            data: { title: title, message: msg }
          });
      
          dialogRef.afterClosed().subscribe(result => {
            window.location.reload();
          });*/
       }
     }else{
      if(this.objUsersToDrop&&this.roleObjectsToDrop){
        Swal.fire({
          icon: 'success',
          title: this.translate.instant(title.toString()),
          text: this.translate.instant(msg.toString()),
          showConfirmButton: false,
        }).then((result) => {
         // window.location.reload();
         this.dialog.closeAll()
           })
        /* const dialogRef = this.dialog.open(GlobalDialogComponent, {
          width: '350px',
          data: { title: title, message: msg }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          window.location.reload();
        }); */
      }
     }
  
    
   
    }
  }
}
