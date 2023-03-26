import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderService } from '@modules/header/header.service';
import { RelationRequestType } from '@modules/requests/relation-request-type.enum';

@Component({
  selector: 'gh-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsComponent {
  readonly RelationRequestType = RelationRequestType;

  constructor(private readonly header: HeaderService) {
    header.setTitle('Relation requests');
  }

}
