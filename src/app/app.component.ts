import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TileComponent } from '../components/tile/tile.component';
import { GridComponent } from '../components/grid/grid.component';
import {MatButtonModule} from '@angular/material/button';
import { GameEvent } from '../types/gameEvent';
import {MatIconModule} from '@angular/material/icon';
import { FinishedRowComponent } from '../components/finished-row/finished-row.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { AboutDialogComponent } from '../components/about-dialog/about-dialog.component';
import { GameGenerator, WordCollection } from '../model/GameGenerator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, RouterOutlet, GridComponent, MatIconModule, CommonModule, FinishedRowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'word-game';
  displayText! : string;
  attemptsLeft! : number;
  canSubmitGuess! : boolean;
  isGameFinished! : boolean;
  isAnyTileChosen! : boolean;

  exampleColor : string = "blue";
  exampleWE : WordCollection = GameGenerator.getExampleWordCollection();

  @ViewChild(GridComponent) GridComponent: any;

  constructor(public dialog: MatDialog) {
    this.initGame();
  }

  initGame(){
    this.canSubmitGuess = false;
    this.isGameFinished = false;
    this.isAnyTileChosen = false;
    this.attemptsLeft = 4;
    this.displayText = " ";
  }


  submitChoice(){
    this.GridComponent.submitTiles();
    console.log(this.isGameFinished);
  }

  shuffleTiles(){
    this.GridComponent.shuffleTiles();
  }

  deselectAllTiles(){
    console.log("Clicked delsect all tiles");
    this.GridComponent.unSelectAllTiles();
  }

  numSequence(n: number): Array<number> { 
    return Array(n); 
  } 

  openDialog(){
    const dialogRef = this.dialog.open(AboutDialogComponent, {
      data : {text: "22222"}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  newGame(){
    this.initGame();
    this.GridComponent.newGame();
  }

 

  receiveGameEvent(event : GameEvent){
    switch(event){
      case GameEvent.PLAYER_WON:
        this.displayText = "Congratulations, you won!";
        this.canSubmitGuess = false;
        this.isGameFinished = true;
        return;
      case GameEvent.PLAYER_LOST:
        this.displayText = "You lost :(";
        this.canSubmitGuess = false;
        this.isGameFinished = true;
        return;
      case GameEvent.WRONG_ATTEMPT:
        this.attemptsLeft--;
        return;
      case GameEvent.PLAYER_CAN_MAKE_GUESS:
        this.canSubmitGuess = true;
        return;
      case GameEvent.PLAYER_CAN_NOT_MAKE_GUESS:
        this.canSubmitGuess = false;
        return;
      case GameEvent.AT_LEAST_ONE_TILE_CHOSEN:
        this.isAnyTileChosen = true;
        console.log("At least one tile chosen");
        return;
      case GameEvent.NO_TILES_CHOSEN:
        this.isAnyTileChosen = false;
        console.log("No tiles chosen");
        return;
    }
  }


}

