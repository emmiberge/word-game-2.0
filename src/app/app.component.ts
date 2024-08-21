import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GridComponent } from '../components/grid/grid.component';
import {MatButtonModule} from '@angular/material/button';
import { GameEvent } from '../types/gameEvent';
import {MatIconModule} from '@angular/material/icon';
import { FinishedRowComponent } from '../components/finished-row/finished-row.component';

import { GameGenerator, WordCollection } from '../model/GameGenerator';
import { ToolbarComponent } from "../components/toolbar/toolbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, RouterOutlet, GridComponent, MatIconModule, CommonModule, FinishedRowComponent, ToolbarComponent],
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
  correctGuesses : WordCollection[] = [];

  exampleColor : string = "yellow";
  exampleWE : WordCollection = GameGenerator.getExampleWordCollection();

  @ViewChild(GridComponent) GridComponent: any;
  @ViewChild(FinishedRowComponent) FinishedRowComponent : any;

  constructor() {
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
    this.correctGuesses = [];
  }

  
  addCorrectGuess(collection : WordCollection){
    this.correctGuesses.push(collection);
  }
 

  receiveGameEvent(event : GameEvent){
    switch(event){
      case GameEvent.PLAYER_WON:
        this.displayText = "Congratulations, you won";
        this.canSubmitGuess = false;
        this.isGameFinished = true;
        return;
      case GameEvent.PLAYER_LOST:
        this.displayText = "You lost";
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
        return;
      case GameEvent.NO_TILES_CHOSEN:
        this.isAnyTileChosen = false;
        return;
    }
  }


}

