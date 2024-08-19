import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { TileComponent } from '../tile/tile.component';
import { Tile } from '../../model/Tile';
import { Group, GroupClass } from '../../model/Group';
import { GameGenerator, WordCollection } from '../../model/GameGenerator';
import { tileState } from '../../types/tileState';
import { GameEvent } from '../../types/gameEvent';
import { ShufflingService } from '../../services/shuffling.service';


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
  nOfAttemptsLeft! : number;
  allTilesFound! : boolean;
  gameGenerator! : GameGenerator;
  

  @Output() taskNameEvent = new EventEmitter<GameEvent>();
  @Output() correctGuess = new EventEmitter<WordCollection>();

  constructor(){
    this.initGame();
  }

  initGame(){
    this.nSelected = 0;
    this.nFound = 0;
    this.nOfAttemptsLeft = 4;
    this.allTilesFound = false;

    // Generate tiles
    this.gameGenerator = new GameGenerator();
    this.tilesNotGroupedYet = this.gameGenerator.getTiles();
    console.log("Before foreach");
    this.tilesNotGroupedYet.forEach((tile) => {
      console.log(tile.getId());
      console.log(tile.getWord());
    })
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

  

  // Send to parent to create a new finished row
  // Removes the correctly guessed tiles from this component
  private madeCorrectGuess(){
    var selectedTiles : Tile[] = this.tilesNotGroupedYet.filter(t => t.getIsSelected());



    // Remove grouped tiles
    var unSelectedTiles : Tile[] = this.tilesNotGroupedYet.filter(t => !t.getIsSelected());
    this.tilesNotGroupedYet = [...unSelectedTiles];

    this.sendCorrectGuess(this.gameGenerator.tilesToWordCollection(selectedTiles))
  }

  sendCorrectGuess(selectedTiles : WordCollection){
    this.correctGuess.emit(selectedTiles);
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
    console.log("Called trySelect");
    var t : Tile = this.tilesNotGroupedYet.filter(t => t.getId() === id)[0];

    console.log("id:" + t.getId());
    console.log("Can be selected:" + t.getCanBeSelected());
    console.log("nSelected:" + this.nSelected);


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
    console.log("Select succeeded");
      this.nSelected++;
      console.log("nSelected:" + this.nSelected);
      t.select();
      this.setColorTile(t.getId(), this.selectedColor);
      this.sendGameEvent(GameEvent.AT_LEAST_ONE_TILE_CHOSEN);

      if(this.nSelected == 4){
        this.sendGameEvent(GameEvent.PLAYER_CAN_MAKE_GUESS);
      }
  }

  private unselectTile(t : Tile){
    console.log("Unselected tile with id ", t.getId());
      t.deselect();
      this.nSelected--;
      this.setColorTile(t.getId(), this.unSelectedColor);
      console.log("nSelected:" + this.nSelected);

      if(this.nSelected < 4){
        this.sendGameEvent(GameEvent.PLAYER_CAN_NOT_MAKE_GUESS);
      }

      if(this.nSelected == 0){
        this.sendGameEvent(GameEvent.NO_TILES_CHOSEN);
      }
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
    if(this.nSelected == 4 && this.nOfAttemptsLeft > 0){
      var selectedTiles : Tile[] = this.tilesNotGroupedYet.filter(t => t.getIsSelected());
      
      console.log("Tiles selected:");
      selectedTiles.forEach(tile => {
        console.log(tile.getId());
      });


      this.sendGameEvent(GameEvent.NO_TILES_CHOSEN);


      // Correct guess
      if(selectedTiles.every(tile => {
        return tile.getGroup() == selectedTiles[0].getGroup();
      })){
        console.log("All tiles in same group: ", selectedTiles[0].getGroup());
        selectedTiles.map((t) => {
          t.find();
          this.setColorTile(t.getId(), GroupClass.groupColorMap.get(t.getGroup())!);
        });
        this.nSelected = 0;
        this.nFound+=4;

        this.sendGameEvent(GameEvent.PLAYER_CAN_NOT_MAKE_GUESS);
        this.putFoundTilesFirst();

        // Check if won
        if(this.hasWon()){
          this.sendGameEvent(GameEvent.PLAYER_WON);
        }
      }

      // Incorrect guess
      else{
        console.log("Not all tiles in same group");
        this.unSelectAllTiles();

        this.nOfAttemptsLeft--;
        this.sendGameEvent(GameEvent.WRONG_ATTEMPT);
        
        // Check if lost
        if(this.nOfAttemptsLeft == 0){
          this.sendGameEvent(GameEvent.PLAYER_LOST);
          this.lockAllTiles();
        }
        
      }

    }
    else{
      console.log("Only " + this.nSelected + "tiles chosen. Select four please");
    }
  }

  /*trySelect(t : Tile) : boolean{
    if(this.nSelected < 4){
      this.nSelected++;
      console.log("Selected");
      console.log("Number of selected: " + this.nSelected);
      return true;
    }

    return false;

    
  }*/
}
