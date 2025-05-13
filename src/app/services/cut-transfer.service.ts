import { Injectable } from '@angular/core';
import { CutInterface } from '../model/cut-interface';

@Injectable({
  providedIn: 'root'
})
export class CutTransferService {
  cut: CutInterface | null = null;

  setCut(cut: CutInterface) {
    this.cut = cut;
  }

  getCut(): CutInterface | null {
    return this.cut;
  }

  clearCut() {
    this.cut = null;
  }
}
