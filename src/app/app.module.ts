import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { SafePipe } from './pipes/safe.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    MenuLateralComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
