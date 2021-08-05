import { IgxFilterOptions } from 'igniteui-angular';
import { TranslateService } from '@ngx-translate/core';
import { GuestPageService } from './../../Services/guest-page.service';
import { HomePageService } from './../../Services/home-page.service';
import { Applications } from './../../Models/Applications';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserAppPrivs } from 'src/app/Models/UserAppPrivs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-guest-page',
  templateUrl: './guest-page.component.html',
  styleUrls: ['./guest-page.component.css']
})
export class GuestPageComponent implements OnInit {
  apps$: Observable<Array<Applications>>=this.guestPageService.getVisibleApps();
  public density = 'comfortable';
  tooltipMsg:string="btn_detail_flip_card";
  public searchApp: string;
  position:string="below";
  constructor(private guestPageService:GuestPageService,private _snackBar: MatSnackBar,public translate: TranslateService) { }

  ngOnInit(): void {

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
