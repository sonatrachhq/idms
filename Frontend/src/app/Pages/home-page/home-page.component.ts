import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAppPrivs } from './../../Models/UserAppPrivs';
import { UserIDMS } from './../../Models/UserIDMS';
import { TokenStorageService } from './../../auth/token-storage.service';
import { Observable } from 'rxjs';
import { Applications } from './../../Models/Applications';
import { HomePageService } from './../../Services/home-page.service';
import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { RoleSelectComponent } from 'src/app/Modals/role-select/role-select.component';
import { CopyLinkComponent } from 'src/app/Modals/copy-link/copy-link.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { IgxFilterOptions } from 'igniteui-angular';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  currentUser:UserIDMS={
    "idlang":0,
    "iduser":0,
    "iduseridms":0,
    "pswuser":"",
    "sonuser":this.tokenStorage.getSonuser(),
    "sysdate":new Date,
    "userstatus":0
  };
  tooltipMsg="btn_detail_flip_card";
  public density = 'comfortable';
  columns: number = 1;
  position:string="below";
  modes=["prod","pre_prod","dev"];
  public searchApp: string;
  apps$:Observable<Array<UserAppPrivs>>;
  applications:UserAppPrivs[]=[];

  constructor(private tokenStorage: TokenStorageService,private homePageService:HomePageService,public dialog: MatDialog,private _snackBar: MatSnackBar,public translate: TranslateService) { 
    
  }

  ngOnInit(): void {
    this.currentUser.sonuser=this.tokenStorage.getSonuser();
    //console.log(this.currentUser)
    this.homePageService.getUsersAppPrivs(this.currentUser).subscribe(
      (data)=>{
       
        this.applications=data;
       
        //get apps by mode default mode:0 prod
        this.apps$=this.homePageService.getAppsByMode(this.applications,"0");
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  updateData(event:any){
   
    let mode:string=event.index;
   
    this.apps$=this.homePageService.getAppsByMode(this.applications,mode.toString());
  }


  openRoleSelect(app:UserAppPrivs) {
    if(app.roles.length>1){
      const dialogRef = this.dialog.open(RoleSelectComponent, {
        width: '450px',
        data: {roles:app.roles,
        appUrl:app.applicationurl.toString() }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        //window.location.reload();
      });
    }else{
      if(app.ieflag==1){
        window.open(app.applicationurl.toString(), "_blank");
      }else{
        const dialogRef = this.dialog.open(CopyLinkComponent, {
          width: '380px',
          data: {
            appUrl:app.applicationurl.toString() }
        });
    
        dialogRef.afterClosed().subscribe(result => {
         // window.location.reload();
        });
      }
     
    }
    
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
}


