import { UsersObject } from './../Models/UsersObject';
import { UserAppPrivs } from './../Models/UserAppPrivs';
import { Role } from './../Models/Role';
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const SONUSER_KEY = 'AuthSonuser';
const ROLES_KEY = 'Roles';
const HOST_KEY = 'HostKey';
const THEME_KEY='themeKey';
const LANG_KEY='langKey';
const APPPRIVS_KEY='AppPrivs';
const USERSOBJECTS_KEY='UsersObjects';
const EMAIL_KEY = 'EmailKey';
const USERNAME_KEY = 'UsernameKey';
const DOMAIN_KEY='DomainKey';
const WORKSTATION_KEY='WorkstationKey'
const USERID_KEY='UserIdKey'
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Role[] = [];
  private appPrivs:UserAppPrivs[]=[];
  private objects:UsersObject[]=[];
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

  public saveUserId(userId: string) {
    window.sessionStorage.removeItem(USERID_KEY);
    window.sessionStorage.setItem(USERID_KEY, userId);
  }

  public getUserId(): string {
    let userId=sessionStorage.getItem(USERID_KEY);
    return userId !==null? userId :"";
  }

  public saveEmail(email: string) {
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.setItem(EMAIL_KEY, email);
  }

  public getEmail(): string {
    let email=sessionStorage.getItem(EMAIL_KEY);
    return email !==null? email :"";
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    let username=sessionStorage.getItem(USERNAME_KEY);
    return username !==null? username :"";
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

  public saveDomain(domain: string) {
    window.sessionStorage.removeItem(DOMAIN_KEY);
    window.sessionStorage.setItem(DOMAIN_KEY, domain);
  }

  public getDomain(): string {
    let domain=sessionStorage.getItem(DOMAIN_KEY);
    return domain!==null? domain :"";
  }

  public saveWorkstation(workstation: string) {
    window.sessionStorage.removeItem(WORKSTATION_KEY);
    window.sessionStorage.setItem(WORKSTATION_KEY, workstation);
  }

  public geWorkstation(): string {
    let workstation=sessionStorage.getItem(WORKSTATION_KEY);
    return workstation!==null? workstation :"";
  }

  /*public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }*/

  public getRoles():Role[]{
    this.roles = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(ROLES_KEY)).forEach(role => {
        this.roles.push(role);
      });
    }

    return this.roles;
  }

  public saveRoles(roles: Role[]) {
    window.sessionStorage.removeItem(ROLES_KEY);
    window.sessionStorage.setItem(ROLES_KEY, JSON.stringify(roles));
  }


  public getAppPrivs():UserAppPrivs[]{
    this.appPrivs = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(APPPRIVS_KEY)).forEach(privs => {
        this.appPrivs.push(privs);
      });
    }

    return this.appPrivs;
  }

  public saveAppPrivs(appPrivs: UserAppPrivs[]) {
    window.sessionStorage.removeItem(APPPRIVS_KEY);
    window.sessionStorage.setItem(APPPRIVS_KEY, JSON.stringify(appPrivs));
  }


  public getObjects():UsersObject[]{
    this.objects = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(USERSOBJECTS_KEY)).forEach(obj => {
        this.objects.push(obj);
      });
    }

    return this.objects;
  }

  public saveObjects(objects: UsersObject[]) {
    window.sessionStorage.removeItem(USERSOBJECTS_KEY);
    window.sessionStorage.setItem(USERSOBJECTS_KEY, JSON.stringify(objects));
  }

}
