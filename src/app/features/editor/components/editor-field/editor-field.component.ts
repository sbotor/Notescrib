import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { EditorService } from '../../editor.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-editor-field',
  templateUrl: './editor-field.component.html',
  styleUrls: ['./editor-field.component.scss'],
})
export class EditorFieldComponent implements AfterViewInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  @ViewChild('codeMirror', { static: false })
  public codeMirrorRef!: ElementRef<HTMLDivElement>;

  private codeMirrorView?: EditorView;

  constructor(private readonly service: EditorService) {}

  ngAfterViewInit(): void {
    this.codeMirrorView = new EditorView({
      parent: this.codeMirrorRef.nativeElement,
      state: this.service.getCodeMirrorState(),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
