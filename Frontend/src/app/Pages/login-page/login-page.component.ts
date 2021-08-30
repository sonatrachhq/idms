import { LoginPageService } from './../../Services/login-page.service';
import { UserIDMS } from './../../Models/UserIDMS';
import { ThemeService } from './../../Theme/Services/theme.service';

import { AuthService } from './../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from './../../auth/token-storage.service';
import { AuthLoginInfo } from './../../auth/login-info';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/Modals/alert-dialog/alert-dialog.component';
import { ErrorDialogComponent } from 'src/app/Modals/error-dialog/error-dialog.component';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  hide = true;
  formGroup: FormGroup = new FormGroup({});
  langId:number=0;
  currentUser:UserIDMS={
    "idlang":0,
    "iduser":0,
    "iduseridms":0,
    "pswuser":"",
    "sonuser":"",
    "sysdate":new Date,
    "userstatus":0
  };
  sonUser:String=this.tokenStorage.getSonuser();
  private loginInfo: AuthLoginInfo=new AuthLoginInfo("","");
  constructor( private tokenStorage: TokenStorageService,
    private activatedRoute:ActivatedRoute,
    private authService: AuthService,
    public dialog: MatDialog,
    private router:Router,
    private loginPageService:LoginPageService,
    private readonly themeService: ThemeService) { 
    this.formGroup = new FormGroup({
      sonuser: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()!="") {
      let info:AuthLoginInfo={
        sonuser:this.tokenStorage.getToken(),
        password:""
      }
     
        this.authService.checkToken(info).subscribe(
        (data)=>{
          ////console.log(data)
            if(data.password!="true"){
              this.themeService.setTheme("light-theme");
            }
        }
      )
    }else{
      this.themeService.setTheme("light-theme");
    }
  }

  onSubmit(post: any) {
    //console.log(this.langId )
    this.loginInfo.sonuser=post.sonuser;
    this.loginInfo.password=post.password;
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {  
          //console.log(data);
          if(data!=null){
            this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveSonuser(data.sonuser);
          this.tokenStorage.saveTheme(2);
          this.tokenStorage.saveLang(1);
          this.currentUser.sonuser=data.sonuser;
        
            this.getUsersRoles();
      
          
          }else{
            this.openDialog("son_psw_error");
            //console.log(data);
          }
          
      },
      error => {
       //console.log(error);
       this.openDialogError("global_error_msg")
       //this.showAlert('Alerte de connexion',"Nom d'utilisateur ou mot de passe incorrect");
       
        
      }
    );
  
  }
  getUsersRoles(){
    this.loginPageService.getUsersRoles(this.currentUser).subscribe(
      (data)=>{
        //console.log(data)
      
          this.tokenStorage.saveRoles(data);
        this.getUsersAppPrivs();
      
        
        
      },
      error => {
        //console.log(error);
        this.openDialogError("global_error_msg")
        //this.showAlert('Alerte de connexion',"Nom d'utilisateur ou mot de passe incorrect");
        
         
       }
    )
  }
  getUsersAppPrivs(){
    this.loginPageService.getUsersAppPrivs(this.currentUser).subscribe(
      (data)=>{
       //console.log(data)
         
       this.tokenStorage.saveAppPrivs(data);
      this.getUsersObjects();

      },
      (error)=>{
        //console.log(error)
      }
    )
  }

  getUsersObjects(){
    this.loginPageService.getUsersObjects(this.currentUser).subscribe(
      (data)=>{
       //console.log(data)
         
       this.tokenStorage.saveObjects(data);
        
      this.router.navigate(["homePage"]).then(() => {
        window.location.reload();
        
      });

      },
      (error)=>{
        //console.log(error)
      }
    )
  }
 
  register(){
    this.router.navigateByUrl("register");
  }

  //***********************************************Error ******************************************************************************************************************/
  openDialog(msg:String) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '650px',
      data: {message:msg }
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }
  openDialogError(error:String): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '650px',
      data: {message: error}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }
}
