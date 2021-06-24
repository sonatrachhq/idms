import { AlertDialogComponent } from './../../Components/alert-dialog/alert-dialog.component';
import { AuthService } from './../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from './../../auth/token-storage.service';
import { AuthLoginInfo } from './../../auth/login-info';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  hide = true;
  formGroup: FormGroup = new FormGroup({});
  langId:number=0;
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
            this.openDialog("Nom d'utilisateur ou mot de passe incorrect");
            console.log(data);
          }
          
      },
      error => {
       console.log(error);
       this.openDialog(error)
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

}
