import { Component } from '@angular/core';
import { BrowserDialogService } from '../../services/browser-dialog.service';
import { WorkspaceBrowserService } from '../../services/workspace-browser.service';

@Component({
  selector: 'app-browser-list',
  templateUrl: './browser-list.component.html',
  styleUrls: ['./browser-list.component.scss'],
})
export class BrowserListComponent {
  public readonly folder$ = this.browserService.folder$;

  constructor(
    private readonly browserService: WorkspaceBrowserService,
    public readonly dialog: BrowserDialogService
  ) {}

  public navigateDown(id: string) {
    this.browserService.navigateDown(id);
  }
}
