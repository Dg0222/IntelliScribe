import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbMenuModule, NbUserModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ImagesToTextComponent } from './images-to-text/images-to-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    NbCardModule,
    NbUserModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule
  ],
  declarations: [
    PagesComponent,
    ImagesToTextComponent
  ],
})
export class PagesModule {
}
