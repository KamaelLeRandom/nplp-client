import { Component, inject, OnInit } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { CutService } from '../../services/cut.service';
import { CutInterface } from '../../model/cut-interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-training',
  imports: [GameComponent, NgIf],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss'
})
export class TrainingComponent implements OnInit {
  cutService = inject(CutService);
  cut: CutInterface = {} as CutInterface;
  loading: boolean = true;

  ngOnInit(): void {
    this.cutService.getCutById(1)
      .subscribe(({
        next: (response) => {
          console.log('response', response);
          this.cut = response;
          this.loading = false;
        },
        error: (error) => {

        }
      }))
  }
  
  onVictory() {
    console.log('victory');
  }
}
