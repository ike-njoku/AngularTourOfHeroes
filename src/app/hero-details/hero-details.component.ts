import { Hero } from './../HeroInterface';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../heroes.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private heroService: HeroesService,
    private location: Location
  ) { }

    hero: Hero;

  ngOnInit(): void {

    this.getHero();

  }


  getHero(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }


  goBack(){
    this.location.back();
  }

  save(): void{
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}
