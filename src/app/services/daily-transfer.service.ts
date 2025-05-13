import { Injectable } from '@angular/core';
import { DailyInterface } from '../model/daily-interface';

@Injectable({
  providedIn: 'root'
})
export class DailyTransferService {
  daily: DailyInterface | null = null;

  setDaily(daily: DailyInterface) {
    this.daily = daily;
  }

  getDaily(): DailyInterface | null {
    return this.daily;
  }

  clearDaily() {
    this.daily = null;
  }
}
