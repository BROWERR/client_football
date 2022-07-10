import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListClubsComponent} from "./club/list-clubs/list-clubs.component";
import {ClubAddComponent} from "./club/club-add/club-add.component";
import {ClubInfoComponent} from "./club/club-info/club-info.component";
import {PlayerAddComponent} from "./club/player-add/player-add.component";
import {PlayerUpdateComponent} from "./club/player-update/player-update.component";
import {ClubUpdateComponent} from "./club/club-update/club-update.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthGuardService} from "./helper/auth-guard.service";
import {MatchListComponent} from "./club/match-list/match-list.component";
import {MatchAddComponent} from "./club/match-add/match-add.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'match',canActivate:[AuthGuardService], children:[
      {path:'',component:MatchListComponent},
      {path:'add',component:MatchAddComponent},
    ]},
  {path:'club',canActivate:[AuthGuardService] ,children: [
      {path:'',component: ListClubsComponent,canActivate:[AuthGuardService]},
      {path:'add',component:ClubAddComponent,canActivate:[AuthGuardService]},
      {path:':id_updateClub', component: ClubUpdateComponent,canActivate:[AuthGuardService]},
      {path:'info/:id',canActivate:[AuthGuardService], children:[
          {path:'',component:ClubInfoComponent,canActivate:[AuthGuardService]},
          {path:'player-add', component: PlayerAddComponent,canActivate:[AuthGuardService]},
          {path:'update/:id_updatePlayer',component:PlayerUpdateComponent,canActivate:[AuthGuardService]}
        ]}
    ]
  },
  {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatDatepickerModule,MatNativeDateModule],
  exports: [RouterModule, MatDatepickerModule]
})
export class AppRoutingModule { }
