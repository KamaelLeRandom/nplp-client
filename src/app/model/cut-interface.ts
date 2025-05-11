import { DifficultyInterface } from "./difficulty-interface";
import { SongInterface } from "./song-interface";

export interface CutInterface {
    id: number;
    searchLyric: string;
    beforeLyric: string;
    afterLyric: string;
    song: SongInterface;
    difficulty: DifficultyInterface;
    dailies : any[];
}