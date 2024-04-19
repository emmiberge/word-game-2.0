import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { TileComponent } from '../tile/tile.component';
import { ITile } from '../../app/types/ITile';
import { Group } from '../../app/types/group';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MatGridListModule, CommonModule, MatCardModule, TileComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  content : ITile[] = Array.from({length: 16}, (_, i) => {
    let newTile : ITile = {word: (i+1).toString(), group: Group.BLUE};
    return newTile;
  })
}
