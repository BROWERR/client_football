import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClubService} from "../../service/club.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Player} from "../../models/player";
import {PlayerService} from "../../service/player.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css']
})
export class PlayerAddComponent implements OnInit {

  addForm!:FormGroup;
  addPlayer!: Player;

  constructor(private fb : FormBuilder,
              private playerService: PlayerService,
              private router: ActivatedRoute,
              private snackbar: MatSnackBar,
              private location: Location) { }

  ngOnInit(): void {
    this.addForm = this.createAddForm();
  }

  createAddForm():FormGroup{
    return this.fb.group({
      name:['',Validators.compose([Validators.required])],
      surname:['',Validators.compose([Validators.required])],
      games:['',Validators.compose([Validators.required,Validators.min(0),Validators.pattern(/^[0-9]+(?!.)/)])],
      goals:['',Validators.compose([Validators.required, Validators.min(0),Validators.pattern(/^[0-9]+(?!.)/)])],
      position:['',Validators.compose([Validators.required])],
    })
  }

  createPlayer(): void{
    this.playerService.createPlayer({
      name:this.addForm.value.name,
      surname:this.addForm.value.surname,
      games:this.addForm.value.games,
      goals:this.addForm.value.goals,
      position:this.addForm.value.position,
      club_id:this.router.snapshot.params['id']
    }).subscribe(data=>{
      this.addPlayer=data;
    })
    this.snackbar.open('Игрок успешно добавлен!','Ладушки!',{
      duration: 3000
    });
    this.addForm.reset();
  }



  back():void{
    this.location.back();
  }
}
