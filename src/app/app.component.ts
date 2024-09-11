import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GridComponent } from '../components/grid/grid.component';
import {MatButtonModule} from '@angular/material/button';
import { GameEvent } from '../types/gameEvent';
import {MatIconModule} from '@angular/material/icon';

import { GameGenerator, WordCollection } from '../model/GameGenerator';
import { ToolbarComponent } from "../components/toolbar/toolbar.component";
import { AboutDialogComponent } from '../components/about-dialog/about-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, RouterOutlet, GridComponent, MatIconModule, CommonModule, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'word-game';
  displayText! : string;
  mistakesMade! : number;
  maxAttempts : number = 4;
  canSubmitGuess! : boolean;
  isGameFinished! : boolean;
  isAnyTileChosen! : boolean;

  exampleColor : string = "yellow";
  exampleWE : WordCollection = GameGenerator.getExampleWordCollection();

  @ViewChild(GridComponent) GridComponent: any;

  constructor(public dialog: MatDialog) {
    this.initGame();
  }

  initGame(){
    this.canSubmitGuess = false;
    this.isGameFinished = false;
    this.isAnyTileChosen = false;
    this.mistakesMade = 0;
    this.displayText = " ";
  }

  openDialog(){
    const dialogRef = this.dialog.open(AboutDialogComponent, {

    })

    
  }


  submitChoice(){
    this.GridComponent.submitTiles();
  }

  shuffleTiles(){
    this.GridComponent.shuffleTiles();
  }

  deselectAllTiles(){
    this.GridComponent.unSelectAllTiles();
  }

  numSequence(n: number): Array<number> { 
    return Array(n); 
  } 

  


  newGame(){
    this.initGame();
    this.GridComponent.newGame();
  }

 

  receiveGameEvent(event : GameEvent){
    switch(event){
      case GameEvent.PLAYER_WON:
        this.displayText = "Congratulations, you won";
        this.canSubmitGuess = false;
        this.isGameFinished = true;
        return;
      case GameEvent.PLAYER_LOST:
        this.displayText = "Game over";
        this.canSubmitGuess = false;
        this.isGameFinished = true;
        return;
      case GameEvent.WRONG_ATTEMPT:
        this.mistakesMade++;
        return;
      case GameEvent.PLAYER_CAN_MAKE_GUESS:
        this.canSubmitGuess = true;
        return;
      case GameEvent.PLAYER_CAN_NOT_MAKE_GUESS:
        this.canSubmitGuess = false;
        return;
      case GameEvent.AT_LEAST_ONE_TILE_CHOSEN:
        this.isAnyTileChosen = true;
        return;
      case GameEvent.NO_TILES_CHOSEN:
        this.isAnyTileChosen = false;
        return;
    }
  }


}

