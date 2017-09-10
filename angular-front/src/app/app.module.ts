import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { EntryService } from 'app/entry-component/EntryService';
import { MarkdownParserService } from 'app/MarkdownParserService';
import { EntryComponent } from 'app/entry-component/entry.component';
import { EntriesComponent } from 'app/entries-component/app.entries.component';

const appRoutes: Routes = [
  { path: 'entry/:id', component: EntryComponent },
  { path: 'entries', component: EntriesComponent },
  { path: '', redirectTo: '/entries', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    EntriesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: true } /*, { enableTracing: true }*/) // uncomment for debug purpose only
  ],
  providers: [EntryService, MarkdownParserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
