export interface PlayerInterface {
  id: Int32Array;
  name: string;
  email: string;
  points: Int32Array;
  createAt: Date;
  lastEditAt: Date;
  role: string;
  isConfirmed: boolean;
  token: string;
}