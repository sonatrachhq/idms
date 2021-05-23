import { TranslateService } from '@ngx-translate/core';
import { Option } from '../../Theme/Models/Option';
import { ThemeService } from './../../Theme/Services/theme.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Directionality } from '@angular/cdk/bidi';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  direction="rtl";
  options$: Observable<Array<Option>> = this.themeService.getThemeOptions();

  
 
  constructor(private readonly themeService: ThemeService) {
    
  }

  ngOnInit() {
    this.themeService.setTheme("light-theme");
  }

  themeChangeHandler(themeToSet:string) {
    this.themeService.setTheme(themeToSet);
  }
}
