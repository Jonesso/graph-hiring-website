import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelationsComponent } from './relations.component';
import { TuiDataListModule, TuiScrollbarModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ProfileInfoModule } from '@shared/components/profile-info/profile-info.module';
import { FullNameModule } from '@shared/pipes/full-name/full-name.module';
import { IsBidirectionalModule } from '@shared/pipes/is-bidirectional/is-bidirectional.module';
import { RelationTypeModule } from '@shared/pipes/relation-type/relation-type.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiDataListWrapperModule,
  TuiInputDateRangeModule,
  TuiSelectModule,
  TuiSelectOptionModule,
  TuiTextAreaModule
} from '@taiga-ui/kit';
import { TuiKeysPipeModule } from '@taiga-ui/cdk';

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
    TUI_MODULES,
  ]
})
export class RelationsModule {
}
