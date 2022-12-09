import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkspaceBrowserService } from '../../services/workspace-browser.service';
import { BrowserDialogService } from '../../services/browser-dialog.service';

@Component({
  selector: 'app-workspace-browser',
  templateUrl: './workspace-browser.component.html',
  styleUrls: ['./workspace-browser.component.scss'],
})
export class WorkspaceBrowserComponent implements OnInit, OnDestroy {
  private readonly subs = new Subscription();

  public readonly workspace$ = this.browserService.workspace$;
  public readonly folders$ = this.browserService.folders$;
  public readonly notes$ = this.browserService.notes$;

  constructor(
    private readonly browserService: WorkspaceBrowserService,
    public readonly dialog: BrowserDialogService
  ) {}

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
}
