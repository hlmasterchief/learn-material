import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  board1: Board = {
    title: 'Todo',
    items: [
      'Learn Angular Material',
      'Code Kanban Board App',
      'Code Final Project'
    ]
  };
  board2: Board = {
    title: 'Doing',
    items: [
      'Learn Angular'
    ]
  };
  board3: Board = {
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
  boards: Board[];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (!this.getBoards() || !this.getBoards().length) {
      this.setBoards([this.board1, this.board2, this.board3]);
    }
    this.boards = this.getBoards();
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.setBoards(this.boards);
  }

  addBoard(inputTitle: HTMLInputElement): void {
    const title = inputTitle.value.trim();
    inputTitle.value = '';
    if (!title.length) {
      return this.openNotification('Cannot enter empty or whitespace only string!');
    }
    const board = { title, items: [] };
    this.boards.push(board);
    this.setBoards(this.boards);
  }

  addTask(indexBoard: number, inputTask: HTMLInputElement): void {
    const task = inputTask.value.trim();
    inputTask.value = '';
    if (!task.length) {
      return this.openNotification('Cannot enter empty or whitespace only string!');
    }
    this.boards[indexBoard].items.push(task);
    this.setBoards(this.boards);
  }

  delBoard(indexBoard: number): void {
    this.openDialog().subscribe(result => {
      if (result) {
        this.boards.splice(indexBoard, 1);
        this.setBoards(this.boards);
      }
    });
  }

  delTask(indexBoard: number, indexTask: number): void {
    this.openDialog().subscribe(result => {
      if (result) {
        this.boards[indexBoard].items.splice(indexTask, 1);
        this.setBoards(this.boards);
      }
    });
  }

  openDialog(): Observable<boolean> {
    return this.dialog.open(AppDialogComponent).afterClosed();
  }

  openNotification(message: string): void {
    this.snackBar.open(message, null, {
      duration: 2000
    });
  }

  setBoards(boards: Board[]): void {
    localStorage.setItem('boards', JSON.stringify(boards));
  }

  getBoards(): Board[] {
    return JSON.parse(localStorage.getItem('boards'));
  }
}

@Component({
  selector: 'app-root-dialog',
  template: `
    <h1 mat-dialog-title>Delete</h1>
    <div mat-dialog-content>Are you sure to remove this item?</div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Delete</button>
    </div>
  `
})
export class AppDialogComponent {}

interface Board {
  title: string;
  items: string[];
}
