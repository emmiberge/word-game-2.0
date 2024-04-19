import { Component, Input } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import { ITile } from '../../app/types/ITile';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [MatSlideToggleModule, MatCardModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent {
  @Input()
  content!: ITile;
  state : string = "unselected";


  switchSelect(){
    if(this.state === "unselected"){
      this.state = "selected";
    }
    else{
      this.state = "unselected";
    }
  }

  getWord(){
    return this.content.word;
  }
}
