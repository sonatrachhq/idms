import { DeleteObjAdminComponent } from './../../Modals/delete-obj-admin/delete-obj-admin.component';
import { LoginPageService } from './../../Services/login-page.service';
import { AssocObjAdminComponent } from './../../Modals/assoc-obj-admin/assoc-obj-admin.component';
import { AssocObjComponent } from './../../Modals/assoc-obj/assoc-obj.component';
import { GlobalDialogComponent } from './../../Modals/global-dialog/global-dialog.component';
import { ErrorDialogComponent } from 'src/app/Modals/error-dialog/error-dialog.component';
import { Applications } from './../../Models/Applications';
import { AppManagementService } from './../../Services/app-management.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomePageService } from './../../Services/home-page.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalAppService } from './../../IdmsServices/global-app.service';
import { TokenStorageService } from './../../auth/token-storage.service';
import { UserIDMS } from './../../Models/UserIDMS';
import { UserAppPrivs } from 'src/app/Models/UserAppPrivs';
import { IgxPaginatorComponent, IgxFilterOptions } from 'igniteui-angular';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-assoc-obj-tab-admin',
  templateUrl: './assoc-obj-tab-admin.component.html',
  styleUrls: ['./assoc-obj-tab-admin.component.css']
})
export class AssocObjTabAdminComponent implements OnInit {

  public density = 'comfortable';
  public itemsPerPage = [5,10,15,20];
  @ViewChild('paginator', { static: true })
  public paginator!: IgxPaginatorComponent;
  position:string="below";
  tooltipMsg="btn_detail_flip_card";
  apps:UserAppPrivs[]=[];
  public addPadding:boolean=true;
  public searchApp: string;
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
  @Input('mode') mode:number;
  @Input('state')state:number;
  constructor(private tokenStorage: TokenStorageService, 
    private loginpageService:LoginPageService,
    private globalService:GlobalAppService,
    public dialog: MatDialog,
    private homePageService:HomePageService,
    private _snackBar: MatSnackBar,
    public translate: TranslateService,
   
    private appManagementService:AppManagementService) { }

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
  
    this.loginpageService.getAdminAllApps(this.currentUser).subscribe(
      (data)=>{
        this.apps=data.filter(app=>app.applicationmode==this.mode );
      },
      (error)=>{
        this.openDialogError("global_error_msg");
      }
    )
    
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


  openAssocObjModal(app:Applications){
      
  
        const dialogRef = this.dialog.open(AssocObjAdminComponent, {
          width: '650px',
          data: {app:app,currentUser:this.currentUser.iduseridms}
        });
      
        dialogRef.afterClosed().subscribe(result => {
         // window.location.reload();
        });
     
    

  }
  openDeleteObjModal(app:Applications){
      
  
    const dialogRef = this.dialog.open(DeleteObjAdminComponent, {
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
     // window.location.reload();
    });
}
}

