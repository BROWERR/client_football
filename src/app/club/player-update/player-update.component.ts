import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../../service/player.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Player} from "../../models/player";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-player-update',
  templateUrl: './player-update.component.html',
  styleUrls: ['./player-update.component.css']
})
export class PlayerUpdateComponent implements OnInit {

  updateForm!:FormGroup;
  updatePlayer!:Player;

  constructor(private playerService: PlayerService,
              private fb: FormBuilder,
              private router: ActivatedRoute,
              private snackbar: MatSnackBar,
              private location: Location) { }

  ngOnInit(): void {
    this.playerService.getPlayerById(this.router.snapshot.params['id_updatePlayer']).subscribe(data=> {
      this.updatePlayer = data
    });
    this.updateForm = this.createUpdateForm();
  }

  createUpdateForm():FormGroup{
    return this.fb.group({
      name:['',Validators.compose([Validators.required])],
      surname:['',Validators.compose([Validators.required])],
      games:['',Validators.compose([Validators.required,Validators.min(0),Validators.pattern(/^[0-9]+(?!.)/)])],
      goals:['',Validators.compose([Validators.required, Validators.min(0),Validators.pattern(/^[0-9]+(?!.)/)])],
      position:['',Validators.compose([Validators.required])],
    })
  }

  update(): void{
    this.playerService.updatePlayer({
      id: this.updatePlayer.id=this.router.snapshot.params['id_updatePlayer'],
      name:this.updateForm.value.name,
      surname:this.updateForm.value.surname,
      games:this.updateForm.value.games,
      goals:this.updateForm.value.goals,
      position:this.updateForm.value.position,
      club_id:this.updatePlayer.club_id
    }).subscribe(data => {
      this.updatePlayer = data;
    })
    this.snackbar.open('Игрок успешно обновлен!','Окей',{
      duration: 2000
    });
  }

  back():void{
    this.location.back();
  }
}
