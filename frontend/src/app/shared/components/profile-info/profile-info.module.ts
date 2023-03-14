import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './profile-info.component';
import { TuiAvatarModule, TuiBadgeModule, TuiInputModule, TuiInputNumberModule } from '@taiga-ui/kit';
import { TuiPrimitiveTextfieldModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';
import { ReactiveFormsModule } from '@angular/forms';

const TUI_MODULES = [
  TuiAvatarModule,
  TuiSvgModule,
  TuiInputModule,
  TuiTextfieldControllerModule,
  TuiInputNumberModule,
  TuiCurrencyPipeModule,
];

@NgModule({
  declarations: [
    ProfileInfoComponent
  ],
  exports: [
    ProfileInfoComponent
  ],
  imports: [
    CommonModule,
    TUI_MODULES,
    ReactiveFormsModule,
    TuiPrimitiveTextfieldModule,
    TuiBadgeModule,
  ]
})
export class ProfileInfoModule {
}
