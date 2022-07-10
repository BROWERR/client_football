import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Match} from "../models/match";
const MATCH_API = 'http://localhost:8080/match/';
@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  getAllMatches() : Observable<any>{
    return this.http.get(MATCH_API+'all');
  }

  createMatch(match: Match): Observable<any>{
    return this.http.post(MATCH_API+'add',match);
  }

  deleteMatch(id:number | undefined) : Observable<any>{
    return this.http.post(MATCH_API+'delete',id)
  }
}
