import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  heroes: Hero[];
  selectedHero = this.hero;

  constructor(private heroService: HeroService) {
    /*
    * While you could call getHeroes() in the constructor, that's not the best practice.
    * Reserve the constructor for simple initialization such as wiring constructor parameters to properties.
    * The constructor shouldn't do anything.
    * It certainly shouldn't call a function that makes HTTP requests to a remote server as a real data service would.
    * */
  }

  ngOnInit() {
    /*
    * all getHeroes() inside the ngOnInit lifecycle hook and let Angular call
    * ngOnInit at an appropriate time after constructing a HeroesComponent instance.
    * */
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    console.log("Hello, "+ Hero);
  }

  getHeroes(): void {
    // this.heroes = this.heroService.getHeroes(); // original

    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  /*
  * Observable.subscribe() is the critical difference.
  * The previous version assigns an array of heroes to the component's heroes property.
  * The assignment occurs synchronously,
  * as if the server could return heroes instantly or the browser could freeze the UI while it waited for the server's response.
  * That won't work when the HeroService is actually making requests of a remote server.
  * The new version waits for the Observable to emit the array of heroes— which could happen now or several minutes from now.
  * Then subscribe passes the emitted array to the callback, which sets the component's heroes property.
  * This asynchronous approach will work when the HeroService requests heroes from the server.
  * */

}
