import { GlobalAppService } from './IdmsServices/global-app.service';
import { AddRoleTabComponent } from './Components/add-role-tab/add-role-tab.component';

import { GlobalErrorHandlerService } from './IdmsServices/global-error-handler.service';
import { CommunService, initConfig } from './IdmsServices/commun.service';
import { ThemeService } from './Theme/Services/theme.service';
import { StyleManagerService } from './Theme/Services/style-manager.service';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './Routing/app-routing.module';
import { MbscModule, MbscFormsModule } from '@mobiscroll/angular-lite';
import { MatStepperModule } from '@angular/material/stepper';
import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';

//I keep the new line
import { AppComponent } from './app.component';
import { ThemeMenuComponent } from './Theme/Components/theme-menu/theme-menu.component';

import { HeaderComponent } from './Components/header/header.component';
import { I18nModule } from './i18n/i18n.module';
import { SelectLanguageComponent } from './Languages/component/select-language/select-language.component';
import { BidiModule } from '@angular/cdk/bidi';
import { FlipCardComponent } from './Components/flip-card/flip-card.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ROUTING } from './Routing/app-routing';
import { GuestPageComponent } from './Pages/guest-page/guest-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { RegisterPageComponent } from './Pages/register-page/register-page.component';
import { FooterComponent } from './Components/footer/footer.component';

import { FlipAppCardComponent } from './Components/flip-app-card/flip-app-card.component';
import { RoleSelectComponent } from './Modals/role-select/role-select.component';
import { AlertDialogComponent } from './Modals/alert-dialog/alert-dialog.component';
import { ErrorDialogComponent } from './Modals/error-dialog/error-dialog.component';
import { CopyLinkComponent } from './Modals/copy-link/copy-link.component';

import { FormsModule } from '@angular/forms';
import { 
	IgxAvatarModule,
	IgxFilterModule,
	IgxIconModule,
	IgxListModule,
	IgxInputGroupModule,
	IgxButtonGroupModule,
  IgxPaginatorModule,
	IgxRippleModule
 } from "igniteui-angular";
import { AppManagementComponent } from './Pages/app-management/app-management.component';
import { GlobalDialogComponent } from './Modals/global-dialog/global-dialog.component';
import { AddRoleComponent } from './Modals/add-role/add-role.component';
import { AffectRoleComponent } from './Modals/affect-role/affect-role.component';
import { AffectRoleTabComponent } from './Components/affect-role-tab/affect-role-tab.component';
import { AddApplicationComponent } from './Components/add-application/add-application.component';
import { HomePageTabComponent } from './Components/home-page-tab/home-page-tab.component';
import { AssocObjTabComponent } from './Components/assoc-obj-tab/assoc-obj-tab.component';
import { AssocObjComponent } from './Modals/assoc-obj/assoc-obj.component';
import { RoleManagementComponent } from './Pages/role-management/role-management.component';
import { ObjectManagementComponent } from './Pages/object-management/object-management.component';
import { UpdateApplicationComponent } from './Components/update-application/update-application.component';
import { ListAppToUpdateComponent } from './Components/list-app-to-update/list-app-to-update.component';
import { ListAppToDeleteComponent } from './Components/list-app-to-delete/list-app-to-delete.component';
import { ListRoleToDeleteComponent } from './Components/list-role-to-delete/list-role-to-delete.component';
import { DeleteRoleComponent } from './Modals/delete-role/delete-role.component';
import { ListAppComponent } from './Components/list-app/list-app.component';
import { AddObjectComponent } from './Modals/add-object/add-object.component';
import { DeleteObjectComponent } from './Modals/delete-object/delete-object.component';
import { UpdateObjectComponent } from './Modals/update-object/update-object.component';
import { EmailBoxComponent } from './Modals/email-box/email-box.component';
import { AdminPageComponent } from './Pages/admin-page/admin-page.component';
import { AffectRoleAdminComponent } from './Modals/affect-role-admin/affect-role-admin.component';
import { AffectRoleTabAdminComponent } from './Components/affect-role-tab-admin/affect-role-tab-admin.component';
import { AssocObjTabAdminComponent } from './Components/assoc-obj-tab-admin/assoc-obj-tab-admin.component';
import { AssocObjAdminComponent } from './Modals/assoc-obj-admin/assoc-obj-admin.component';
import { DeleteObjAdminComponent } from './Modals/delete-obj-admin/delete-obj-admin.component';









@NgModule({
  declarations: [
    AppComponent,
    ThemeMenuComponent,
    HeaderComponent,
    SelectLanguageComponent,
    FlipCardComponent,
    HomePageComponent,
    GuestPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    FooterComponent,
    AlertDialogComponent,
    ErrorDialogComponent,
    FlipAppCardComponent,
    RoleSelectComponent,
    CopyLinkComponent,
    AppManagementComponent,
    GlobalDialogComponent,
    AddRoleComponent,
    AffectRoleComponent,
    AddRoleTabComponent,
    AffectRoleTabComponent,
    AddApplicationComponent,
    HomePageTabComponent,
    AssocObjTabComponent,
    AssocObjComponent,
    RoleManagementComponent,
    ObjectManagementComponent,
    UpdateApplicationComponent,
    ListAppToUpdateComponent,
    ListAppToDeleteComponent,
    ListRoleToDeleteComponent,
    DeleteRoleComponent,
    ListAppComponent,
    AddObjectComponent,
    DeleteObjectComponent,
    UpdateObjectComponent,
    EmailBoxComponent,
    AdminPageComponent,
    AffectRoleAdminComponent,
    AffectRoleTabAdminComponent,
    AssocObjTabAdminComponent,
    AssocObjAdminComponent,
    DeleteObjAdminComponent,
  

  ],
  entryComponents: [AlertDialogComponent, 
    ErrorDialogComponent,
     RoleSelectComponent, 
     CopyLinkComponent,
     GlobalDialogComponent,
     AddRoleComponent,
     AssocObjComponent,
     DeleteRoleComponent,
    AddObjectComponent,
    DeleteObjectComponent,
    UpdateObjectComponent,
    EmailBoxComponent],
  imports: [
    BrowserAnimationsModule,
    ROUTING,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MbscModule,
    MbscFormsModule,
    MatStepperModule,
    
    MatFormFieldModule,
    ReactiveFormsModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    I18nModule,
    BidiModule,
    FormsModule,
    IgxAvatarModule,
    IgxFilterModule,
    IgxIconModule,
    IgxListModule,
    IgxInputGroupModule,
    IgxButtonGroupModule,
    IgxPaginatorModule,
    IgxRippleModule
   
  ],
  exports: [
    I18nModule
  ],
  providers: [
    StyleManagerService,
    ThemeService,
    CommunService,
   /*  {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [CommunService,GlobalAppService],
      useFactory: (appConfigSvc: CommunService,globalAppService:GlobalAppService) => {
        return () => {
          return appConfigSvc.load().then(()=>{
            console.log(appConfigSvc.getHost())
             appConfigSvc.getIntlmParams();
              .then(()=>{
              return globalAppService.checkUsersState()
            })  
           
          });
        };
      }
    }, */
  /*   { provide: APP_INITIALIZER, useFactory: initConfig, deps: [CommunService], multi: true },
    { provide: APP_INITIALIZER, useFactory: initCheckLogin, deps: [GlobalAppService], multi: true }, */
    { provide: APP_INITIALIZER, useFactory: initConfig, deps: [CommunService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
