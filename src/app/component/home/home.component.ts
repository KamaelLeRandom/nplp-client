import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DifficultyService } from '../../services/difficulty.service';
import { DifficultyInterface } from '../../model/difficulty-interface';
import { Router } from '@angular/router';
import { CutService } from '../../services/cut.service';
import { CutTransferService } from '../../services/cut-transfer.service';
import { DailyService } from '../../services/daily.service';
import { DailyInterface } from '../../model/daily-interface';
import { CutInterface } from '../../model/cut-interface';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { SongInterface } from '../../model/song-interface';
import { AuthorInterface } from '../../model/author-interface';
import { DailyTransferService } from '../../services/daily-transfer.service';
import { AuthentificationService } from '../../services/authentification-service.service';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  router = inject(Router);
  cutService = inject(CutService);
  cutTransferService = inject(CutTransferService);
  difficultyService = inject(DifficultyService);
  difficulties: DifficultyInterface[] = [];
  dailyService = inject(DailyService);
  dailyTransferService = inject(DailyTransferService);
  authService = inject(AuthentificationService);
  dailies: DailyInterface[] = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.difficultyService.getAllDifficulty()
      .subscribe(({
        next: (response) => {
          this.difficulties = response;
        },
        error: (error) => {
          console.log(error);
        },
      }))
    ;

    this.dailyService.getDaily()
      .subscribe(({
        next: (response) => {
          this.dailies = response;
        },
        error: (error) => {
          console.log(error);
        }
      }))
    ;

    this.dailies = this.dailies.sort((a, b) => b.cut.difficulty.point - a.cut.difficulty.point);
    this.loading = false;

    console.log("user", this.authService.currentPlayerSig());
  }

  startDaily(daily: DailyInterface) {
    this.dailyTransferService.setDaily(daily);
    this.router.navigateByUrl('/daily');
  }

  startRandomTraining() {
    this.cutService.getRandomCut()
      .subscribe(({
        next: (response) => {
          this.cutTransferService.setCut(response);
          this.router.navigateByUrl('/training');
        },
        error: (error) => {
          console.log(error);
        }
      }))
    ;
  }

  getAuthorNicknames(authors: AuthorInterface[]): string {
    return authors.map(a => a.nickname).join(', ');
  }

  get hasDoneDailyToday(): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const player = this.authService.currentPlayerSig();

    if (!player || !player.results)
      return false;

    return player.results.some((result) => {
      if (!result.daily) return false;

      const datePlayed = new Date(result.daily.createFor);
      datePlayed.setHours(0, 0, 0, 0);

      return datePlayed.getTime() === today.getTime();
    });
  }
}
