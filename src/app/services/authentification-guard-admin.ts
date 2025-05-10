import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthentificationService } from "./authentification-service.service";
import { PlayerInterface } from "../model/player-interface";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuardAdminService implements CanActivate {
  authService = inject(AuthentificationService);
  router = inject(Router)
  player: PlayerInterface | null | undefined;

  canActivate(): boolean {
    this.player = this.authService.currentPlayerSig();
    if (this.player === undefined || this.player === null) {
      this.router.navigateByUrl('/login');
      return false;
    }

    if (this.player?.role !== "ROLE_ADMIN") {
      return false;
    }
    return true;
  }
}