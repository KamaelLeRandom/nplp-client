import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CutInterface } from '../../model/cut-interface';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  @Input() cut!: CutInterface;
  @Output() onVictory = new EventEmitter<any>();
  router = inject(Router);
  numberTry: number = 0;
  playerGuess: string = '';
  resultMessage: string = '';
  isCorrect: boolean = false;
  attempts: { word: string; status: 'correct' | 'wrong' }[][] = [];
  revealInitials: boolean = false;

  checkGuess() {
    this.numberTry++;
    const correctWords = this.cut.searchLyric.trim().toLowerCase().split(/\s+/);
    const guessWords = this.playerGuess.trim().toLowerCase().split(/\s+/);

    this.attempts.push(guessWords.map((word, i) => ({
      word,
      status: guessWords[i] === correctWords[i] ? 'correct' : 'wrong'
    })));

    this.isCorrect = correctWords.every((word, i) => guessWords[i] === word);
    this.resultMessage = this.isCorrect
      ? '✅ Bonne réponse !'
      : '❌ Mauvaise réponse, réessaie.';

    if (this.isCorrect) {
      this.onVictory.emit({
        numberTry: this.numberTry,
        revealInitials: this.revealInitials
      });
    }
  }

  cancelGame() {
    const confirmed = window.confirm('Es-tu sûr de vouloir quitter la partie ?');
    if (confirmed) {
      this.router.navigateByUrl('/');
    }
  }

  get initialsHint(): string[] {
    return this.cut.searchLyric.trim().split(' ').map(word => word.charAt(0).toUpperCase());
  }

  get authorList(): string {
    return this.cut.song.authors.map(a => a.nickname).join(', ');
  }
}
