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
        for(let entry in this.entries){
          this.entries[entry].content = this.toMarkdown( this.entries[entry].content);
        }
      });
    }

    /**
     * helper function to parse raw data to markdown
     */
    toMarkdown(data : string) : string {
      return this.parser.convert(data);
    }
}
