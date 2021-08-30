import { UsersObject } from './../../Models/UsersObject';
import { AddRoleComponent } from './../../Modals/add-role/add-role.component';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomePageService } from './../../Services/home-page.service';
import { UserAppPrivs } from './../../Models/UserAppPrivs';
import { GlobalDialogComponent } from './../../Modals/global-dialog/global-dialog.component';
import { AppManagementService } from './../../Services/app-management.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './../../Modals/error-dialog/error-dialog.component';
import { GlobalAppService } from './../../IdmsServices/global-app.service';
import { UserIDMS } from './../../Models/UserIDMS';
import { TokenStorageService } from './../../auth/token-storage.service';
import { Applications } from './../../Models/Applications';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import {mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';
import { IgxPaginatorComponent } from 'igniteui-angular';

@Component({
  selector: 'app-app-management',
  templateUrl: './app-management.component.html',
  styleUrls: ['./app-management.component.css']
})
export class AppManagementComponent implements OnInit {
  allObjects:UsersObject[]=[];
  
  constructor(private tokenStorage: TokenStorageService) { 

  }

  ngOnInit(): void {
   this.allObjects=this.tokenStorage.getObjects();
   ////console.log(this.allObjects)
  }

 
  getPrivs(id:number):Boolean{
 
    if(this.allObjects.length!=0){
      for(let i=0;i<this.allObjects.length;i++){
        if(this.allObjects[i].idapplication==1){
            for(let j=0;j<this.allObjects[i].objects.length;j++){
              if(this.allObjects[i].objects[j].idobject==id){
                return true;
              }
            }
         
        }
      }
      return false;
    }else{
      return false;
    }

 
  }

 

  
  
  
}