import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TileComponent } from '../components/tile/tile.component';
import { GridComponent } from '../components/grid/grid.component';
import {MatButtonModule} from '@angular/material/button';
import { GameEvent } from '../types/gameEvent';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, RouterOutlet, GridComponent, MatIconModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'word-game';
  displayText = "";
  attemptsLeft : number = 4;
  canSubmitGuess : boolean = false;

  @ViewChild(GridComponent) GridComponent: any;

  submitChoice(){
    this.GridComponent.submitTiles();
  }

  numSequence(n: number): Array<number> { 
    return Array(n); 
  } 


  receiveGameEvent(event : GameEvent){
    switch(event){
      case GameEvent.PLAYER_WON:
        this.displayText = "Congratulations, you won!";
        this.canSubmitGuess = false;
        return;
      case GameEvent.PLAYER_LOST:
        this.displayText = "You lost :(";
        this.canSubmitGuess = false;
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
    }
  }


}
