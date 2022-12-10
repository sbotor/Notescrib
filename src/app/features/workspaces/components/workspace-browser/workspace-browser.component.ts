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

  public readonly folder$ = this.browserService.folder$;

  constructor(
    private readonly browserService: WorkspaceBrowserService,
    public readonly dialog: BrowserDialogService
  ) {}

  ngOnInit(): void {
    this.browserService.fetchFolderDetails();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
