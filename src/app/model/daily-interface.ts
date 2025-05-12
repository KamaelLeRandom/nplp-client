import { CutInterface } from "./cut-interface";

export interface DailyInterface {
  id: number;
  createFor: Date;
  cut: CutInterface;
  results: any[];
}