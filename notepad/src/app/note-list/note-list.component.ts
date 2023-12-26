import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoteDataService } from '../services/notedata.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
})
export class NoteListComponent implements OnInit, OnDestroy {
  viewNoteList: Array<{ id: number; data: string; time: number; deleteStamp?: number }> = [];
  private notesChangedSubscription!: Subscription;

  constructor(private noteDataService: NoteDataService) {}

  ngOnInit() {
    this.viewNoteList = this.noteDataService.notes;
    // console.log(this.viewNoteList);

    this.notesChangedSubscription = this.noteDataService.getNotesChanged().subscribe(() => {
      this.viewNoteList = this.noteDataService.notes.filter((data) => !data.deleteStamp);
    });
  }

  ngOnDestroy() {
    this.notesChangedSubscription.unsubscribe();
  }

  deleteNote(id: number) {
    let time = +new Date();
    this.noteDataService.deleteNotes(id, time);
  }
}
