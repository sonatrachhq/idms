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
import { IgxFilterOptions, IgxPaginatorComponent } from 'igniteui-angular';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  
  modes=["prod","pre_prod","dev"];
  applications:UserAppPrivs[]=[];
  allApps:UserAppPrivs[]=[];
 
  constructor(private tokenStorage: TokenStorageService,private homePageService:HomePageService,public dialog: MatDialog,private _snackBar: MatSnackBar,public translate: TranslateService) { 
  
  }

  ngOnInit(): void {
    
   //console.log(this.tokenStorage.getEmail())

    this.allApps=this.tokenStorage.getAppPrivs();
    this.applications=this.tokenStorage.getAppPrivs().filter(app=>app.applicationmode==0);
   
    
  }
  updateData(event:any){
    
    let mode:string=event.index;
    this.applications= this.allApps.filter(app=>app.applicationmode==event.index);
   
    
    //this.apps$=this.homePageService.getAppsByMode(this.allApps,mode.toString());
    
  }


 
}


