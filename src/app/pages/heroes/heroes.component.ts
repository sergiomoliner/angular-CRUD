import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:HeroeModel[]=[];
  cargando = false;

  constructor(private heroesService:HeroesService) { }

  ngOnInit() {
    this.cargando = true;
    this.heroesService.getHeroes()
      .subscribe( resp => {
        this.heroes = resp, 
        this.cargando = false;
        });
  }

  borrarHeroe(heroe:HeroeModel , i:number){
    let question = confirm("¿Está seguro de que desea eliminarlo?")

    if(question == true){
      //Con splice borramos la posicion "visual" al pulsar el botón en el HTML
      this.heroes.splice(i, 1);    
    }

    this.heroesService.borrarHeroe(heroe.id)
      .subscribe();
  }
}