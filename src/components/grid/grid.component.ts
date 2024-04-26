import { Component, OnInit, ViewChild } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { TileComponent } from '../tile/tile.component';
import { Tile } from '../../model/Tile';
import { Group, GroupClass } from '../../model/Group';
import { GameGenerator } from '../../model/GameGenerator';


@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MatGridListModule, CommonModule, MatCardModule, TileComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit{

  gameGenerator! : GameGenerator;
  tiles! : Tile[] ;

  unSelectedColor : string = "green";
  selectedColor : string = "gray";

  ngOnInit(){
    this.gameGenerator = new GameGenerator();
    this.tiles = this.gameGenerator.getTiles();
    console.log("Before foreach");
    this.tiles.forEach((tile) => {
      console.log(tile.getId());
      console.log(tile.getWord());
    })
  }

  // Not good, should set id regardless of index
  colorArr : string[] = Array.from({length: 16}, (_, i) => {
    return this.unSelectedColor;
  });

  setColorTile(id :string, color : string){
    this.colorArr[Number(id)] = color;
  }

  getColorTile(id : string){
    return this.colorArr[Number(id)];
  }

 





  selected : Tile[] = [];
  nSelected : number = 0;

  trySelect(id: string){
    console.log("Called trySelect");
    var t : Tile = this.tiles.filter(t => t.getId() === id)[0];

    console.log("id:" + t.getId());
    console.log("Can be selected:" + t.getCanBeSelected());
    console.log("nSelected:" + this.nSelected);

    if(t.getIsSelected()){
      console.log("Unselected tile with id ", t.getId());
      t.deselect();
      this.nSelected--;
      this.setColorTile(id, this.unSelectedColor);
      console.log("nSelected:" + this.nSelected);
      return;
    }

    else if(t.getCanBeSelected() && this.nSelected < 4){
      console.log("Select succeeded");
      this.nSelected++;
      console.log("nSelected:" + this.nSelected);
      t.select();
      this.setColorTile(id, this.selectedColor);
      return;
    }
  }



  submitTiles(){
    if(this.nSelected == 4){
      var selectedTiles : Tile[] = this.tiles.filter(t => t.getIsSelected());
      
      console.log("Tiles selected:");
      selectedTiles.forEach(tile => {
        console.log(tile.getId());
      });

      console.log("N of selected tiles: " + this.nSelected);
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
      }

      // Incorrect guess
      else{
        console.log("Not all tiles in same group");
        selectedTiles.forEach(t => console.log("Tile " + t.getId() + ", Group:" + t.getGroup()));
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
