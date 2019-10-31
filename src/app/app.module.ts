import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component'; // this was already set by the tutorial
import { MessagesComponent } from './messages/messages.component';

import { AppRoutingModule } from "./app-routing/app-routing.module";

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent, // this was already set by the tutorial
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
