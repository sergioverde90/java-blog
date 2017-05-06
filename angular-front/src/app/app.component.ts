import { Component, ViewChildren, ElementRef } from '@angular/core';
import { Entry } from 'app/entry-component/Entry';
import { OnInit } from '@angular/core';
import { EntryService } from 'app/entry-component/EntryService';
import { MarkdownParserService } from 'app/MarkdownParserService';

declare var hljs: any;

@Component({
  selector: 'app-root',
  templateUrl : './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    entries : Entry[];

    constructor(
      private entryService : EntryService,
      private parser       : MarkdownParserService,
      private elementRef: ElementRef)
    { }

    ngOnInit(): void {
      this.entryService.fromJSON().
      subscribe(entries => {
        this.entries = entries;
        this.toMarkdown();
      });
    }

    toMarkdown() {
      for(let entry in this.entries){
        let parsed = this.parser.convert(this.entries[entry].content);
        this.entries[entry].content = parsed;
      }
    }
}
