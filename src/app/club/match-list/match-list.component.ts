import { Component, OnInit } from '@angular/core';
import {Club} from "../../models/club";
import {User} from "../../models/user";
import {ClubService} from "../../service/club.service";
import {MatchService} from "../../service/match.service";
import {Match} from "../../models/match";
import {Location} from "@angular/common";

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  matches!:Match[];
  name!: string;
  user!: User;
  constructor(private matchService: MatchService,
              private location: Location) { }

  ngOnInit(): void {
    this.matchService.getAllMatches().subscribe(data=>{
      this.matches = data;
    });
  }

  removeMatch(match: Match):void{
    const message = confirm('Do you really want to delete this match?')
    if(message){
      this.matchService.deleteMatch(match.id).subscribe(()=>{
        this.matches.splice(<number>match.id,1);
      });
      window.location.reload();
    }
  }
  back():void{
    this.location.back();
  }
}
