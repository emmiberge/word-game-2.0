import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { TileComponent } from '../tile/tile.component';
import { Tile } from '../../model/Tile';
import { Group, GroupClass } from '../../model/Group';
import { GameGenerator } from '../../model/GameGenerator';
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
export class GridComponent implements OnInit{

  tiles! : Tile[] ;
  unSelectedColor : string = "rgb(254 254 248)";
  selectedColor : string = "gray";
  nSelected : number = 0;
  nFound : number = 0;
  nOftotalTiles : number = 16;
  nOfAttemptsLeft : number = 4;
  allTilesFound : boolean = false;

  @Output() taskNameEvent = new EventEmitter<GameEvent>();



  ngOnInit(){
    this.tiles = new GameGenerator().getTiles();
    console.log("Before foreach");
    this.tiles.forEach((tile) => {
      console.log(tile.getId());
      console.log(tile.getWord());
    })
    this.sendGameEvent(GameEvent.PLAYER_CAN_NOT_MAKE_GUESS);
  }

  // Not good, should set id regardless of index
  colorArr : string[] = Array.from({length: this.nOftotalTiles}, (_, i) => {
    return this.unSelectedColor;
  });

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

    this.tiles.forEach(t => {
      if(t.getIsFound()){
        foundTiles.push(t);
      }
      else{
        unknownTiles.push(t);
      }
    })

    this.tiles = foundTiles.concat(unknownTiles);
  }



  // Send to parent to let it know that the game is won or lost
  sendGameEvent(event : GameEvent){
    this.taskNameEvent.emit(event);
  }

 

 
  // Called when tile is chosen
  trySelect(id: string){
    console.log("Called trySelect");
    var t : Tile = this.tiles.filter(t => t.getId() === id)[0];

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
  }


  


  // Prevent all tiles to be selected
  // Call when player lost
  lockAllTiles(){
    this.tiles.map(tile => {
      tile.lock();
    })
  }

  // -------------- GLOBAL -----------------

  // Called when player wants to shuffle
  shuffleTiles(){
    const foundTiles : Tile[] = [];
    var unknownTiles : Tile[] = [];

    this.tiles.forEach(t => {
      if(t.getIsFound()){
        foundTiles.push(t);
      }
      else{
        unknownTiles.push(t);
      }
    })

    unknownTiles = ShufflingService.shuffle(unknownTiles);
    this.tiles = foundTiles.concat(unknownTiles);
  }
  


  // Called when player makes guess
  submitTiles(){
    if(this.nSelected == 4 && this.nOfAttemptsLeft > 0){
      var selectedTiles : Tile[] = this.tiles.filter(t => t.getIsSelected());
      
      console.log("Tiles selected:");
      selectedTiles.forEach(tile => {
        console.log(tile.getId());
      });


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
        selectedTiles.forEach(t => {
          console.log("Tile " + t.getId() + ", Group:" + t.getGroup());
          this.unselectTile(t);
        })

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
