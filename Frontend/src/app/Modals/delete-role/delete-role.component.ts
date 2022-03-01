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

  app: Applications,
  currentUser: number

}

@Component({
  selector: 'app-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.css']
})
export class DeleteRoleComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});

  allApps: UserAppPrivs[] = [];

  roles: Role[] = [];
  role: AppRoles = {
    "descrole": "",
    "idapplication": 0,
    "idrole": 0,
    "idstatus": 0
  }
  apps: UserAppPrivs[] = [];

  constructor(private appManagementService: AppManagementService,
    private tokenStorage: TokenStorageService,
    private translate: TranslateService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.formGroup = new FormGroup({

      idrole: new FormControl('', [Validators.required]),

    });
  }

  ngOnInit(): void {

    this.allApps = this.tokenStorage.getAppPrivs();

    this.apps = this.tokenStorage.getAppPrivs().filter(app => app.idapplication == this.data.app.idapplication);
    for (let i = 0; i < this.apps[0].roles.length; i++) {
      this.roles.push(this.apps[0].roles[i]);
    }

  }


  onSubmit(form: any) {
    //console.log(form)
    this.role.descrole = form.idrole.descrole;
    this.role.idapplication = this.data.app.idapplication;
    this.role.idrole = form.idrole.idrole;
    this.role.idstatus = 1;
    //console.log(this.role)
    this.showConfirm("delete_role_qts");
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

  showConfirm(title: String) {
    Swal.fire({
      title: this.translate.instant(title.toString()),
      showDenyButton: true,
      confirmButtonColor: "#FF8500",
      focusConfirm: false,
      focusDeny: true,
      confirmButtonText: this.translate.instant("btn_role_select_valid"),
      denyButtonText: this.translate.instant("btn_role_select_cancel"),
    }).then((result) => {

      if (result.isConfirmed) {
        this.appManagementService.deleteRole(this.role).subscribe(
          data => {
            if (data != null) {
              //delete from local storage
              this.allApps.forEach(
                app => {
                  if (app.idapplication == this.data.app.idapplication) {
                    for (let i = 0; i < app.roles.length; i++) {
                      if (app.roles[i].idrole == this.role.idrole) {
                        app.roles.splice(i, 1);
                      }
                    }
                  }
                }
              )
              this.tokenStorage.saveAppPrivs(this.allApps);
              this.showAlert("delete_role", "update_app_success");
            }


          },
          error => {
            this.openDialogError("global_error_msg");
          }
        )
      } else if (result.isDenied) {
        Swal.close();

      }
    })

  }

  showAlert(title: String, msg: String) {
    Swal.fire({
      icon: 'success',
      title: this.translate.instant(title.toString()),
      text: this.translate.instant(msg.toString()),
      showConfirmButton: false,
    }).then((result) => {
      //window.location.reload();
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
