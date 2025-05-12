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
    console.log('checkGuess', this.cut);
    this.numberTry++;
    const correctWords = this.cut.searchLyric.trim().split(/\s+/);
    const guessWords = this.playerGuess.trim().split(/\s+/);

    const markedAttempt = correctWords.map((word, i) => {
      return guessWords[i] === word ? 'correct' : 'wrong';
    });

    this.attempts.push(guessWords.map((word, i) => ({
      word,
      status: guessWords[i] === correctWords[i] ? 'correct' : 'wrong'
    })));

    const allCorrect = correctWords.every((word, i) => guessWords[i] === word);
    this.isCorrect = allCorrect;
    this.resultMessage = this.isCorrect
      ? '✅ Bonne réponse !'
      : '❌ Mauvaise réponse, réessaie.';

    if (this.isCorrect) {
      this.onVictory.emit();
    }
  }

cancelGame() {
  const confirmed = window.confirm('Es-tu sûr de vouloir quitter la partie ?');
  if (confirmed) {
    // Redirige vers le menu principal (adapter selon ta navigation)
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
