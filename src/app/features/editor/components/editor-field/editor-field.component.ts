import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { EditorView } from '@codemirror/view';
import { EditorService } from '../../editor.service';

@Component({
  selector: 'app-editor-field',
  templateUrl: './editor-field.component.html',
  styleUrls: ['./editor-field.component.scss'],
})
export class EditorFieldComponent implements AfterViewInit, OnDestroy {

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
    this.codeMirrorView?.destroy();
  }
}
