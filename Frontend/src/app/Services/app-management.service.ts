import { ObjType } from './../Models/ObjType';
import { ObjectUsers } from './../Models/ObjectUsers';
import { RoleObjects } from './../Models/RoleObjects';
import { AppPrivs } from './../Models/AppPrivs';
import { AppRoles } from './../Models/AppRoles';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Applications } from './../Models/Applications';
import { CommunService } from './../IdmsServices/commun.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserIDMS } from '../Models/UserIDMS';
import { threadId } from 'worker_threads';
import { AppObjects } from '../Models/AppObjects';

@Injectable({
  providedIn: 'root'
})
export class AppManagementService {

  private host:String;


  constructor(private http: HttpClient,communService:CommunService) {
    this.host=communService.getHost();
   }

   public addApplication(app:Applications):Observable<Applications>{
     return this.http.post<Applications>(this.host+"addApplication",app).pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }

   public getAllIdmsUsers():Observable<Array<UserIDMS>>{
     return this.http.get<Array<UserIDMS>>(this.host+"getAllIdmsUsers").pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }

   public getAllObjTypes():Observable<Array<ObjType>>{
    return this.http.get<Array<ObjType>>(this.host+"getAllObjTypes").pipe(
     catchError((err) => {
        ////console.log('error caught in service')
       console.error(err);
       return throwError(err);
     })
   );
  }

   public saveNewRole(role:AppRoles):Observable<AppRoles>{
     return this.http.post<AppRoles>(this.host+"saveNewRole",role).pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }

   public deleteRole(role:AppRoles):Observable<AppRoles>{
    return this.http.post<AppRoles>(this.host+"deleteRole",role).pipe(
     catchError((err) => {
        ////console.log('error caught in service')
       console.error(err);
       return throwError(err);
     })
   );
  }
  

   public saveNewPrivs(privs:AppPrivs):Observable<AppPrivs>{
     return this.http.post<AppPrivs>(this.host+"saveNewPrivs",privs).pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }

   public findObjectsByApp(app:Applications):Observable<Array<AppObjects>>{
     return this.http.post<Array<AppObjects>>(this.host+"findObjectsByApp",app).pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }

   public saveRoleObjects(roleobj:Array<RoleObjects>):Observable<Array<RoleObjects>>{
    return this.http.post<Array<RoleObjects>>(this.host+"saveRoleObjects",roleobj).pipe(
     catchError((err) => {
        ////console.log('error caught in service')
       console.error(err);
       return throwError(err);
     })
   );
  }

  public saveObjectUser(objusers:Array<ObjectUsers>):Observable<Array<ObjectUsers>>{
    return this.http.post<Array<ObjectUsers>>(this.host+"saveObjectUser",objusers).pipe(
     catchError((err) => {
        ////console.log('error caught in service')
       console.error(err);
       return throwError(err);
     })
   );
  }
  public deleteRoleObjects(roleobj:Array<RoleObjects>):Observable<Array<RoleObjects>>{
    return this.http.post<Array<RoleObjects>>(this.host+"deleteRoleObjects",roleobj).pipe(
     catchError((err) => {
        ////console.log('error caught in service')
       console.error(err);
       return throwError(err);
     })
   );
  }

  public deleteObjectUser(objusers:Array<ObjectUsers>):Observable<Array<ObjectUsers>>{
    return this.http.post<Array<ObjectUsers>>(this.host+"deleteObjectUser",objusers).pipe(
     catchError((err) => {
        ////console.log('error caught in service')
       console.error(err);
       return throwError(err);
     })
   );
  }

  public updateApplication(app:Applications):Observable<Applications>{
    return this.http.post<Applications>(this.host+"updateApplication",app).pipe(
     catchError((err) => {
        ////console.log('error caught in service')
       console.error(err);
       return throwError(err);
     })
   );
  }

  
  public deleteApplication(app:Applications):Observable<Applications>{
    return this.http.post<Applications>(this.host+"deleteApplication",app).pipe(
     catchError((err) => {
        ////console.log('error caught in service')
       console.error(err);
       return throwError(err);
     })
   );
  }

  public addAppObject(obj:AppObjects):Observable<AppObjects>{
    return this.http.post<AppObjects>(this.host+"addAppObject",obj).pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }
  
  public updateAppObject(obj:AppObjects):Observable<AppObjects>{
    return this.http.post<AppObjects>(this.host+"updateAppObject",obj).pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public deleteAppObject(objs:Array<AppObjects>):Observable<Array<AppObjects>>{
    return this.http.post<Array<AppObjects>>(this.host+"deleteAppObject",objs).pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }
}
