import { DailyInterface } from "./daily-interface";
import { PlayerInterface } from "./player-interface";

export interface ResultInterface {
  id: number | null;
  points: number;
  numberOfTry: number;
  useHint: boolean;
  player: PlayerInterface | null;
  daily: DailyInterface;
}