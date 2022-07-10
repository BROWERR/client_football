import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {ClubService} from "../../service/club.service";
import {Club} from "../../models/club";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-club-update',
  templateUrl: './club-update.component.html',
  styleUrls: ['./club-update.component.css']
})
export class ClubUpdateComponent implements OnInit {

  updateForm!:FormGroup;
  updateClub!:Club;

  constructor(private clubService: ClubService,
              private fb: FormBuilder,
              private router: ActivatedRoute,
              private snackbar: MatSnackBar,
              private location: Location) { }

  ngOnInit(): void {
    this.clubService.getClubById(this.router.snapshot.params['id_updateClub']).subscribe(data=> {
      this.updateClub = data
    });
    this.updateForm = this.createUpdateForm();
  }

  createUpdateForm():FormGroup{
    return this.fb.group({
      name:['',Validators.compose([Validators.required])],
      games:['',Validators.compose([Validators.required,Validators.min(0),Validators.pattern(/^[0-9]+(?!.)/)])],
      goals:['',Validators.compose([Validators.required, Validators.min(0),Validators.pattern(/^[0-9]+(?!.)/)])],
      points:['',Validators.compose([Validators.required,Validators.min(0),Validators.pattern(/^[0-9]+(?!.)/)])],
    })
  }

  update(): void{
    this.clubService.updateClub({
      id: this.updateClub.id=this.router.snapshot.params['id_updateClub'],
      name:this.updateForm.value.name,
      games:this.updateForm.value.games,
      goals:this.updateForm.value.goals,
      points:this.updateForm.value.points,
    }).subscribe(data => {
      this.updateClub = data;
    })
    this.snackbar.open('Клуб успешно обновлен!','Окей',{
      duration: 2000
    });
  }

  back():void{
    this.location.back();
  }
}
