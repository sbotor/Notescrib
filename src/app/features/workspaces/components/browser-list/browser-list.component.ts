import { Component } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { NoteOverview } from 'src/app/features/notes/notes.models';
import { WorkspaceBrowserService } from '../../services/workspace-browser.service';
import { FolderInfoBase, FolderOverview } from '../../workspaces.models';
import { BrowserItem } from '../workspace-browser/workspace-browser.models';

@Component({
  selector: 'app-browser-list',
  templateUrl: './browser-list.component.html',
  styleUrls: ['./browser-list.component.scss'],
})
export class BrowserListComponent {
  public readonly folder$ = this.browserService.folder$;

  constructor(private readonly browserService: WorkspaceBrowserService) {}

  public mapChild(folder: FolderInfoBase) {
    return { id: folder.id, name: folder.name, isNote: false } as BrowserItem;
  }

  public mapNote(note: NoteOverview) {
    return { id: note.id, name: note.name, isNote: true } as BrowserItem;
  }

  public onFolderClick(folder: FolderInfoBase) {
    this.selectItem(folder.id, folder.name, false);
  }

  public onNoteClick(note: NoteOverview) {
    this.selectItem(note.id, note.name, true);
  }

  public isSelected(id: string) {
    return this.browserService.getSelectedItem()?.id === id;
  }

  private selectItem(id: string, name: string, isNote: boolean) {
    if (this.browserService.getSelectedItem()?.id === id) {
      this.browserService.selectItem(undefined);
      return;
    }

    this.browserService.selectItem({id,name,isNote
    });
  }
}
