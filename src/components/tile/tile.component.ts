import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import { Tile } from '../../app/types/Tile';
import { GridComponent } from '../grid/grid.component';
import { tileState } from '../../app/types/tileState';
import { GroupClass } from '../../app/types/group';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [MatSlideToggleModule, MatCardModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent{
  @Input() content!: Tile;

  @Output() taskNameEvent = new EventEmitter<string>();



  trySelect() {
      this.taskNameEvent.emit(this.content.getId());

  }

  getColor() : string{
    console.log("Should set color");
    if(this.content.getIsFound()){
      return GroupClass.groupColorMap.get(this.content.getGroup())!;
    }
    else if(this.content.getIsSelected()){
      return 'orange';
    }
    else{
      return 'green';
    }
  }



  getWord(){
    return this.content.getWord();
  }
}


/*import { from } from  'rxjs';
const vowels$ = from(['a', 'e', 'i', 'o', 'u']);

vowels$.subscribe({  
  next: x => console.log('The next vowel is: ', x),  
  error: err => console.error('An error occurred', err),  
  complete: () => console.log('There are no more vowels.')  
});
*/