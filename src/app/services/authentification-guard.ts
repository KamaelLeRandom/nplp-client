import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthentificationService } from "./authentification-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuardService implements CanActivate {
  authService = inject(AuthentificationService);
  router = inject(Router)

  canActivate(): boolean {
    if (this.authService.currentPlayerSig() === undefined || this.authService.currentPlayerSig() === null) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}