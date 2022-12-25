import { Component } from '@angular/core';
import { EditorService } from '../../editor.service';

@Component({
  selector: 'app-preview-editor',
  templateUrl: './preview-editor.component.html',
  styleUrls: ['./preview-editor.component.scss']
})
export class PreviewEditorComponent {

  constructor(private readonly editorService: EditorService) {
  }

  public getMode() {
    return this.editorService.getMode();
  }
}
