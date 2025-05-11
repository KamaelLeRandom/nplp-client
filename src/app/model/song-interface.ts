export interface SongInterface {
  id?: number;
  title: string;
  lyric: string;
  publishAt: Date;
  duration: number;
  authors: any[];
  cuts: any[];
}