import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { BrowserItem } from '../workspace-browser/workspace-browser.models';
import { WorkspaceBrowserService } from '../../services/workspace-browser.service';
import { fromEvent, merge, debounceTime, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browser-tile',
  templateUrl: './browser-tile.component.html',
  styleUrls: ['./browser-tile.component.scss'],
})
export class BrowserTileComponent implements AfterViewInit, OnDestroy {
  private clicksSub!: Subscription;

  @Input()
  public item?: BrowserItem;

  constructor(
    private readonly hostRef: ElementRef,
    private readonly browserService: WorkspaceBrowserService,
    private readonly router: Router
  ) {}

  ngAfterViewInit(): void {
    this.clicksSub = this.setupClicks();
  }

  ngOnDestroy(): void {
    this.clicksSub?.unsubscribe();
  }

  public getClass() {
    const selectedId = this.browserService.getSelectedItem()?.id;
    return selectedId && selectedId === this.item?.id
      ? 'browser-item-button selected-item'
      : 'browser-item-button';
  }

  public getIcon() {
    return this.item?.isNote ? 'insert_drive_file' : 'folder';
  }

  private handleClick() {
    const selectedId = this.browserService.getSelectedItem()?.id;
    if (selectedId && selectedId === this.item?.id) {
      this.browserService.selectItem(undefined);
      return;
    }

    this.browserService.selectItem(this.item);
  }

  private handleDoubleClick() {
    if (!this.item) {
      return;
    }

    if (!this.item.isNote) {
      this.browserService.navigateDown(this.item.id);
    } else {
      this.router.navigate(['note', this.item.id]);
    }
  }

  private setupClicks() {
    const el = this.hostRef.nativeElement;
    const click = fromEvent<MouseEvent>(el, 'click');
    const doubleClick = fromEvent<MouseEvent>(el, 'dblclick');

    return merge(click, doubleClick)
      .pipe(debounceTime(100))
      .subscribe((x) => {
        switch (x.type) {
          case 'click':
            this.handleClick();
            break;
          case 'dblclick':
            this.handleDoubleClick();
            break;
        }
      });
  }
}
