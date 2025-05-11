import { Component, inject, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { PlayerInterface } from '../../model/player-interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-leaderboard',
  imports: [NgFor],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent implements OnInit {
  playerService = inject(PlayerService);
  playerList: PlayerInterface[] = [];

  ngOnInit(): void {
    this.playerService.getLeaderboard()
      .subscribe(({
        next: (response) => {
          this.playerList = response;
        },
        error: (error) => {
          console.log(error);
        }
      }))
    ;
  }
}
