import { Router } from '@angular/router';
import { HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from './token-storage.service';
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private token: TokenStorageService,public router: Router) { }


    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authReq = req;
        const token = this.token.getToken();
        if (token != null ) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        }
        return next.handle(authReq).pipe(
            catchError((error) => {
               //console.log('error in intercept')
              console.error(error);
             
              if(error.status==200){
                return throwError("Erreur lors de la génération des fichiers.\nAssurez vous que les fichiers sont fermés\n");
              }else{
                  if(error.status==401||error.status==403){
                    this.router.navigateByUrl('Error');
                    return throwError("Erreur d'authentification.Veuillez vous reconnecter");
                    
                  }else{
                      if(error.status==500||error.status==503||error.status==504){
                       
                        return throwError(error.status +": Le serveur ne repond pas.\nVeuillez actualiser la page ou bien contacter l'administrateur.");
                      }else{
                        if(error.status==400){
                          return throwError("son");
                        }else{
                          return throwError("Veuillez actualiser la page ou bien contacter l'administrateur.\n");
                        }
                       
                       
                      }
                  
                  }
              
              }
              
            })
          )
    }

 
 
  
}


