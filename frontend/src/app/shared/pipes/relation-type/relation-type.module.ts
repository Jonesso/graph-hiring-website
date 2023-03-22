import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelationTypePipe } from './relation-type.pipe';


@NgModule({
  declarations: [
    RelationTypePipe
  ],
  exports: [
    RelationTypePipe
  ],
  imports: [
    CommonModule
  ]
})
export class RelationTypeModule {
}
