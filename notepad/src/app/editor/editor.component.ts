import { NoteDataService } from './../services/notedata.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @ViewChild('notepad') NotePadData!: ElementRef;

  constructor(private noteDataService: NoteDataService) {

  }

  ngOnInit() {

  }

  saveNote() {
    let data = this.NotePadData.nativeElement.value
    let time = +new Date()
    this.noteDataService.saveNotes(data, time);
    this.NotePadData.nativeElement.value =''
  }

}
