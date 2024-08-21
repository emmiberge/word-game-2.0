import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import { Tile } from '../../model/Tile';
import { GridComponent } from '../grid/grid.component';
import { tileState } from '../../types/tileState';
import { GroupClass } from '../../model/Group';
import { Observable } from 'rxjs';



// A tile displayed in the grid of words
@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [MatSlideToggleModule, MatCardModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent implements OnInit{
  @Input() color! : string;
  @Input() word! : string;
  @Input() id! : string;


  @Output() taskSelect = new EventEmitter<string>();



  trySelect() {
    this.taskSelect.emit(this.id);
  }

  ngOnInit(){

  }


}


