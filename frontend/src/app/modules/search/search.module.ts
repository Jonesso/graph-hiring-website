import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from '@modules/search/search-routing.module';
import { SearchFormModule } from '@modules/search/search-form/search-form.module';
import { SearchResultModule } from '@modules/search/search-result/search-result.module';
import { TuiScrollbarModule } from '@taiga-ui/core';


@NgModule({
  declarations: [
    SearchComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SearchFormModule,
    SearchResultModule,
    TuiScrollbarModule,
  ]
})
export class SearchModule {
}
