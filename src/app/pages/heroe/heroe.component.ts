import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { FormsModule, NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe:HeroeModel = new HeroeModel();

  constructor(private heroeSrv:HeroesService, 
              private route:ActivatedRoute, 
              private router:Router) { }

  ngOnInit() {
   const id = this.route.snapshot.paramMap.get('id');

    if( id !== 'nuevo'){
      this.heroeSrv.getHeroe(id)
        .subscribe( (resp:HeroeModel) => {   
          this.heroe = resp;
          this.heroe.id = id;
          console.log(resp)
        });
    }
  }

  guardar(form:NgForm){
    if (form.invalid){
      console.log("Formulario no válido")  
      return ;
    }

    if(this.heroe.id){
      this.heroeSrv.actualizarHeroe(this.heroe)
      .subscribe(resp => {
        console.log(resp);
        alert("Héroe actualizado")
      });
    }else{
      this.heroeSrv.crearHeroe(this.heroe)
      .subscribe(resp => {
        console.log(resp);
        alert("Héroe creado")
      //Realizamos las importaciones necesarias de Router y lo añadimos al constructor  
      this.router.navigate(['heroes'])
    });
    } 
  }

  
}