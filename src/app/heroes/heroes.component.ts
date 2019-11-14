import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  heroes: Hero[];

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

  getHeroes(): void {
    // this.heroes = this.heroService.getHeroes(); // original

    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });

    // When the given name is non-blank, the handler creates a Hero-like object from the name (it's only missing the id)
    // and passes it to the services addHero() method.
    //
    // When addHero() saves successfully, the subscribe() callback receives the new hero and pushes it into to the heroes list for display.
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
    /*
    * Although the component delegates hero deletion to the HeroService, it remains responsible for updating its own list of heroes.
    * The component's delete() method immediately removes the hero-to-delete from that list, anticipating that the HeroService will succeed on the server.
    * There's really nothing for the component to do with the Observable returned by heroService.delete() but it must subscribe anyway.
    *
    * If you neglect to subscribe(), the service will not send the delete request to the server.
    * As a rule, an Observable does nothing until something subscribes.
    * Confirm this for yourself by temporarily removing the subscribe(), clicking "Dashboard", then clicking "Heroes".
    * You'll see the full list of heroes again.
    * */
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
