import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { EntryService } from 'app/entry-component/EntryService';
import { MarkdownParserService } from 'app/MarkdownParserService';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [EntryService, MarkdownParserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
