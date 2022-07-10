import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ClubService} from "../../service/club.service";
import {Club} from "../../models/club";

@Component({
  selector: 'app-club-add',
  templateUrl: './club-add.component.html',
  styleUrls: ['./club-add.component.css']
})
export class ClubAddComponent implements OnInit {
  addForm!:FormGroup;
  addClub!: Club;
  constructor(private fb : FormBuilder,
              private clubService: ClubService,
              private router: Router,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.addForm = this.createAddForm();
  }

  createAddForm():FormGroup{
    return this.fb.group({
        name:['',Validators.compose([Validators.required, Validators.maxLength(25)])],
        games:['',Validators.compose([Validators.required,Validators.min(0),Validators.pattern(/^[0-9]+(?!.)/)])],
        goals:['',Validators.compose([Validators.required,Validators.min(0),Validators.pattern(/^[0-9]+(?!.)/)])],
        points:['',Validators.compose([Validators.required,Validators.min(0),Validators.pattern(/^[0-9]+(?!.)/)])]
    })
  }

  createClub(): void{
    this.clubService.createClub({
      name:this.addForm.value.name,
      games:this.addForm.value.games,
      goals:this.addForm.value.goals,
      points:this.addForm.value.points,
    }).subscribe(data=>{
      this.addClub=data;
    })
    this.snackbar.open('Клуб успешно добавлен!','Ладушки',{
      duration: 3000
    });
    this.addForm.reset();
  }
}
