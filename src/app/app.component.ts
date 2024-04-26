import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TileComponent } from '../components/tile/tile.component';
import { GridComponent } from '../components/grid/grid.component';
import {MatButtonModule} from '@angular/material/button';
import { GameEvent } from '../types/gameState';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, RouterOutlet, GridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'word-game';
  displayText = "";
  attemptsLeft : number = 4;

  @ViewChild(GridComponent) GridComponent: any;

  submitChoice(){
    this.GridComponent.submitTiles();
  }


  recieveGameEvent(event : GameEvent){
    switch(event){
      case GameEvent.PLAYER_WON:
        this.displayText = "Congratulations";
        return;
      case GameEvent.PLAYER_LOST:
        this.displayText = "You lost";
        return;
      case GameEvent.WRONG_ATTEMPT:
        this.attemptsLeft--;
    }
  }
}
