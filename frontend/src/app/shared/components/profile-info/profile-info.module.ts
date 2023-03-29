import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './profile-info.component';
import {
  TuiAvatarModule,
  TuiBadgeModule,
  TuiInputFilesModule,
  TuiInputModule,
  TuiInputNumberModule
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiPrimitiveTextfieldModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularCropperjsModule } from 'angular-cropperjs';

const TUI_MODULES = [
  TuiAvatarModule,
  TuiSvgModule,
  TuiInputModule,
  TuiTextfieldControllerModule,
  TuiInputNumberModule,
  TuiCurrencyPipeModule,
  TuiPrimitiveTextfieldModule,
  TuiBadgeModule,
  TuiButtonModule,
  TuiInputFilesModule,
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
    ReactiveFormsModule,
    AngularCropperjsModule,
    TUI_MODULES,
  ]
})
export class ProfileInfoModule {
}
