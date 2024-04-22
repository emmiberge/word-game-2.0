import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TileComponent } from '../components/tile/tile.component';
import { GridComponent } from '../components/grid/grid.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, RouterOutlet, GridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'word-game';

  @ViewChild(GridComponent) GridComponent: any;

  submitChoice(){
    this.GridComponent.submitTiles();
  }
}
