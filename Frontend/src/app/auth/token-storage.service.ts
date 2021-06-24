import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const SONUSER_KEY = 'AuthSonuser';
const AUTHORITIES_KEY = 'AuthAuthorities';
const HOST_KEY = 'HostKey';
const THEME_KEY='themeKey';
const LANG_KEY='langKey';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    let token=sessionStorage.getItem(TOKEN_KEY);
    return token !==null? token :"";
  }

  public saveHost(host: string) {
    window.sessionStorage.removeItem(HOST_KEY);
    window.sessionStorage.setItem(HOST_KEY, host);
  }

  public getLang(): string {
    let lang=sessionStorage.getItem(LANG_KEY);
    return lang !==null? lang :"";
  }

  public saveLang(lang: number) {
    window.sessionStorage.removeItem(LANG_KEY);
    window.sessionStorage.setItem(LANG_KEY, lang.toString());
  }

  public getTheme(): string {
    let theme=sessionStorage.getItem(THEME_KEY);
    return theme !==null? theme :"";
  }

  public saveTheme(theme: number) {
    window.sessionStorage.removeItem(THEME_KEY);
    window.sessionStorage.setItem(THEME_KEY, theme.toString());
  }

  public getHost(): string {
    let host=sessionStorage.getItem(HOST_KEY);
    return host !==null? host :"";
  }

  public saveSonuser(sonuser: string) {
    window.sessionStorage.removeItem(SONUSER_KEY);
    window.sessionStorage.setItem(SONUSER_KEY, sonuser);
  }

  public getSonuser(): string {
    let sonuser=sessionStorage.getItem(SONUSER_KEY);
    return sonuser!==null? sonuser :"";
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }


}
