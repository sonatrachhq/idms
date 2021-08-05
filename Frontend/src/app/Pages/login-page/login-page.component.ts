
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
  sonUser:String=this.tokenStorage.getSonuser();
  private loginInfo: AuthLoginInfo=new AuthLoginInfo("","");
  constructor( private tokenStorage: TokenStorageService,private activatedRoute:ActivatedRoute,private authService: AuthService,public dialog: MatDialog,private router:Router ) { 
    this.formGroup = new FormGroup({
      sonuser: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  
  }

  onSubmit(post: any) {
    console.log(this.langId )
    this.loginInfo.sonuser=post.sonuser;
    this.loginInfo.password=post.password;
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {  
          console.log(data);
          if(data!=null){
            this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveSonuser(data.sonuser);
          this.tokenStorage.saveTheme(2);
          this.tokenStorage.saveLang(1);
          this.router.navigate(["homePage"]).then(() => {
            window.location.reload();
          });
          
          
          }else{
            this.openDialog("son_psw_error");
            console.log(data);
          }
          
      },
      error => {
       console.log(error);
       this.openDialogError("global_error_msg")
       //this.showAlert('Alerte de connexion',"Nom d'utilisateur ou mot de passe incorrect");
       
        
      }
    );
  
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
