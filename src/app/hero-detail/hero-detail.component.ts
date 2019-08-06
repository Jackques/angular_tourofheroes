import { Component, OnInit, Input } from '@angular/core'; // it imports decorators?
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero; //because the external HeroesComponent will bind to it like this.

  constructor() { }

  ngOnInit() {
  }

}
