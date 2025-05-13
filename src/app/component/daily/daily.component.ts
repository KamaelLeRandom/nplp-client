import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CutInterface } from '../../model/cut-interface';
import { NgIf } from '@angular/common';
import { GameComponent } from '../game/game.component';
import { ResultService } from '../../services/result.service';
import { ResultInterface } from '../../model/result-interface';
import { AuthentificationService } from '../../services/authentification-service.service';
import { DailyTransferService } from '../../services/daily-transfer.service';
import { DailyInterface } from '../../model/daily-interface';

@Component({
  selector: 'app-daily',
  imports: [GameComponent, NgIf],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.scss'
})
export class DailyComponent {
  router = inject(Router);
  authService = inject(AuthentificationService);
  resultService = inject(ResultService);
  dailyTransferService = inject(DailyTransferService);
  daily: DailyInterface = {} as DailyInterface;
  cut: CutInterface = {} as CutInterface;
  loading: boolean = true;

  ngOnInit(): void {
    console.log('test', this.dailyTransferService.getDaily())
    if (this.dailyTransferService.getDaily() != null) {
      this.daily = this.dailyTransferService.getDaily() as DailyInterface;
      this.dailyTransferService.clearDaily();
      this.cut = this.daily.cut;
      this.loading = false;
    }
  }
  
onVictory(event: { numberTry: number; revealInitials: boolean }) {
    var winPoint = this.cut.difficulty.point;

    if (event.numberTry == 1 && !event.revealInitials)
      winPoint *= 2;
    else {
      winPoint -= event.numberTry - 1;
      if (event.revealInitials)
        winPoint /= 2;
    }

    this.resultService.postResultForPlayer({
      player: this.authService.currentPlayerSig(),
      daily: this.daily,
      useHint: event.revealInitials,
      numberOfTry: event.numberTry,
      points: winPoint,
    } as ResultInterface)
      .subscribe(({
        next: (response) => {
          response.player = null;
          this.authService.currentPlayerSig()?.results.push(response);
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      }));

    console.log('victory');
  }
}
