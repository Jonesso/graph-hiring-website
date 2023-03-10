import {Component} from '@angular/core';
import {HeaderService} from "@modules/header/header.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(public readonly header: HeaderService) {
  }
}
