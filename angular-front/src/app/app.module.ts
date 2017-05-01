import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';
import { AppComponent } from './app.component';
import { EntryService } from 'app/entry-component/EntryService';
import { MarkdownParserService } from 'app/MarkdownParserService';
import { MarkdownModule } from 'angular2-markdown';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // MarkdownToHtmlModule.forRoot(),
    MarkdownModule.forRoot(),
    FormsModule,
    HttpModule
  ],
  providers: [EntryService, MarkdownParserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
