import { Applications } from './../../Models/Applications';
import { AffectRoleAdminComponent } from './../../Modals/affect-role-admin/affect-role-admin.component';
import { LoginPageService } from './../../Services/login-page.service';
import { GlobalAppService } from './../../IdmsServices/global-app.service';
import { GlobalDialogComponent } from './../../Modals/global-dialog/global-dialog.component';
import { ErrorDialogComponent } from 'src/app/Modals/error-dialog/error-dialog.component';
import { UserAppPrivs } from 'src/app/Models/UserAppPrivs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { UserIDMS } from './../../Models/UserIDMS';
import { IgxPaginatorComponent, IgxFilterOptions } from 'igniteui-angular';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from './../../auth/token-storage.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-affect-role-tab-admin',
  templateUrl: './affect-role-tab-admin.component.html',
  styleUrls: ['./affect-role-tab-admin.component.css']
})
export class AffectRoleTabAdminComponent implements OnInit {

  public density = 'comfortable';
  public itemsPerPage = [5,10,15,20];
  @ViewChild('paginator', { static: true })
  public paginator!: IgxPaginatorComponent;
  @Input('mode') mode:number;
  position:string="below";
  tooltipMsg="btn_detail_flip_card";
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
  apps:UserAppPrivs[]=[];
  constructor(private tokenStorage: TokenStorageService, 
    private route: ActivatedRoute,
    private globalService:GlobalAppService,
    private loginpageService:LoginPageService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public translate: TranslateService,
    ) { }


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

  get filterApps() {
   
    const fo = new IgxFilterOptions();
    fo.key = 'applicationtitle';
    fo.inputValue = this.searchApp;
    return fo;
  }

  openAffectRoleModal(j:number){
   console.log(j)
  
      const dialogRef = this.dialog.open(AffectRoleAdminComponent, {
        width: '650px',
        data: {app:this.apps[j].roles,currentUser:this.currentUser.iduseridms}
      });
    
      dialogRef.afterClosed().subscribe(result => {
       // window.location.reload();
      });
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
