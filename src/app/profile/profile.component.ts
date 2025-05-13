import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { PlayerInterface } from '../model/player-interface';
import { AuthentificationService } from '../services/authentification-service.service';
import { CommonModule, NgFor, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr')

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  authService = inject(AuthentificationService);
  player: PlayerInterface = {} as PlayerInterface
  editMode = false;

  ngOnInit(): void {
    if (this.authService.currentPlayerSig() !== null && this.authService.currentPlayerSig() !== undefined)
      this.player = this.authService.currentPlayerSig() as PlayerInterface;
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;

    if (!this.editMode)
      this.resetForm();
  }

  resetForm(): void {
    if (this.authService.currentPlayerSig() !== null && this.authService.currentPlayerSig() !== undefined)
      this.player = this.authService.currentPlayerSig() as PlayerInterface;
  }

  saveProfile(): void {
    this.editMode = false;
    this.player.lastEditAt = new Date();
    
    alert('Profil sauvegardé avec succès !');
  }

  changePassword(): void {
    alert('Fonctionnalité de changement de mot de passe à implémenter ici.');
  }

  get formattedCreateDate(): string {
    const date = new Date(this.player.createAt);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  get formattedEditDate(): string {
    const date = new Date(this.player.lastEditAt);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}