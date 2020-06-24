import { Hero } from './../HeroInterface';
import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../heroes.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero;


  constructor(private messageService: MessageService ,private heroService: HeroesService) { }

  getHeroes(): void{
    this.heroService.getHeroes()
        .subscribe( heroes => this.heroes = heroes);

    this.messageService.addMessage('HeroService fetched Heroes');
  }

  onSelect(hero){
    this.selectedHero = hero;
    this.messageService.addMessage(`HeroService selected hero id= ${hero.id} `);
  }

  add(name: string){
    name = name.trim();
    if (!name){ return; }
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }


  delete(hero: Hero){
    this.heroService.deleteHero(hero).subscribe();
    this.heroes = this.heroes.filter(h => h !== hero );
  }

  ngOnInit(): void {
    this.getHeroes();
  }

}
