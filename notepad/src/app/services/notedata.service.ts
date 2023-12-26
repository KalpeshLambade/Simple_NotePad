import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteDataService {
  private notesChanged = new Subject<void>();

  notes: Array<{ id: number; data: string; time: number; deleteStamp?: number }> = [
    {
      id: 1,
      data: 'testData',
      time: 12,
    },
  ];

  getNotesChanged() {
    return this.notesChanged.asObservable();
  }

  saveNotes(data: string, time: number) {
    let newId = this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1;
    this.notes.push({ id: newId, data, time });
    this.notesChanged.next(); // Emit change
  }

  deleteNotes(id: number, time: number) {
    this.notes[id].deleteStamp = time;
    this.notesChanged.next(); // Emit change
  }
}
