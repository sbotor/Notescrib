import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkspaceBrowserService } from '../../services/workspace-browser.service';
import { BrowserDialogService } from '../../services/browser-dialog.service';
import { Subject, takeUntil } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-workspace-browser',
  templateUrl: './workspace-browser.component.html',
  styleUrls: ['./workspace-browser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceBrowserComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  public readonly folder$ = this.browserService.folder$;

  constructor(
    private readonly browserService: WorkspaceBrowserService,
    public readonly dialog: BrowserDialogService
  ) {}

  ngOnInit(): void {
    this.browserService.fetchFolderDetails().pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
