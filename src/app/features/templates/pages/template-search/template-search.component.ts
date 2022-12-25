import { Component } from '@angular/core';
import { NoteTemplateOverview } from '../../templates.models';
import { Router } from '@angular/router';
import { routeConfig } from 'src/app/route-config';

@Component({
  selector: 'app-template-search',
  templateUrl: './template-search.component.html',
  styleUrls: ['./template-search.component.scss']
})
export class TemplateSearchComponent {


  constructor(
    private readonly router: Router
  ) {}

  public onTemplateSelect(template: NoteTemplateOverview) {
    this.router.navigate(['/', routeConfig.templates.prefix, template.id]);
  }
}
