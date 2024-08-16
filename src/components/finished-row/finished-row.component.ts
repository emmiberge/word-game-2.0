import { Component, Input } from '@angular/core';
import { WordCollection } from '../../model/GameGenerator';

@Component({
  selector: 'app-finished-row',
  standalone: true,
  imports: [],
  templateUrl: './finished-row.component.html',
  styleUrl: './finished-row.component.css'
})
export class FinishedRowComponent {
  @Input() color! : string;
  @Input() word_explanation! : WordCollection;


}
