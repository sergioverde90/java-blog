import { Component } from '@angular/core';
import {Entry} from 'app/entry-component/Entry';
import { OnInit } from '@angular/core';
import {EntryService} from 'app/entry-component/EntryService';
import { MarkdownParserService } from 'app/MarkdownParserService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    entries : Entry[];

    constructor(
      private entryService : EntryService,
      private parser       : MarkdownParserService)
    { }

    ngOnInit(): void {
      this.entryService.fromJSON().
      subscribe(entries => {
        this.entries = entries;
        for(let entry in this.entries){
          let parsed = this.parser.convert(this.entries[entry].content);
          this.entries[entry].content = parsed;
        }
      });
    }
}
