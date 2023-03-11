import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IUserDto} from "@shared/types/user/user.dto.interface";
import {TUI_ARROW} from "@taiga-ui/kit";
import {AuthService} from "@core/services/auth/auth.service";

@Component({
  selector: 'gh-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  @Input() user!: IUserDto;

  readonly arrow = TUI_ARROW;
  readonly defaultAvatarUrl = 'assets/default-user-avatar.svg';

  constructor(public readonly auth: AuthService) {
  }

}
