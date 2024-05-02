import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TileComponent } from '../components/tile/tile.component';
import { GridComponent } from '../components/grid/grid.component';
import {MatButtonModule} from '@angular/material/button';
import { GameEvent } from '../types/gameEvent';
import {MatIconModule} from '@angular/material/icon';
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

  constructor(public dialog: MatDialog) {}

  submitChoice(){
    this.GridComponent.submitTiles();
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

