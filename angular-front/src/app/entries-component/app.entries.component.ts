import { Component, ViewChildren, ElementRef, OnInit } from '@angular/core';
import { EntryService } from 'app/entry-component/EntryService';
import { MarkdownParserService } from 'app/MarkdownParserService';
import { Entry } from 'app/entry-component/Entry';

declare var hljs: any;

@Component({
    selector: 'app-list-entries',
    templateUrl : './app.list-entries.html',
    //styleUrls: ['./app.component.css']
})
export class EntriesComponent implements OnInit {

    /**
     * Component fields
     */
    entries : Entry[];

    constructor(
        private entryService : EntryService,
        private parser       : MarkdownParserService,
        private elementRef: ElementRef)
    {}

    ngOnInit(): void {
        this.entryService.fromJSON().
        subscribe(entries => {
        entries.forEach((entry) => {
            entry.content = this.toMarkdown(entry.content);
            entry.resume  = this.toMarkdown(entry.resume);
            entry.title   = this.toMarkdown(entry.title);
        });
        this.entries = entries;
        });
    }

    /**
     * helper function to parse raw data to markdown
     */
    private toMarkdown(data : string) : string {
        return this.parser.convert(data);
    }
}