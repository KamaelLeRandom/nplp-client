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
    if (!this.authService.currentPlayerSig()?.isConfirmed) {
      this.router.navigateByUrl('/error', { state: { reason: "Veuillez confirmer votre email avant d'accèder au site."}} )
      return false;
    }
    return true;
  }
}