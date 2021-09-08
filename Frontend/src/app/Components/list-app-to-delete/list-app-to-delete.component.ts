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
import Swal from 'sweetalert2';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';
@Component({
  selector: 'app-list-app-to-delete',
  templateUrl: './list-app-to-delete.component.html',
  styleUrls: ['./list-app-to-delete.component.css']
})
export class ListAppToDeleteComponent implements OnInit {

  
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
    "userstatus":0
  };
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
  };
  app:Applications={
    "idapplication":0,
"applicationdesc":"",
"applicationtitle":"",
"applicationdetail":"",
"iconurl":"",
"applicationurl":"",
"applicationmode":0,
"ieflag":0,
"applicationstatus":1,
"dashbvisibility":1,
"iduser":this.currentUser.iduser,
"systemdate":new Date,
"publicflag":0};

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
    this.apps=this.tokenStorage.getAppPrivs();
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
  deleteApp(app:Applications){
    
        this.app.idapplication=app.idapplication,
        this.app.applicationdesc=app.applicationdesc,
        this.app.applicationtitle=app.applicationtitle,
        this. app.applicationdetail=app.applicationdetail,
        this.app.iconurl=app.iconurl,
        this.app.applicationurl=app.applicationurl,
        this.app.applicationmode=app.applicationmode,
        this.app.ieflag=app.ieflag,
        this.app.publicflag=app.publicflag
        
      
  
  
    //this.router.navigate(['updateApplication'],navigationExtras );
    this.showConfirm("delete_app_qst");
    //this.showConfirm()
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
        this.appManagementService.deleteApplication(this.app).subscribe(
          data => {  
            console.log(data)
            for(let i=0;i<this.apps.length;i++){
                if(this.apps[i].idapplication==this.app.idapplication){
                    this.apps.splice(i,1);
                }
            }
           this.tokenStorage.saveAppPrivs(this.apps)
           this.showAlert("delete_app","update_app_success");
             
            
         },
         error => {
          //console.log(error);
          this.openDialogError("global_error_msg");
          
          
           
         }
        )
      } else if (result.isDenied) {
        Swal.close();
     
      }
    })
  
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
