import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WorkspaceBrowserService } from '../../services/workspace-browser.service';
import { BrowserDialogService } from '../../services/browser-dialog.service';
import NavigationInfo from './navigation-info';

@Component({
  selector: 'app-workspace-browser',
  templateUrl: './workspace-browser.component.html',
  styleUrls: ['./workspace-browser.component.scss'],
})
export class WorkspaceBrowserComponent implements OnInit, OnDestroy {
  private readonly subs = new Subscription();
  private workspaceId = '';

  public readonly workspace$ = this.browserService.workspace$;
  public readonly items$ = this.browserService.currentItems$;

  public readonly navInfo: NavigationInfo;

  constructor(
    route: ActivatedRoute,
    private readonly browserService: WorkspaceBrowserService,
    public readonly dialog: BrowserDialogService
  ) {
    this.subs.add(
      route.paramMap.subscribe((x) => {
        this.workspaceId = x.get('id') ?? '';
        this.browserService.fetchWorkspaceDetails(this.workspaceId);
      })
    );

    this.navInfo = this.browserService.getNavInfo();
  }

  ngOnInit(): void {
    this.browserService.selectItem(undefined);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public handleContainerClick(event: MouseEvent) {
    if (event.target instanceof Element) {
      const element = <Element>event.target;
      if (element.id === 'items-container') {
        this.browserService.selectItem(undefined);
      }
    }
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
