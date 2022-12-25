import { Pipe, PipeTransform } from '@angular/core';
import { EditorMode } from '../editor.models';

@Pipe({
  name: 'editorModeName'
})
export class EditorModeNamePipe implements PipeTransform {

  transform(value: EditorMode) {
    switch (value) {
      case 'edit':
        return 'Editing';
      case 'preview':
        return 'Editing with preview';
      case 'readonly':
        return 'Reading';
    }
  }

}
