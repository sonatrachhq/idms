import { TokenStorageService } from './../../auth/token-storage.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Option } from '../../Theme/Models/Option';
import { ThemeService } from './../../Theme/Services/theme.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Directionality } from '@angular/cdk/bidi';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  direction="rtl";
  options$: Observable<Array<Option>> = this.themeService.getThemeOptions();
  connected=0;
  
  constructor(private tokenStorage: TokenStorageService,private readonly themeService: ThemeService,private router: Router) {

  }

  ngOnInit() {
    this.themeService.setTheme("light-theme");
    if (this.tokenStorage.getToken()!="") {
      this.connected=1;
    }
  }

  themeChangeHandler(themeToSet:string) {
    this.themeService.setTheme(themeToSet);
  }

  login(){
    this.connected=1;
      this.router.navigateByUrl("login")
  }
 
  logout(){
    this.connected=0;
    this.tokenStorage.signOut();
  
    this.router.navigateByUrl("login");
    //window.location.reload();
  }
}
