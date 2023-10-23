import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UnicornComponent} from "./components/unicorn/unicorn.component";
import {HttpClientModule} from "@angular/common/http";
import { AppErrorComponent } from './components/app-error/app-error.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    UnicornComponent,
    AppErrorComponent,
    CreateFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
