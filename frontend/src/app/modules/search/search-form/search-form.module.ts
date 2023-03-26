import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from './search-form.component';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiGroupModule,
  TuiHintModule,
  TuiScrollbarModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputRangeModule,
  TuiInputSliderModule,
  TuiMultiSelectModule,
  TuiRadioBlockModule,
  TuiSelectModule,
  TuiSliderModule
} from '@taiga-ui/kit';
import { RelationTypeModule } from '@shared/pipes/relation-type/relation-type.module';


const TUI_MODULES = [
  TuiButtonModule,
  TuiHintModule,
  TuiTextfieldControllerModule,
  TuiErrorModule,
  TuiInputSliderModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiSelectModule,
  TuiDataListWrapperModule,
  TuiGroupModule,
  TuiRadioBlockModule,
  TuiDataListModule,
  TuiMultiSelectModule,
  TuiInputRangeModule,
  TuiScrollbarModule,
];

@NgModule({
  declarations: [
    SearchFormComponent
  ],
  exports: [
    SearchFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TUI_MODULES,
    TuiSliderModule,
    RelationTypeModule,
  ]
})
export class SearchFormModule {
}
