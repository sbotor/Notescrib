import { Component, Input, OnInit } from '@angular/core';
import { BrowserDialogService } from '../../services/browser-dialog.service';
import { WorkspaceBrowserService } from '../../services/workspace-browser.service';
import { WorkspaceDetails } from '../../workspaces.models';
import NavigationInfo from '../workspace-browser/navigation-info';

@Component({
  selector: 'app-browser-toolbar',
  templateUrl: './browser-toolbar.component.html',
  styleUrls: ['./browser-toolbar.component.scss'],
})
export class BrowserToolbarComponent {
  @Input()
  public workspace?: WorkspaceDetails;

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

  public formatPath(rootName: string) {
    const path = this.navInfo.getCurrentPath();
    return path ? `${rootName}/${path}` : rootName;
  }

  public navigateUp() {
    this.browserService.navigateUp();
  }
}
