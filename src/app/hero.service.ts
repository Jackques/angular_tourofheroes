import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

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

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private heroesUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    //return this.http.get<Hero[]>(this.heroesUrl)
    // OLD: of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
    // You've just swapped of() for http.get() and the app keeps working without any other changes because both functions return an Observable<Hero[]>.

    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
        // The catchError() operator intercepts an Observable that failed. It passes the error an error handler that can do what it wants with the error.
        // The following handleError() method reports the error and then returns an innocuous result so that the application keeps working.

        // The HeroService methods will tap into the flow of observable values and send a message, via the log() method, to the message area at the bottom of the page.
        //
        // They'll do that with the RxJS tap() operator, which looks at the observable values, does something with those values, and passes them along.
        // The tap() call back doesn't touch the values themselves.
      );
    // All HttpClient methods return an RxJS Observable of something.
    //
    //   HTTP is a request/response protocol. You make a request, it returns a single response.
    //
    //   In general, an observable can return multiple values over time. An observable from HttpClient always emits a single value and then completes, never to emit again.

    // HttpClient.get() returns the body of the response as an untyped JSON object by default. Applying the optional type specifier, <Hero[]> , gives you a typed result object.

    // Other APIs may bury the data that you want within an object. You might have to dig that data out by processing the Observable result with the RxJS map() operator.
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

  /** POST: add a new hero to the server */
  /*
  addHero() differs from updateHero() in two ways:

  - It calls HttpClient.post() instead of put().
  - It expects the server to generate an id for the new hero, which it returns in the Observable<Hero> to the caller.
  */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    // Note the backticks ( ` ) that define a JavaScript template literal for embedding the id.
    /* Template literals are string literals allowing embedded expressions. You can use multi-line strings and string interpolation features with them. They were called "template strings" in prior editions of the ES2015 specification. */
    // ${} is the way vars are embedded in an template literal

    const url = `${this.heroesUrl}/${id}`;
    // OLD: return of(HEROES.find(hero => hero.id === id));
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );

    // 1. the http.get() method returns an observable so a pipe() method can be executed on it
    // (the pipe method allows for multiple actions to be applied in the data.. for thee record)
    // 2. inside the pipe() method we find the tap() method which can do something with the data before passing it along
    // 3. inside the pipe() method we find the catchError() method which catches a potential error and can do something with it's data

    /*
    Like getHeroes(), getHero() has an asynchronous signature. It returns a mock hero as an Observable, using the RxJS of() function.
    You'll be able to re-implement getHero() as a real Http request without having to change the HeroDetailComponent that calls it.
    * */
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }


  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    console.log('searchHeroes: '+term);
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}

