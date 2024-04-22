import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { TileComponent } from '../tile/tile.component';
import { Tile } from '../../app/types/Tile';
import { Group } from '../../app/types/group';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MatButtonModule, MatGridListModule, CommonModule, MatCardModule, TileComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  tiles : Tile[] = Array.from({length: 16}, (_, i) => {
    let newTile : Tile = new Tile((i+1).toString(), i % 2 == 0 ? Group.BLUE : Group.GREEN, (i+1).toString());
    return newTile;
  })


  selected : Tile[] = [];
  nSelected : number = 0;

  trySelect(tName: string){
    console.log("Called trySelect");
    var t : Tile = this.tiles.filter(t => t.getId() === tName)[0];

    console.log("id:" + t.getId());
    console.log("Can be selected:" + t.getCanBeSelected());
    console.log("nSelected:" + this.nSelected);

    if(t.getIsSelected()){
      console.log("Unselected tile with id ", t.getId());
      t.deselect();
      this.nSelected--;
      console.log("nSelected:" + this.nSelected);
      return;
    }

    else if(t.getCanBeSelected() && this.nSelected < 4){
      console.log("Select succeeded");
      this.nSelected++;
      console.log("nSelected:" + this.nSelected);
      t.select();
      return;
    }
  }

  submitTiles(){
    if(this.nSelected == 4){
      var selectedTiles : Tile[] = this.tiles.filter(t => t.getIsSelected());
      if(selectedTiles.every(tile => {
        return tile.getGroup() == selectedTiles[0].getGroup();
      })){
        console.log("All tiles in same group: ", selectedTiles[0].getGroup());
      }
      else{
        console.log("Not all tiles in same group");
        selectedTiles.forEach(t => console.log("Tile " + t.getId() + ", Group:" + t.getGroup()));
      }

    }
    else{
      console.log("Only " + this.nSelected + "tiles chosen. Select four");
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
