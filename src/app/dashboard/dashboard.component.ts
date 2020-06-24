import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../heroes.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private heroesService: HeroesService, private messageService: MessageService) { }
  heroes;

  selectedHero;
  onSelect(hero){
    this.selectedHero = hero;
    this.messageService.addMessage(`Hero Service selected hero id= ${hero.id} `);
  }

  getHeroes(){

    this.heroesService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));

    this.messageService.addMessage('Hero Service fetched Heroes');

  }


  ngOnInit(): void {
    this.getHeroes();
  }

}
