import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { GolComponent } from './gol/gol/gol.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   { path: '', component: GolComponent },
   { path: 'gol', component: GolComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
