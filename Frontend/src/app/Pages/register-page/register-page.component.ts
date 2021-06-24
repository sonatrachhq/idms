import { AlertDialogComponent } from './../../Components/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SignUpInfo } from './../../auth/signup-info';
import { Languages } from './../../Models/Languages';
import { RegisterPageService } from './../../Services/register-page.service';
import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { AuthLoginInfo } from './../../auth/login-info';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Profil } from 'src/app/Models/Profil';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  hide = true;
  formGroup: FormGroup = new FormGroup({});
  signupInfo: SignUpInfo=new SignUpInfo(0,"","",0,0,new Date);
  langs:Languages[]=[];
  //selectedLang:number=0;
  constructor( private router:Router,private authService: AuthService,private registerService: RegisterPageService ,public dialog: MatDialog) { 
    this.formGroup = new FormGroup({
      sonuser: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required,Validators.minLength(6)]),
      //idlang:new FormControl('', [Validators.required])
    });
  }


  ngOnInit(): void {
   
  }
  onSubmit(post: any) {
    console.log(post)
    //this.selectedLang=post.idlang.split("-")[0]
   
    this.signupInfo.idlang=1;
    this.signupInfo.iduser=0;
    this.signupInfo.pswuser=post.password;
    this.signupInfo.sonuser=post.sonuser;
    this.signupInfo.sysdate=new Date;
    this.signupInfo.userstatus=1;
    console.log(this.signupInfo)

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data.userId)
        let profil:Profil={
          "idapplication":1,
          "idlanguage":1,
          "idtheme":2,
          "iduser":0,
          "iduseridms":data.userId,
          "systemdate":new Date

        }
        this.createProfil(profil);
      },
      error => {
        console.log(error);
        if(error=="son"){
          
          this.openDialog("Vous avez déjà un compte avec ce Son! Veuillez vous connecter.")
        }else{
          this.openDialog(error);
        }
       
        
      }
    );
  
  }

  createProfil(profil:Profil){
      this.registerService.saveProfil(profil).subscribe(
        data => {
          console.log(data);
          
          this.router.navigateByUrl('/login');
        },
        error => {
          console.log(error);
         
            this.openDialog(error);
          
         
          
        }
      )
  }
   //***********************************************Error ******************************************************************************************************************/
   openDialog(msg:String) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '500px',
      data: {message:msg }
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }

}
