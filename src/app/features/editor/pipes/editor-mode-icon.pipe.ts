import { Pipe, PipeTransform } from '@angular/core';
import { EditorMode } from '../editor.models';

@Pipe({
  name: 'editorModeIcon'
})
export class EditorModeIconPipe implements PipeTransform {

  transform(value: EditorMode) {
    switch (value) {
      case 'edit':
        return 'edit';
      case 'preview':
        return 'vertical_split';
      case 'readonly':
        return 'visibility';
    }
  }

}
