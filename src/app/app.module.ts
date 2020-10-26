import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthComponent } from './auth/auth.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    AuthComponent,
  ],
  imports: [BrowserModule, AppRoutingModule,PagesModule,AuthModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
