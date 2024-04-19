import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import { Tile } from '../../app/types/Tile';
import { GridComponent } from '../grid/grid.component';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [MatSlideToggleModule, MatCardModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent {
  @Input()
  content!: Tile;
  state : string = "unselected";
  canBeSelected : boolean = true;

  @Output() taskNameEvent = new EventEmitter<string>();

  trySelect() {
      this.taskNameEvent.emit(this.content.getId());
      this.updateState();
  }

  updateState(){
    if(this.content.getIsSelected()){
      this.state = "selected";
    }
    else{
      this.state = "unselected";
    }
  }



  getWord(){
    return this.content.getWord();
  }
}
