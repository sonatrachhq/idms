import { SignUpInfo } from './../../auth/signup-info';
import { Languages } from './../../Models/Languages';
import { RegisterPageService } from './../../Services/register-page.service';
import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { AuthLoginInfo } from './../../auth/login-info';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
  constructor( private router:Router,private authService: AuthService,private registerService: RegisterPageService ) { 
    this.formGroup = new FormGroup({
      sonuser: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      idlang:new FormControl('', [Validators.required])
    });
  }


  ngOnInit(): void {
    //get all languages
    this.registerService.getAllLanguages().subscribe(
      data => {  
        console.log(data);
       this.langs=data;
    },
    error => {
     console.log(error);
     //this.showAlert('Alerte de connexion',"Nom d'utilisateur ou mot de passe incorrect");
     
      
    }
    )
  }
  onSubmit(post: any) {
    console.log(post)
    this.signupInfo.idlang=post.idlang;
    this.signupInfo.iduser=0;
    this.signupInfo.pswuser=post.password;
    this.signupInfo.sonuser=post.sonuser;
    this.signupInfo.sysdate=new Date;
    this.signupInfo.userstatus=1;
    console.log(this.signupInfo)

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl("login")
      },
      error => {
        if(error=="son"){
          console.log("yes");//il faut afficher que le son est déja utilisé
        }
        console.log(error);
        
      }
    );
  
  }
}
