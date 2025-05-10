import { Component, Input } from '@angular/core';
import { CutItemComponent } from '../cut-item/cut-item.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cut-list',
  imports: [CutItemComponent, NgFor],
  templateUrl: './cut-list.component.html',
  styleUrl: './cut-list.component.scss'
})
export class CutListComponent {
  @Input() cuts: any[] = [];

  get sortedCuts() {
    return [...this.cuts].sort((a, b) => b.difficulty.point - a.difficulty.point);
  }
}
