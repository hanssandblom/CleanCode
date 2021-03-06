import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GolComponent } from './gol/gol/gol.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    GolComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
