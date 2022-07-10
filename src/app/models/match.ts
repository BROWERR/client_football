import {Club} from "./club";

export interface Match{
  id?:number;
  goals_first: bigint;
  goals_second: bigint;
  date: string;
  club1: Club;
  club2: Club;
}
