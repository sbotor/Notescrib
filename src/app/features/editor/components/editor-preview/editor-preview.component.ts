import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { EditorService } from '../../editor.service';

@Component({
  selector: 'app-editor-preview',
  templateUrl: './editor-preview.component.html',
  styleUrls: ['./editor-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorPreviewComponent {
  public readonly content$ = this.service.renderedContent$;

  constructor(private readonly service: EditorService) {}
}
