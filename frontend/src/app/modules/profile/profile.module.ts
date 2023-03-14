import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { SearchResultModule } from '@modules/search/search-result/search-result.module';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { ProfileFormModule } from '@modules/profile/profile-form/profile-form.module';
import { ProfileRoutingModule } from '@modules/profile/profile-routing.module';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SearchResultModule,
    ProfileFormModule,
    TuiScrollbarModule,
  ]
})
export class ProfileModule {
}
