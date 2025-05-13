import { Component, inject, OnInit } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { CutService } from '../../services/cut.service';
import { CutInterface } from '../../model/cut-interface';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CutTransferService } from '../../services/cut-transfer.service';

@Component({
  selector: 'app-training',
  imports: [GameComponent, NgIf],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss'
})
export class TrainingComponent implements OnInit {
  router = inject(Router);
  cutTransferService = inject(CutTransferService);
  cut: CutInterface = {} as CutInterface;
  loading: boolean = true;

  ngOnInit(): void {
    if (this.cutTransferService.getCut() != null) {
      this.cut = this.cutTransferService.getCut() as CutInterface;
      this.cutTransferService.clearCut();
      this.loading = false;
    }
  }
  
  onVictory(numberTry: number, useHint: boolean) {
    console.log('victory');
  }
}
