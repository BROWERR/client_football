
export interface Player{
  id?:number;
  name: string;
  surname: string;
  games: bigint;
  goals: bigint;
  position: string;
  club_id: number;
}
