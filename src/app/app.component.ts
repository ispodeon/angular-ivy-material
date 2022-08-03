import { Component, VERSION, OnInit } from '@angular/core';
import { of, switchMap, concatMap, from } from 'rxjs';
import { PokemonResponse } from './interfaces/pokemon.interface';
import { PokemonServiceService } from './services/pokemon-service.service';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  starterPokemon = [ "Bulbasaur", "Squirtle", "Charmander" ];
  starterPokemon$ = from(this.starterPokemon);
  pokelist:PokemonResponse[] = [];

  constructor(private pokeService: PokemonServiceService){ }

  ngOnInit(): void {

    this.starterPokemon$.pipe(
      // switchMap((pokemon) => {
      //   return this.pokeService.getPokemon(pokemon).subscribe()
      // })
      concatMap((pokemon) => {
        return this.pokeService.getPokemon(pokemon.toLowerCase())
      })
    )
    .subscribe((pokemon) => {
      this.pokelist.push(pokemon);
    })
      /*
      this.pokeService.getPokemon().subscribe((pokemon:PokemonResponse) => {
        console.log('pokemon', pokemon.abilities);
      })
      */
  }
  
}
