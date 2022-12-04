import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements OnInit, OnDestroy {

  private readonly subs = new Subscription();

  private noteId = '';

  constructor(route: ActivatedRoute) {
    this.subs.add(route.paramMap.subscribe(x => {
      this.noteId = x.get('id') ?? '';
    }))
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
