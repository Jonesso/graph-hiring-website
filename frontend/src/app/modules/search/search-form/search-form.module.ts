import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchFormComponent} from "./search-form.component";
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiGroupModule,
  TuiHintModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputRangeModule,
  TuiInputSliderModule,
  TuiMultiSelectModule,
  TuiRadioBlockModule,
  TuiSelectModule
} from "@taiga-ui/kit";


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
  ]
})
export class SearchFormModule {
}
