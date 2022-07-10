import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListClubsComponent } from './club/list-clubs/list-clubs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material-module";
import { ClubAddComponent } from './club/club-add/club-add.component';
import { ClubInfoComponent } from './club/club-info/club-info.component';
import { PlayerAddComponent } from './club/player-add/player-add.component';
import {MatSelectModule} from "@angular/material/select";
import { PlayerUpdateComponent } from './club/player-update/player-update.component';
import { ClubUpdateComponent } from './club/club-update/club-update.component';
import {authInterceptorProviders} from "./helper/auth-interceptor.service";
import {authErrorInterceptorProviders} from "./helper/error-interceptor.service";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './header/header/header.component';
import { MatchListComponent } from './club/match-list/match-list.component';
import { MatchAddComponent } from './club/match-add/match-add.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    ListClubsComponent,
    ClubAddComponent,
    ClubInfoComponent,
    PlayerAddComponent,
    PlayerUpdateComponent,
    ClubUpdateComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    MatchListComponent,
    MatchAddComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        MatDatepickerModule
    ],
  providers: [authInterceptorProviders,authErrorInterceptorProviders, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
