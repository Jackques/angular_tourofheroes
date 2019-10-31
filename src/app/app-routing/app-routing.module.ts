import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './../dashboard/dashboard.component';
import { HeroesComponent }      from './../heroes/heroes.component';
import { HeroDetailComponent }  from './../hero-detail/hero-detail.component';

// Routes tell the Router which view to display when a user clicks a link or pastes a URL into the browser address bar.
// Routes is a default type of variabele defined in the @angular router module
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent }
];

// The colon (:) in the path indicates that :id is a placeholder for a specific hero id
// parameterized dashboard route

@NgModule({
  // the line below adds the RouterModule to the AppRoutingModule imports array and
  // configures it with the routes in one step by calling RouterModule.forRoot():
  imports: [RouterModule.forRoot(routes)],
  // AppRoutingModule exports RouterModule so it will be available throughout the app.
  exports: [RouterModule]
})
/*
The method is called forRoot() because you configure the router at the application's root level.
The forRoot() method supplies the service providers and directives needed for routing,
and performs the initial navigation based on the current browser URL.
 */

export class AppRoutingModule { }
