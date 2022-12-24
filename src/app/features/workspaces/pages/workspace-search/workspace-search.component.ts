import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NoteOverview } from 'src/app/features/notes/notes.models';
import { routeConfig } from 'src/app/route-config';

@Component({
  selector: 'app-workspace-search',
  templateUrl: './workspace-search.component.html',
  styleUrls: ['./workspace-search.component.scss'],
})
export class WorkspaceSearchComponent {

  constructor(
    private readonly router: Router
  ) {}

  public onNoteSelect(note: NoteOverview) {
    this.router.navigate(['/', routeConfig.notes.prefix, note.id]);
  }
}
