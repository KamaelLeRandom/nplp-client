import { DifficultyInterface } from "./difficulty-interface";

export interface CutInterface {
    id: number;
    searchLyric: string;
    beforeLyric: string;
    afterLyric: string;
    song: any;
    difficulty: DifficultyInterface;
    dailies : any[];
}