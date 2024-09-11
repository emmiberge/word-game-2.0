import { Component, EventEmitter, Output } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { TileComponent } from '../tile/tile.component';
import { Tile } from '../../model/Tile';
import { GameGenerator, WordCollection } from '../../model/GameGenerator';
import { GameEvent } from '../../types/gameEvent';
import { ShufflingService } from '../../services/shuffling.service';
import { GroupClass } from '../../model/Group';


@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MatGridListModule, CommonModule, MatCardModule, TileComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent{

  tilesNotGroupedYet! : Tile[] ;
  colorArr! : string[];
  unSelectedColor : string = "rgb(233, 234, 232)";
  selectedColor : string = "gray";
  nOftotalTiles : number = 16;
  nSelected! : number;
  nFound! : number;
  mistakesMade! : number;
  maxAttempts : number = 4;
  allTilesFound! : boolean;
  gameGenerator! : GameGenerator;
  
  

  @Output() taskNameEvent = new EventEmitter<GameEvent>();

  constructor(){
    this.initGame();
  }

  initGame(){
    this.nSelected = 0;
    this.nFound = 0;
    this.mistakesMade = 0;
    this.allTilesFound = false;

    // Generate tiles
    this.gameGenerator = new GameGenerator();
    this.tilesNotGroupedYet = this.gameGenerator.getTiles();
    this.sendGameEvent(GameEvent.PLAYER_CAN_NOT_MAKE_GUESS);

    // Set colors of tiles
    this.colorArr = Array.from({length: this.nOftotalTiles}, (_, i) => {
      return this.unSelectedColor;
    });
  }

  newGame(){
    this.initGame();
  }

  // Send to parent to let it know that the game is won or lost
  sendGameEvent(event : GameEvent){
    this.taskNameEvent.emit(event);
  }
 

  // Not good, should set id regardless of index
 

  setColorTile(id :string, color : string){
    this.colorArr[Number(id)] = color;
  }

  getColorTile(id : string){
    return this.colorArr[Number(id)];
  }


  // Returns true if player has won
  hasWon(){
    return this.nFound == this.nOftotalTiles;
  }


  


  // rearrange ordering of tiles so that the found ones come first
  putFoundTilesFirst(){
    const foundTiles : Tile[] = [];
    const unknownTiles : Tile[] = [];

    this.tilesNotGroupedYet.forEach(t => {
      if(t.getIsFound()){
        foundTiles.push(t);
      }
      else{
        unknownTiles.push(t);
      }
    })

    this.tilesNotGroupedYet = foundTiles.concat(unknownTiles);
  }



  
  

 

 
  // Called when tile is chosen
  trySelect(id: string){
    var t : Tile = this.tilesNotGroupedYet.filter(t => t.getId() === id)[0];

    // Select
    if(t.getCanBeSelected() && this.nSelected < 4){
      this.selectTile(t);
      return;
    }

    // Unselect
    if(t.getIsSelected()){
      this.unselectTile(t);
      return;
    }

    
  }


  private selectTile(t : Tile){
      this.nSelected++;
      t.select();
      this.setColorTile(t.getId(), this.selectedColor);
      this.sendGameEvent(GameEvent.AT_LEAST_ONE_TILE_CHOSEN);

      if(this.nSelected == 4){
        this.sendGameEvent(GameEvent.PLAYER_CAN_MAKE_GUESS);
      }
  }

  private unselectTile(t : Tile){
      t.deselect();
      this.nSelected--;
      this.setColorTile(t.getId(), this.unSelectedColor);

      if(this.nSelected < 4){
        this.sendGameEvent(GameEvent.PLAYER_CAN_NOT_MAKE_GUESS);
      }

      if(this.nSelected == 0){
        this.sendGameEvent(GameEvent.NO_TILES_CHOSEN);
      }
  }

  private setFinishedColorOnTile(t : Tile){
    this.setColorTile(t.getId(), GroupClass.groupColorMap.get(t.getGroup())!);
  }




  unSelectAllTiles(){
    this.tilesNotGroupedYet.forEach(t => {
      if(t.getIsSelected()){
        this.unselectTile(t);
      }
    })
  }
  


  // Prevent all tiles to be selected
  // Call when player lost
  lockAllTiles(){
    this.tilesNotGroupedYet.map(tile => {
      tile.lock();
    })
  }

  // -------------- GLOBAL -----------------

  // Called when player wants to shuffle
  shuffleTiles(){
    const foundTiles : Tile[] = [];
    var unknownTiles : Tile[] = [];

    this.tilesNotGroupedYet.forEach(t => {
      if(t.getIsFound()){
        foundTiles.push(t);
      }
      else{
        unknownTiles.push(t);
      }
    })

    unknownTiles = ShufflingService.shuffle(unknownTiles);
    this.tilesNotGroupedYet = foundTiles.concat(unknownTiles);
  }
  


  // Called when player makes guess
  submitTiles(){
    if(this.nSelected == 4 && this.mistakesMade < this.maxAttempts){
      var selectedTiles : Tile[] = this.tilesNotGroupedYet.filter(t => t.getIsSelected());
      this.sendGameEvent(GameEvent.NO_TILES_CHOSEN);


      // Correct guess
      if(selectedTiles.every(tile => {
        return tile.getGroup() == selectedTiles[0].getGroup();
      })){
        selectedTiles.forEach(t => {
          t.find();
          this.setFinishedColorOnTile(t);
        });
        
        this.putFoundTilesFirst();
        this.nSelected = 0;
        this.nFound+=4;

        this.sendGameEvent(GameEvent.PLAYER_CAN_NOT_MAKE_GUESS);

        // Check if won
        if(this.hasWon()){
          this.sendGameEvent(GameEvent.PLAYER_WON);
        }
      }

      // Incorrect guess
      else{
        this.unSelectAllTiles();

        this.mistakesMade++;
        this.sendGameEvent(GameEvent.WRONG_ATTEMPT);
        
        // Check if lost
        if(this.mistakesMade == this.maxAttempts){
          this.sendGameEvent(GameEvent.PLAYER_LOST);
          this.lockAllTiles();
        }
        
      }

    }
    else{
      console.log("Only " + this.nSelected + "tiles chosen. Select four please");
    }
  }


}
