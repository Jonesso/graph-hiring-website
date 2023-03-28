import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelationsComponent } from './relations.component';
import { TuiDataListModule, TuiErrorModule, TuiScrollbarModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ProfileInfoModule } from '@shared/components/profile-info/profile-info.module';
import { FullNameModule } from '@shared/pipes/full-name/full-name.module';
import { IsBidirectionalModule } from '@shared/pipes/is-bidirectional/is-bidirectional.module';
import { RelationTypeModule } from '@shared/pipes/relation-type/relation-type.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputDateRangeModule,
  TuiSelectModule,
  TuiSelectOptionModule,
  TuiTextAreaModule
} from '@taiga-ui/kit';
import { TuiKeysPipeModule } from '@taiga-ui/cdk';
import { CdkScrollableModule } from '@angular/cdk/scrolling';

const TUI_MODULES = [
  TuiScrollbarModule,
  TuiSelectModule,
  TuiDataListWrapperModule,
  TuiKeysPipeModule,
  TuiDataListModule,
  TuiSelectOptionModule,
  TuiInputDateRangeModule,
  TuiTextfieldControllerModule,
  TuiTextAreaModule,
  TuiErrorModule,
  TuiFieldErrorPipeModule,
];

@NgModule({
  declarations: [
    RelationsComponent
  ],
  exports: [
    RelationsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileInfoModule,
    FullNameModule,
    IsBidirectionalModule,
    RelationTypeModule,
    CdkScrollableModule,
    TUI_MODULES,
  ]
})
export class RelationsModule {
}
