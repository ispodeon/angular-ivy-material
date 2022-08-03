import { Component, OnInit, Inject } from '@angular/core';
import { concatMap, from } from 'rxjs';
import { PokemonResponse } from './interfaces/pokemon.interface';
import { PokemonServiceService } from './services/pokemon-service.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  starterPokemon = [ "Bulbasaur", "Squirtle", "Charmander" ];
  starterPokemon$ = from(this.starterPokemon);
  pokelist:PokemonResponse[] = [];

  loaded = false;

  showSelected = false;

  radius: number;
  color: string;

  currPoke:PokemonResponse;

  constructor(private pokeService: PokemonServiceService, public dialog: MatDialog){ }

  ngOnInit(): void {

    this.starterPokemon$.pipe(

      concatMap((pokemon) => {
        return this.pokeService.getPokemon(pokemon.toLowerCase())
      })
    )
    .subscribe(
      (pokemon) => { this.pokelist.push(pokemon); },
      (err) => { },
      () => { this.loaded = true; }
    )
  }

  openDialog(poke: PokemonResponse): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: poke,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(typeof result === 'object'){
        console.log(typeof result);

        this.currPoke = result;
        this.showSelected = true;
        
      }
      
    });
  }
  
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PokemonResponse,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(true);
  }
}