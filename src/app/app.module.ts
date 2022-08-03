import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent, DialogOverviewExampleDialog } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpClientModule } from '@angular/common/http';

import { MaterialExampleModule } from '../material.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';



@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, MaterialExampleModule, HttpClientModule],
  declarations: [AppComponent, HelloComponent, DialogOverviewExampleDialog],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
