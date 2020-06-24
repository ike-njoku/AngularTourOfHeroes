import { Hero } from './HeroInterface';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ɵDomRendererFactory2 } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(){
    const heroes = [
      {id: 1, name: 'David', photo: 'jpg'},
      {id: 2, name: 'Amanda', photo: 'jpeg'},
      {id: 3, name: 'Peaches', photo: 'png'},
      {id: 4, name: 'Emerikoko', photo : 'jpg'},
      {id: 5, name: 'Bambi' , photo : 'png'},
      {id: 6, name: 'Skylow' , photo: 'jpeg'},
      {id: 7, name: 'Ezenwa', photo : 'jpg'},
      {id: 8, name: 'Oyoyonwa', photo: 'png'},
      {id: 9, name: 'Anita', photo: 'jpeg'},
      {id: 10, name: 'Nwanyi Ofe Akwu', photo: 'jpg'}

    ];

    return{heroes};
  }

  genId(heroes: Hero[]): number{
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }


  constructor() { }
}
