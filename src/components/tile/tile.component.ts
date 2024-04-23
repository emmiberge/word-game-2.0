import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import { Tile } from '../../app/types/Tile';
import { GridComponent } from '../grid/grid.component';
import { tileState } from '../../app/types/tileState';
import { GroupClass } from '../../app/types/group';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [MatSlideToggleModule, MatCardModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent implements OnInit{
  @Input() content!: Tile;
  color!: string;

  @Output() taskNameEvent = new EventEmitter<string>();

  ngOnInit(){
    this.setColor();
  }

  trySelect() {
      this.taskNameEvent.emit(this.content.getId());
      this.setColor();
  }

  setColor() : void{
    console.log("Should set color");
    if(this.content.getIsFound()){
      this.color = GroupClass.groupColorMap.get(this.content.getGroup())!;
    }
    else if(this.content.getIsSelected()){
      this.color = 'orange';
    }
    else{
      this.color = 'green';
    }
  }



  getWord(){
    return this.content.getWord();
  }
}
