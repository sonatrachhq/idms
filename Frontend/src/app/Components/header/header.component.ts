import { AuthLoginInfo } from './../../auth/login-info';
import { AuthService } from './../../auth/auth.service';
import { CommunService } from './../../IdmsServices/commun.service';
import { MatDialog } from '@angular/material/dialog';

import { Profil } from './../../Models/Profil';
import { GlobalAppService } from './../../IdmsServices/global-app.service';
import { UserIDMS } from './../../Models/UserIDMS';
import { GlobalThemeService } from './../../Theme/Services/global-theme.service';
import { TokenStorageService } from './../../auth/token-storage.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Option } from '../../Theme/Models/Option';
import { ThemeService } from './../../Theme/Services/theme.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Directionality } from '@angular/cdk/bidi';
import { MediaMatcher } from '@angular/cdk/layout';
import { ErrorDialogComponent } from 'src/app/Modals/error-dialog/error-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  direction="rtl";
  options$: Observable<Array<Option>> = this.themeService.getThemeOptions();
  connected=0;
  themes:Option[]=[];
  isExpired:Boolean=false;
  currentUser:UserIDMS={
    "idlang":0,
    "iduser":0,
    "iduseridms":0,
    "pswuser":"",
    "sonuser":"",
    "sysdate":new Date,
    "userstatus":1
  }
  constructor(private tokenStorage: TokenStorageService,
    private readonly themeService: ThemeService,
    private router: Router,
    private globalThemeService:GlobalThemeService,
    private globalService:GlobalAppService,
    public dialog: MatDialog,
    private communService:CommunService,
    private authService: AuthService) {
        this.options$.subscribe(
          data => {  
            //console.log(data);
            this.themes=data;
           
        },
        error => {
         console.log(error);
         this.openDialogError("global_error_msg");
         
         
          
        }
        )
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()!="") {
      let info:AuthLoginInfo={
        sonuser:this.tokenStorage.getToken(),
        password:""
      }
      this.communService.load().then(
        (value) => {
          
        this.authService.checkToken(info).subscribe(
        (data)=>{
          //console.log(data)
            if(data.password=="true"){
                this.getCurrentUser();
            }else{
              this.login();
            }
        },
        (error)=>{
          console.log(error)
        }
      )}
      )
    }else{
      this.themeService.setTheme("light-theme");
    }
    
   
  }

  getCurrentUser(){
    this.communService.load().then(
      (value) => {
        
       
         
          this.connected=1;
          
          this.currentUser.sonuser=this.tokenStorage.getSonuser();
          this.globalService.getCurrentUser(this.currentUser).subscribe(
            data => {  
            //  console.log(data);
             this.currentUser=data;
            this.getUsersProfil();
           
          },
          error => {
           console.log(error);
           this.openDialogError("global_error_msg");
           
           
            
          }
          )
    
          
        
      });

  }
  getUsersProfil(){
    let profil:Profil={
      "iduseridms":this.currentUser.iduseridms,
      "idapplication":1,
      "idtheme":0,
      "idlanguage":0 ,
      "iduser":0,
      "systemdate":new Date
    }
    this.globalService.getUsersProfil(profil).subscribe(
      data => {  
       // console.log(data);
        let  usersTheme:Option=this.themes.find(theme =>theme.id==data.idtheme);
        this.themeService.setTheme(usersTheme.value);
    },
    error => {
     console.log(error);
     this.openDialogError("global_error_msg");
     
     
      
    }
    )
  }
  themeChangeHandler(themeToSet:Option) {
    this.themeService.setTheme(themeToSet.value);
    if (this.tokenStorage.getToken()!="") {
      let profil:Profil={
        "iduseridms":this.currentUser.iduseridms,
        "idapplication":1,
        "idtheme":themeToSet.id,
        "idlanguage":parseInt(this.tokenStorage.getLang()) ,
        "iduser":0,
        "systemdate":new Date
      }
      console.log(profil);
      this.updateTheme(profil );
    }
    
  }

  updateTheme(profil:Profil ){
      this.globalThemeService.updateThemeUser(profil).subscribe(
        data => {  
         // console.log(data);
    
      },
      error => {
       console.log(error);
       this.openDialogError("global_error_msg");
       
       
        
      }
      )
  }
  login(){
    //this.connected=1;
      this.router.navigateByUrl("login")
  }
 
  logout(){
    this.connected=0;
    this.tokenStorage.signOut();
  
    this.router.navigateByUrl("login");
    //window.location.reload();
  }
  openDialogError(error:String): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '650px',
      data: {message: error}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl("login");
      //window.location.reload();
    });
  }
}
