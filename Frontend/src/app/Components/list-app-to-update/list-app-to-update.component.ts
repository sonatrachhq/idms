import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IgxPaginatorComponent, IgxFilterOptions } from 'igniteui-angular';

import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomePageService } from '../../Services/home-page.service';
import { UserAppPrivs } from '../../Models/UserAppPrivs';
import { GlobalDialogComponent } from '../../Modals/global-dialog/global-dialog.component';
import { AppManagementService } from '../../Services/app-management.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../Modals/error-dialog/error-dialog.component';
import { GlobalAppService } from '../../IdmsServices/global-app.service';
import { UserIDMS } from '../../Models/UserIDMS';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Applications } from '../../Models/Applications';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddRoleComponent } from 'src/app/Modals/add-role/add-role.component';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-list-app-to-update',
  templateUrl: './list-app-to-update.component.html',
  styleUrls: ['./list-app-to-update.component.css']
})
export class ListAppToUpdateComponent implements OnInit {

  public searchApp: string;
  public density = 'comfortable';

  public addPadding:boolean=true;
  public itemsPerPage = [5,10,15,20];
  @ViewChild('paginator', { static: true })
  public paginator!: IgxPaginatorComponent;
  position:string="below";
  tooltipMsg="btn_detail_flip_card";
  apps:UserAppPrivs[]=[];
  @Input('mode') mode:number;
  currentUser:UserIDMS={
    "idlang":0,
    "iduser":0,
    "iduseridms":0,
    "pswuser":"",
    "sonuser":this.tokenStorage.getSonuser(),
    "sysdate":new Date,
    "userstatus":0,
    "username":""
  };
  constructor(private tokenStorage: TokenStorageService, 
    private globalService:GlobalAppService,
    public dialog: MatDialog,
    private homePageService:HomePageService,private _snackBar: MatSnackBar,
    public translate: TranslateService,
    private appManagementService:AppManagementService,
    private router :Router) { }

  ngOnInit(): void {
    this.globalService.getCurrentUser(this.currentUser).subscribe(
      data => {  
       
       this.currentUser=data;
        this.getAllApps();
       
    },
    error => {
     //console.log(error);
     this.openDialogError("global_error_msg");
     
     
      
    }
    )
  }
  getAllApps(){
    if(this.tokenStorage.getRoles().length!=0){
      this.apps=this.tokenStorage.getAppPrivs().filter(app=>app.applicationmode==this.mode);
     }else{
      this.apps=this.tokenStorage.getAppPrivs().filter(
        app=>app.iduseridms==this.currentUser.iduseridms && app.applicationmode==this.mode
      );
     
     }
  }
  public get data() {
    let application = this.apps;
    
    application = this.paginator
      ? this.apps.slice(
          this.paginator.page * this.paginator.perPage,
          this.paginator.page * this.paginator.perPage + this.paginator.perPage
        )
      : application;
    return application;
  }
  public navigateToFirstPage() {
    this.paginator.page = 0;
  }
  openSnackBar(app:UserAppPrivs) {
    this._snackBar.open(this.translate.instant(app.applicationdetail.toString()),this.translate.instant('close_alert'));
   
  }
  updateApp(app:Applications){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "idapplication":app.idapplication,
        "applicationdesc":app.applicationdesc,
        "applicationtitle":app.applicationtitle,
        "applicationdetail":app.applicationdetail,
        "iconurl":app.iconurl,
        "applicationurl":app.applicationurl,
        "applicationmode":app.applicationmode,
        "ieflag":app.ieflag,
        "publicflag":app.publicflag
        
      }
  };
  //console.log(navigationExtras)
    this.router.navigate(['updateApplication'],navigationExtras );
  }

  openAddRoleModal(app:Applications){
    const dialogRef = this.dialog.open(AddRoleComponent, {
      width: '650px',
      data: {app:app,currentUser:this.currentUser.iduseridms}
    });
  
    dialogRef.afterClosed().subscribe(result => {
     // window.location.reload();
    });

  }
  get filterApps() {
   
    const fo = new IgxFilterOptions();
    fo.key = 'applicationtitle';
    fo.inputValue = this.searchApp;
    return fo;
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
    const dialogRef = this.dialog.open(GlobalDialogComponent, {
      width: '350px',
      data: {title:title,message: msg}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
}
}
