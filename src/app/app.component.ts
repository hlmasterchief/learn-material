import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  board1 = {
    title: 'Todo',
    items: [
      'Learn Angular Material',
      'Code Kanban Board App',
      'Code Final Project'
    ]
  };
  board2 = {
    title: 'Doing',
    items: [
      'Learn Angular'
    ]
  };
  board3 = {
    title: 'Done',
    items: [
      'Learn HTML basic',
      'Learn CSS basic',
      'Learn Javascript basic',
      'Code Example Image Galery',
      'Learn Javascript DOM',
      'Code Example Calculator App',
      'Learn Responsive Web Design'
    ]
  };
  boards = [this.board1, this.board2, this.board3];

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
