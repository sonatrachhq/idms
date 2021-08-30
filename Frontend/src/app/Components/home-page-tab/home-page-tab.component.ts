import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IgxFilterOptions, IgxPaginatorComponent } from 'igniteui-angular';
import { CopyLinkComponent } from './../../Modals/copy-link/copy-link.component';
import { RoleSelectComponent } from 'src/app/Modals/role-select/role-select.component';
import { UserAppPrivs } from './../../Models/UserAppPrivs';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-page-tab',
  templateUrl: './home-page-tab.component.html',
  styleUrls: ['./home-page-tab.component.css']
})
export class HomePageTabComponent implements OnInit {
  public searchApp: string;
  @Input('app') applications:UserAppPrivs[];
 
  tooltipMsg="btn_detail_flip_card";
  public density = 'comfortable';
  public itemsPerPage = [5,10,15,20];
  @ViewChild('paginator', { static: true })
  public paginator!: IgxPaginatorComponent;
  columns: number = 1;
  position:string="below";
 
  constructor(public dialog: MatDialog,private _snackBar: MatSnackBar,public translate: TranslateService) { 
    
  }

  ngOnInit(): void {
    
  }
  public get myapps() {
    ////console.log(this.apps)
    let myapp=this.applications.filter(app=>app.roles.length!=0);
    let app = myapp;
    app = this.paginator
      ? myapp.slice(
          this.paginator.page * this.paginator.perPage,
          this.paginator.page * this.paginator.perPage + this.paginator.perPage
        )
      : app;
    return app;
  }

  public get otherpps(){
   // //console.log(this.applications)
    let otherapp=this.applications.filter(app=>app.roles.length==0);
    let app = otherapp;
    app = this.paginator
      ? otherapp.slice(
          this.paginator.page * this.paginator.perPage,
          this.paginator.page * this.paginator.perPage + this.paginator.perPage
        )
      : app;
    return app;
  }

  public get data(){
    
     let app = this.applications;
     app = this.paginator
       ? this.applications.slice(
           this.paginator.page * this.paginator.perPage,
           this.paginator.page * this.paginator.perPage + this.paginator.perPage
         )
       : app;
     return app;
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
  
  public navigateToFirstPage() {
    this.paginator.page = 0;
  }
  get filterApps() {
   
    const fo = new IgxFilterOptions();
    fo.key = 'applicationtitle';
    fo.inputValue = this.searchApp;
    return fo;
  }
}
