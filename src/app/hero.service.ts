import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

/*
* Notice that the new service imports the Angular Injectable symbol and annotates the class with the @Injectable() decorator.
* This marks the class as one that participates in the dependency injection system.
* The HeroService class is going to provide an injectable service, and it can also have its own injected dependencies.
* It doesn't have any dependencies yet, but it will soon.
*
* The @Injectable() decorator accepts a metadata object for the service,
* the same way the @Component() decorator did for your component classes.
* */

@Injectable({
  providedIn: 'root'
})

/*
* When you provide the service at the root level, Angular creates a single,
* shared instance of HeroService and injects into any class that asks for it.
* Registering the provider in the @Injectable metadata also allows Angular to optimize an app by removing
* the service if it turns out not to be used after all.
* */

export class HeroService {

  constructor(private messageService: MessageService) { }

  // getHeroes(): Hero[] {
  //   return HEROES;
  // }
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
    // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
  }
  /*
  * In the HTTP tutorial, you'll call HttpClient.get<Hero[]>() which also returns an Observable<Hero[]> that
  * emits a single value, an array of heroes from the body of the HTTP response.
  * */

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    // The overall structure of the updateHero() method is similar to that of getHeroes(),
    // but it uses http.put() to persist the changed hero on the server. Add the following to the HeroService.

    // The heroes web API expects a special header in HTTP save requests.
    // That header is in the httpOptions constant defined in the HeroService
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    // Note the backticks ( ` ) that define a JavaScript template literal for embedding the id.
    /* Template literals are string literals allowing embedded expressions. You can use multi-line strings and string interpolation features with them. They were called "template strings" in prior editions of the ES2015 specification. */
    // ${} is the way vars are embedded in an template literal

    return of(HEROES.find(hero => hero.id === id));
    /*
    Like getHeroes(), getHero() has an asynchronous signature. It returns a mock hero as an Observable, using the RxJS of() function.
    You'll be able to re-implement getHero() as a real Http request without having to change the HeroDetailComponent that calls it.
    * */
  }
}

