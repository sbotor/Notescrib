import {
  AfterViewInit,
  Component,
  OnDestroy,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
})
export class NoteEditorComponent implements AfterViewInit, OnDestroy {
  private readonly subs = new Subscription();
  private noteId = '';

  public readonly options = {
    mode: 'gfm',
  }

  public content = '';

  constructor(route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.subs.add(
      route.paramMap.subscribe((x) => {
        this.noteId = x.get('id') ?? '';
      })
    );
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
