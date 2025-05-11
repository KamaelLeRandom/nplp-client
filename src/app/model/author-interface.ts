import { SongInterface } from "./song-interface";

export interface AuthorInterface {
    id: number;
    nickname: string;
    firstname: string;
    lastname: string;
    birthday: Date;
    songs: SongInterface[];
}