import { Component, ViewChild } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { TileComponent } from '../tile/tile.component';
import { Tile } from '../../types/Tile';
import { Group, GroupClass } from '../../types/Group';


@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MatGridListModule, CommonModule, MatCardModule, TileComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  tiles : Tile[] = Array.from({length: 16}, (_, i) => {
    let newTile : Tile = new Tile((i).toString(), i % 2 == 0 ? Group.BLUE : Group.YELLOW, (i).toString());
    return newTile;
  });

  unSelectedColor : string = "green";
  selectedColor : string = "gray";

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
