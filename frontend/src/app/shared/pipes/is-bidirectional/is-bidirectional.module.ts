import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsBidirectionalPipe } from './is-bidirectional.pipe';


@NgModule({
  declarations: [
    IsBidirectionalPipe
  ],
  exports: [
    IsBidirectionalPipe
  ],
  imports: [
    CommonModule
  ]
})
export class IsBidirectionalModule {
}
