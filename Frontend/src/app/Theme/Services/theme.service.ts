import { Option } from '../Models/Option';
import { StyleManagerService } from './style-manager.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private http: HttpClient,
    private styleManager: StyleManagerService
  ) {}

  public getThemeOptions(): Observable<Array<Option>> {
    
    return this.http.get<Array<Option>>("assets/themes/options.json");
    
  }

  setTheme(themeToSet:string) {
    this.styleManager.setStyle(
      "theme",
      `assets/themes/${themeToSet}.css`
    );
  }
}
