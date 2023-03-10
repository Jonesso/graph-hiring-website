import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HeaderService} from "@modules/header/header.service";
import {NavigationEnd, Router} from "@angular/router";
import {filter, takeUntil} from "rxjs";
import {TuiDestroyService} from "@taiga-ui/cdk";

@Component({
  selector: 'gh-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class SearchComponent {

  constructor(readonly header: HeaderService,
              readonly router: Router,
              private readonly destroy$: TuiDestroyService,) {
    router.events.pipe(
      filter(e => e instanceof NavigationEnd && router.url === '/search'),
      takeUntil(this.destroy$),
    ).subscribe(() => header.setTitle('Search'));
  }

}
