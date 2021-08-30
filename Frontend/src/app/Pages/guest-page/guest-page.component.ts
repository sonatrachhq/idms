import { IgxFilterOptions, IgxPaginatorComponent } from 'igniteui-angular';
import { TranslateService } from '@ngx-translate/core';
import { GuestPageService } from './../../Services/guest-page.service';
import { HomePageService } from './../../Services/home-page.service';
import { Applications } from './../../Models/Applications';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAppPrivs } from 'src/app/Models/UserAppPrivs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-guest-page',
  templateUrl: './guest-page.component.html',
  styleUrls: ['./guest-page.component.css']
})
export class GuestPageComponent implements OnInit {
  apps:Applications[];
  public density = 'comfortable';
  tooltipMsg:string="btn_detail_flip_card";
  public searchApp: string;
  position:string="below";
  public itemsPerPage = [5,10,15,20];
@ViewChild('paginator', { static: true })
public paginator!: IgxPaginatorComponent;
  constructor(private guestPageService:GuestPageService,private _snackBar: MatSnackBar,public translate: TranslateService) { }

  ngOnInit(): void {
    this.getAllApps();
  }
  getAllApps(){
    this.guestPageService.getVisibleApps().subscribe(
      (data)=>{
       
        this.apps=data;
       
        
      },
      (error)=>{
        //console.log(error)
      }
    )
  }
  openSnackBar(app:UserAppPrivs) {
    this._snackBar.open(this.translate.instant(app.applicationdetail.toString()),this.translate.instant('close_alert'));
   
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
  get filterApps() {
   
    const fo = new IgxFilterOptions();
    fo.key = 'applicationtitle';
    fo.inputValue = this.searchApp;
    return fo;
  }
}
