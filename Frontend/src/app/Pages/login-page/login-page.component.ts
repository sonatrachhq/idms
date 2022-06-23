import { Role } from './../../Models/Role';
import { DataSharingService } from './../../IdmsServices/data-sharing.service';
import { GlobalAppService } from './../../IdmsServices/global-app.service';
import { TranslateService } from '@ngx-translate/core';
import { RegisterPageService } from './../../Services/register-page.service';
import { Profil } from './../../Models/Profil';
import { Languages } from './../../Models/Languages';
import { SignUpInfo } from './../../auth/signup-info';
import { LoginPageService } from './../../Services/login-page.service';
import { UserIDMS } from './../../Models/UserIDMS';
import { ThemeService } from './../../Theme/Services/theme.service';

import { AuthService } from './../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from './../../auth/token-storage.service';
import { AuthLoginInfo } from './../../auth/login-info';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/Modals/alert-dialog/alert-dialog.component';
import { ErrorDialogComponent } from 'src/app/Modals/error-dialog/error-dialog.component';
import * as $ from 'jquery';
import Swal from 'sweetalert2'
import { MustMatch } from 'src/app/helpers/must-match-validator';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  showSpinner: Boolean = false;
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
    "userstatus":0,
    "username":""
  };
  sonUser:String="";
  private loginInfo: AuthLoginInfo=new AuthLoginInfo("","");

  //pour inscription 
  form: FormGroup = new FormGroup({});
 
  signupInfo: SignUpInfo=new SignUpInfo(0,"","",0,0,new Date,"");
  langs:Languages[]=[];
  constructor( private tokenStorage: TokenStorageService,
    private activatedRoute:ActivatedRoute,
    private authService: AuthService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private router:Router,
    private loginPageService:LoginPageService,
    private readonly themeService: ThemeService,
    private _formBuilder: FormBuilder,
    private globalAppService:GlobalAppService,
    private dataSharingService: DataSharingService,
    ) { 
    this.formGroup = new FormGroup({
      sonuser: new FormControl('', [Validators.required,Validators.minLength(1)]),
      //password: new FormControl('', [Validators.required]),
    });

    //pour inscription
    this.form =  this._formBuilder.group({
      sonuser: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required,Validators.minLength(6)]),
    /*   confirmPsw:new FormControl('', [Validators.required,Validators.minLength(6)]),
      email:new FormControl('', [Validators.required,Validators.email])
    }, {
      validator: MustMatch('password', 'confirmPsw') */
    });
  }

  ngOnInit(): void {
   
    console.log(this.sonUser)
    $(".log-in").click(function(){
      $(".signIn").addClass("active-dx");
      $(".signUp").addClass("inactive-sx");
      $(".signUp").removeClass("active-sx");
      $(".signIn").removeClass("inactive-dx");
    });
    
    $(".back").click(function(){
      $(".signUp").addClass("active-sx");
      $(".signIn").addClass("inactive-dx");
      $(".signIn").removeClass("active-dx");
      $(".signUp").removeClass("inactive-sx");
    });

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
    //this.login_AD();
    this.globalAppService.getIntlmParams().then(
      data=>{
        if(data["infos"][0].USERNAME!="" &&data["infos"][0].DOMAIN!="" &&data["infos"][0].WORKSTATION!=""){
          //console.log("ntlm data",data)
          /* console.log("data[0]",data["infos"][0])
           console.log("USERNAME",data["infos"][0].USERNAME)
           console.log("DOMAIN",data["infos"][0].DOMAIN) */
           this.tokenStorage.saveSonuser(data["infos"][0].USERNAME);
           this.tokenStorage.saveDomain(data["infos"][0].DOMAIN);
           this.tokenStorage.saveWorkstation(data["infos"][0].WORKSTATION)
          // this.router.navigate(["login"])
        
          this.sonUser=this.tokenStorage.getSonuser();
        
        }
      
    },
   
   );
   
  }
  login_AD(){
    this.showSpinner=true;

   this.globalAppService.checkUsersState().then(
    data=>{
      this.dataSharingService.isUserLoggedIn.next(true);
      this.showSpinner=false;
    } 
  )
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
          this.tokenStorage.saveEmail(data.email);
          this.currentUser.sonuser=data.sonuser;
        
            this.getUsersRoles();
      
          
          }else{
            //this.openDialog("son_psw_error");
            Swal.fire({
              icon: 'error',
              title: this.translate.instant("auth_login"),
              text: this.translate.instant("son_psw_error"),
              showConfirmButton: false,
            }).then((result) => {
              this.dialog.closeAll()
              Swal.close()
              
              
            })
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
      
        if(data!=null ){
          let roles:Role[] = [];
          for(let i=0;i<data.length;i++){
            if(data[i].idrole==62 || data[i].idrole==63){
                roles.push(data[i]);
            }
          }
          this.tokenStorage.saveRoles(roles);
        }
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
    this.globalAppService.getCurrentUser(this.currentUser).subscribe(
      value=>{console.log(value)
        this.tokenStorage.saveUserId(value.iduseridms.toString())
      }
    )
    this.loginPageService.getUsersObjects(this.currentUser).subscribe(
      (data)=>{
       //console.log(data)
         
       this.tokenStorage.saveObjects(data);
       
      /*  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {    
        this.router.navigate(['homePage'] );
        }); */
       
      this.router.navigate(["homePage"]).then(() => {
        window.location.reload();
        
      });

      },
      (error)=>{
        //console.log(error)
      }
    )
  }
 
  /* register(){
    this.router.navigateByUrl("register");
  } */


  register(post: any) {
    //console.log(post)
    //this.selectedLang=post.idlang.split("-")[0]
   
    this.signupInfo.idlang=1;
    this.signupInfo.iduser=0;
    this.signupInfo.pswuser=post.password;
    this.signupInfo.sonuser=post.sonuser;
    this.signupInfo.sysdate=new Date;
    this.signupInfo.userstatus=1;
    this.signupInfo.email=post.email;
    //console.log(this.signupInfo)

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        //console.log(data.userId)
        let profil:Profil={
          "idapplication":1,
          "idlanguage":1,
          "idtheme":2,
          "iduser":0,
          "iduseridms":data.userId,
          "systemdate":new Date

        }
        this.tokenStorage.saveEmail(this.signupInfo.email);
        this.createProfil(profil);
      },
      error => {
        //console.log(error);
        if(error=="son"){
          
          //this.openDialog("son_exist_error")
          
          Swal.fire({
            icon: 'error',
            title: this.translate.instant("inscription_register"),
            text: this.translate.instant("son_exist_error"),
            showConfirmButton: false,
          }).then((result) => {
           
            Swal.close()
            
            
          })
        }else{
          this.openDialogError("global_error_msg");
        }
       
        
      }
    );
  
  }

  createProfil(profil:Profil){
      this.loginPageService.saveProfil(profil).subscribe(
        data => {
          //console.log(data);
          let post:any={
            "sonuser":this.signupInfo.sonuser,
            "password": this.signupInfo.pswuser
          }
          this.onSubmit(post)
        },
        error => {
          //console.log(error);
         
            this.openDialogError("global_error_msg");
          
         
          
        }
      )
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
