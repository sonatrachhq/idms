import { DataSharingService } from './../../IdmsServices/data-sharing.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UsersObject } from './../../Models/UsersObject';
import { TokenStorageService } from './../../auth/token-storage.service';
import { ObjectUsers } from './../../Models/ObjectUsers';
import { ErrorDialogComponent } from 'src/app/Modals/error-dialog/error-dialog.component';
import { UserIDMS } from './../../Models/UserIDMS';
import { Applications } from './../../Models/Applications';
import { ObjectType } from './../../Models/ObjectType';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppManagementService } from './../../Services/app-management.service';
import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2'
export interface DialogData {

  app: Applications,
  currentUser: number

}

@Component({
  selector: 'app-delete-obj-admin',
  templateUrl: './delete-obj-admin.component.html',
  styleUrls: ['./delete-obj-admin.component.css']
})
export class DeleteObjAdminComponent implements OnInit {
  selectedObjects: ObjectType[] = [];
  objUsersToDrop: ObjectUsers[] = [];
  allObjectUsers: ObjectUsers[] = [];
  allIdmsUsers: UserIDMS[] = [];
  allObjects: UsersObject[] = [];
  idsobject = new FormControl(this.selectedObjects, [Validators.required]);
  formGroup: FormGroup = new FormGroup({});
  allObj: ObjectType[] = [];
  allObjCopy: ObjectType[] = [];
  constructor(private appManagementService: AppManagementService,
    public dialog: MatDialog,
    private router:Router,
    private tokenStorage: TokenStorageService,
    private dataSharingService: DataSharingService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    //first grp 
    this.formGroup = new FormGroup({

      iduseridms: new FormControl('', [Validators.required]),

    });

  }

  ngOnInit(): void {
    //get all object users
    this.appManagementService.getAllObjectUser().subscribe(
      data => {
        if (data != null) {
          this.allObjectUsers = data;
          this.findObjectsByApp();
        }

      },
      error => {
        ////console.log(error);
        this.openDialogError("global_error_msg")

      }
    )

    //get app objects for selected app
    this.allObjects = this.tokenStorage.getObjects();

    //get all idms users
    this.appManagementService.getAllIdmsUsers().subscribe(
      data => {
        ////console.log(data)
        this.allIdmsUsers = data;


      },
      error => {
        //console.log(error);
        this.openDialogError("global_error_msg");



      }
    );
  }
  findObjectsByApp() {
    //get all app objects
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
            "interimstartdate": new Date,
            "interimenddate": new Date
          }

          if (this.allObjectUsers.map(obj => obj.idobject).includes(userObj.idobject)) {
            this.allObj.push(userObj);
          }


        })

        this.allObjCopy = this.allObj;

      },
      error => {
        ////console.log(error);
        this.openDialogError("global_error_msg");



      }
    )
  }
  userDropDownChanged() {
    let selectedUser = this.formGroup.get("iduseridms").value.iduseridms;

    let objUser: ObjectType[] = []
    this.allObjCopy.forEach(
      obj => {
        //console.log(obj)
        objUser.push(obj)
      }
    )

   // console.log(objUser.length)
    let allObjUser = this.allObjectUsers.filter(object => object.iduseridms == selectedUser);
    //console.log(allObjUser)
    if (allObjUser.length == 0) {
      this.allObj = []
    } else {
      objUser.forEach(
        (data, i) => {
          if (!allObjUser.map(obj => obj.idobject).includes(data.idobject)) {

            objUser.splice(i, 1)
          }
        }
      )

      this.allObj = objUser;
      //console.log(this.allObj)

    }

  }

  onSubmit(form) {

    //console.log(this.idsobject.value)
    let listObjts: ObjectType[] = this.idsobject.value;
    listObjts.forEach(obj => {
      let objToDrop: ObjectUsers = {
        "idobject": obj.idobject,
        "iduser": this.data.currentUser,
        "iduseridms": form.iduseridms.iduseridms,
        "systemdate": new Date
      }
      this.objUsersToDrop.push(objToDrop);
      this.allObjects.forEach(object => {
        if (object.idapplication == this.data.app.idapplication) {
          for (let i = 0; i < object.objects.length; i++) {
            if (object.objects[i].idobject == obj.idobject) {
  
              object.objects.splice(i, 1);
            }
          }
        }
      })
    })
    this.deleteObjUser(this.objUsersToDrop);
   
 
 
  this.tokenStorage.saveObjects(this.allObjects)
      
      
}

deleteObjUser(objUsers: ObjectUsers[]){
  this.appManagementService.deleteObjectUser(objUsers).subscribe(
    data => {
      if (data != null) {
        ////console.log(data)

        this.showAlert("assoc_obj", "assoc_obj_success");
      }

    },
    error => {
      ////console.log(error);
      this.openDialogError("global_error_msg");



    }
  )

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
  Swal.fire({
    icon: 'success',
    title: this.translate.instant(title.toString()),
    text: this.translate.instant(msg.toString()),
    showConfirmButton: false,
  }).then((result) => {
    // window.location.reload();
    this.dialog.closeAll()
    this.reloadComponent()
  })
  /*  const dialogRef = this.dialog.open(GlobalDialogComponent, {
     width: '350px',
     data: {title:title,message: msg}
   });
 
   dialogRef.afterClosed().subscribe(result => {
     window.location.reload();
   }); */
}
reloadComponent() {
  this.dataSharingService.shouldReload.next(true);
}
}
