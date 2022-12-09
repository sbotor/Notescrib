import { Component, Input } from '@angular/core';
import { BrowserDialogService } from '../../services/browser-dialog.service';
import { WorkspaceBrowserService } from '../../services/workspace-browser.service';
import { FolderDetails } from '../../workspaces.models';
import NavigationInfo from '../workspace-browser/navigation-info';

@Component({
  selector: 'app-browser-toolbar',
  templateUrl: './browser-toolbar.component.html',
  styleUrls: ['./browser-toolbar.component.scss'],
})
export class BrowserToolbarComponent {
  @Input()
  public folder?: FolderDetails;

  public readonly navInfo: NavigationInfo;

  constructor(
    private readonly browserService: WorkspaceBrowserService,
    public readonly dialog: BrowserDialogService
  ) {
    this.navInfo = browserService.getNavInfo();
  }

  public isItemSelected() {
    return !!this.browserService.getSelectedItem();
  }

  public formatPath() {
    return this.navInfo.getCurrentPath() ?? 'Notes';
  }

  public navigateUp() {
    this.browserService.navigateUp();
  }
}
