import { Component, Input } from '@angular/core';
import { CutInterface } from '../../../model/cut-interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cut-item',
  imports: [NgIf],
  templateUrl: './cut-item.component.html',
  styleUrl: './cut-item.component.scss'
})
export class CutItemComponent {
  @Input() cut!: CutInterface;

  showSearchLyric = false;

  toggleSearchLyric() {
    this.showSearchLyric = !this.showSearchLyric;
  }
}
