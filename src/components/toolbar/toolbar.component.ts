import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  constructor(public dialog: MatDialog){

  }

  openDialog(){
    const dialogRef = this.dialog.open(AboutDialogComponent, {

    })

    
  }
}
