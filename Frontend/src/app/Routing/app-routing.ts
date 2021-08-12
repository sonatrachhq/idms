import { AppManagementComponent } from './../Pages/app-management/app-management.component';
import { RegisterPageComponent } from './../Pages/register-page/register-page.component';
import { LoginPageComponent } from './../Pages/login-page/login-page.component';
import { GuestPageComponent } from './../Pages/guest-page/guest-page.component';
import { HomePageComponent } from './../Pages/home-page/home-page.component';
import { Routes, RouterModule } from '@angular/router';


const APP_ROUTING : Routes =[
    {path :"homePage", component :HomePageComponent},
    {path :"", component :GuestPageComponent},
    {path :"login", component :LoginPageComponent},
    {path :"register", component :RegisterPageComponent},
    {path:"appManagement",component:AppManagementComponent}

   
    
]

export const ROUTING =RouterModule.forRoot(APP_ROUTING);