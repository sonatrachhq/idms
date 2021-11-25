import { UsersObject } from './../../Models/UsersObject';
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
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  allObjects:UsersObject[]=[];
 
  mode:number;
  constructor(private tokenStorage: TokenStorageService,private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
   this.allObjects=this.tokenStorage.getObjects();
   ////console.log(this.allObjects)
   this.route.queryParams.subscribe(Params=>{this.mode=Params["mode"];
   //console.log(Params["mode"])
  })
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
