import { Component, ViewChildren, ElementRef, OnInit } from '@angular/core';
import { EntryService } from 'app/entry-component/EntryService';
import { MarkdownParserService } from 'app/MarkdownParserService';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Entry } from 'app/entry-component/Entry';

declare var hljs: any;

@Component({
    selector: 'app-list-entries',
    templateUrl : './app.list-entries.html',
    styleUrls: ['./app.list-entries.css']
})
export class EntriesComponent implements OnInit {

    /**
     * Component fields
     */
    entries : Entry[];
    actPage : Number;

    constructor(
        private entryService : EntryService,
        private parser       : MarkdownParserService,
        private route: ActivatedRoute,
        private elementRef: ElementRef) {}

    ngOnInit(): void {
        this.route.params.forEach((param) => {
            this.actPage = param['page'] || 0;
        });
        this.entryService.fromJSON(this.actPage).
        subscribe(entries => {
            entries.forEach((entry) => {
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