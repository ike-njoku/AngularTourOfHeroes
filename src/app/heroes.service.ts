import { Hero } from './HeroInterface';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  // heroes url
  private  heroesUrl = 'api/heroes';

  // handle errors
  private handleError<T>(operation = 'opereation', result?: T){
    return (error: any): Observable<T> => {
      this.messageService.addMessage(`${operation} failed: ${error.message} `);

      // keep the app running
      return of(result as T);
    };
  }

  getHeroes():Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );

  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.messageService.addMessage(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.messageService.addMessage(`updated hero id= ${hero.id} `)),
      catchError(this.handleError<any>('updateHero') )
    );
  }


  addHero(hero: Hero): Observable<Hero> {

    return this.http.post(this.heroesUrl, hero , this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.messageService.addMessage(`added hero with Id = ${newHero.id} `) ),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.messageService.addMessage(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.messageService.addMessage(`found heroes matching "${term}"`) :
         this.messageService.addMessage(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

}
