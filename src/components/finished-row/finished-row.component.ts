import { Component, Input } from '@angular/core';
import { WordCollection } from '../../model/GameGenerator';
import { CommonModule } from '@angular/common';
import { Group, GroupClass } from '../../model/Group';

@Component({
  selector: 'app-finished-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finished-row.component.html',
  styleUrl: './finished-row.component.css'
})

// Displays the words of a group after player makes a correct guess
export class FinishedRowComponent {

  @Input() correctGuesses : WordCollection[] = [];


  constructor(){
    
  }

  groupColor = (group : Group) => GroupClass.groupColorMap.get(group)!;

  // ["BLUEBERRY", "RASPBERRY", "STRAWBERRY", "BLACKBERRY"] =>
  // BLUEBERRY, RASPBERRY, STRAWBERRY, BLACKBERRY
  formatWCWords(words : string[]) : string{
    const copy = [...words];
    return copy.toString().replace(/,/g, ', ');
  }

}
