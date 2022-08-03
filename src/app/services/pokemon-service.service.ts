import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import {PokemonResponse} from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {

  baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getPokemon(pokemon: string){
    return this.http.get<PokemonResponse>([this.baseUrl,pokemon].join('/'))
                    .pipe(
                      tap()
                    )
  }
}
