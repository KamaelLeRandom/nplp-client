import { CutInterface } from "./cut-interface";

export interface DifficultyInterface {
    id: number;
    libelle: string;
    point: number;
    cuts: CutInterface[];
}