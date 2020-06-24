import { Hero } from './../HeroInterface';
import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../heroes.service';
import {Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();


  constructor(private heroService: HeroesService,) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(

      debounceTime(300),
      distinctUntilChanged(),
      switchMap(
        (term: string ) => this.heroService.searchHeroes(term)
      )

    );
  }


  search(term: string): void{
    this.searchTerms.next(term);
  }

}
