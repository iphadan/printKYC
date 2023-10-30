import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AmharicComponent } from './amharic/amharic.component';
import { EnglishComponent } from './english/english.component';
import { OromicComponent } from './oromic/oromic.component';


@NgModule({
  declarations: [
    AppComponent,
    AmharicComponent,
    EnglishComponent,
    OromicComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
