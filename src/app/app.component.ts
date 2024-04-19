import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TileComponent } from '../components/tile/tile.component';
import { GridComponent } from '../components/grid/grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'word-game';
}
