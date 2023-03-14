import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFormComponent } from './profile-form.component';
import {
  TuiDataListWrapperModule,
  TuiInputPhoneModule,
  TuiInputSliderModule,
  TuiInputTagModule,
  TuiIslandModule,
  TuiMultiSelectModule,
  TuiRadioBlockModule,
  TuiTextAreaModule
} from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiGroupModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ProfileInfoModule } from '@shared/components/profile-info/profile-info.module';
import { FullNameModule } from '@shared/pipes/full-name/full-name.module';
import { TuiLetModule } from '@taiga-ui/cdk';

const TUI_MODULES = [
  TuiIslandModule,
  TuiMultiSelectModule,
  TuiTextfieldControllerModule,
  TuiDataListWrapperModule,
  TuiRadioBlockModule,
  TuiGroupModule,
  TuiInputSliderModule,
  TuiButtonModule,
  TuiInputTagModule,
  TuiInputPhoneModule,
  TuiTextAreaModule,
];

@NgModule({
  declarations: [
    ProfileFormComponent
  ],
  exports: [
    ProfileFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileInfoModule,
    TUI_MODULES,
    FullNameModule,
    TuiLetModule,
  ]
})
export class ProfileFormModule {
}
