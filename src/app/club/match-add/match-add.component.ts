import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe, Location} from "@angular/common";
import {Match} from "../../models/match";
import {MatchService} from "../../service/match.service";
import {Club} from "../../models/club";
import {ClubService} from "../../service/club.service";

@Component({
  selector: 'app-match-add',
  templateUrl: './match-add.component.html',
  styleUrls: ['./match-add.component.css']
})
export class MatchAddComponent implements OnInit {

  addForm!:FormGroup;
  addMatch!: Match;
  clubs!:Club[];
  firstClub!: Club;
  secondClub!: Club;
  constructor(private fb : FormBuilder,
              private matchService: MatchService,
              private clubService: ClubService,
              private router: ActivatedRoute,
              private snackbar: MatSnackBar,
              private location: Location,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.clubService.getAllClubs().subscribe(data=>{
      this.clubs = data;
    });
    this.addForm = this.createAddForm();
  }

  createAddForm():FormGroup{
    return this.fb.group({
      goals_first:['',Validators.compose([Validators.required, Validators.min(0),Validators.pattern(/^[0-9]+(?!.)/)])],
      goals_second:['',Validators.compose([Validators.required, Validators.min(0),Validators.pattern(/^[0-9]+(?!.)/)])],
      date:['',Validators.compose([Validators.required,])],
      club1:['',Validators.compose([Validators.required])],
      club2:['',Validators.compose([Validators.required])]
    })
  }

  createMatch(): void{
    this.matchService.createMatch({
      goals_first:this.addForm.value.goals_first,
      goals_second:this.addForm.value.goals_second,
      date: this.addForm.value.date,
      club1:{
        id: this.addForm.value.club1.id,
        name: this.addForm.value.club1.name,
        games: this.addForm.value.club1.games,
        goals: this.addForm.value.club1.goals,
        points: this.addForm.value.club1.points
      },
      club2: {
        id: this.addForm.value.club2.id,
        name: this.addForm.value.club2.name,
        games: this.addForm.value.club2.games,
        goals: this.addForm.value.club2.goals,
        points: this.addForm.value.club2.points
      }
    },).subscribe(data=>{
      this.addMatch=data;
    })
    this.snackbar.open('Матч успешно добавлен!','OK',{
      duration: 3000
    });
    this.addForm.reset();
  }

  back():void{
    this.location.back();
  }
}
