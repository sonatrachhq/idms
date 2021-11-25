import { AdminPageComponent } from './../Pages/admin-page/admin-page.component';
import { HeaderComponent } from './../Components/header/header.component';
import { ListAppToUpdateComponent } from './../Components/list-app-to-update/list-app-to-update.component';
import { UpdateApplicationComponent } from './../Components/update-application/update-application.component';
import { ObjectManagementComponent } from './../Pages/object-management/object-management.component';
import { RoleManagementComponent } from './../Pages/role-management/role-management.component';
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
    {path:"appManagement",component:AppManagementComponent},
    {path:"roleManagement",component:RoleManagementComponent},
    {path:"objectManagement",component:ObjectManagementComponent},
    {path:"updateApplication",component:UpdateApplicationComponent},
    {path:"listAppToUpdate",component:ListAppToUpdateComponent},
    {path:"adminPage",component:AdminPageComponent},
    {path:"header",component:HeaderComponent},
   
   
    
]

export const ROUTING =RouterModule.forRoot(APP_ROUTING);