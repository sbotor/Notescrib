import { Component, OnInit } from '@angular/core';
import { paths } from '../app-routing.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public loginPath = paths.login;
}
