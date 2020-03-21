import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeDe from '@angular/common/locales/de';

import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatTabsModule,
    MatToolbarModule,
    OverlayModule,
    FeaturesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
