import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './../heroes/heroes.component';

// Routes tell the Router which view to display when a user clicks a link or pastes a URL into the browser address bar.
// Routes is a default type of variabele defined in the @angular router module
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent }
];

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
