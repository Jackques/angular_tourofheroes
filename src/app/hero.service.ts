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
    return of(HEROES);
    // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
  }
  /*
  * In the HTTP tutorial, you'll call HttpClient.get<Hero[]>() which also returns an Observable<Hero[]> that
  * emits a single value, an array of heroes from the body of the HTTP response.
  * */
}

