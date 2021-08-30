"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthInterceptor = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var TOKEN_HEADER_KEY = 'Authorization';
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(token, router) {
        this.token = token;
        this.router = router;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        var authReq = req;
        var token = this.token.getToken();
        if (token != null) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        }
        return next.handle(authReq).pipe(operators_1.catchError(function (error) {
            ////console.log('error in intercept')
            console.error(error);
            if (error.status == 200) {
                return rxjs_1.throwError("Erreur lors de la génération des fichiers.\nAssurez vous que les fichiers sont fermés\n");
            }
            else {
                if (error.status == 401 || error.status == 403) {
                    _this.router.navigateByUrl('Error');
                    return rxjs_1.throwError("Erreur d'authentification.Veuillez vous reconnecter");
                }
                else {
                    if (error.status == 500 || error.status == 503 || error.status == 504) {
                        return rxjs_1.throwError(error.status + ": Le serveur ne repond pas.\nVeuillez actualiser la page ou bien contacter l'administrateur.");
                    }
                    else {
                        return rxjs_1.throwError("Veuillez actualiser la page ou bien contacter l'administrateur.\n");
                    }
                }
            }
        }));
    };
    AuthInterceptor = __decorate([
        core_1.Injectable()
    ], AuthInterceptor);
    return AuthInterceptor;
}());
exports.AuthInterceptor = AuthInterceptor;
