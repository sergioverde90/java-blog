import { OnInit, Input } from '@angular/core';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EntryService } from 'app/entry-component/EntryService';
import { MarkdownParserService } from 'app/MarkdownParserService';
import { Entry } from 'app/entry-component/Entry';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-entry-component',
    templateUrl : './entry.component.html'
})
export class EntryComponent implements OnInit {

    entry : Entry;

    constructor(
        private route: ActivatedRoute,
        private entryService : EntryService,
        private parser       : MarkdownParserService,
    ) {}

    ngOnInit() : void {
        this.route.params.forEach((param) => {
            const entryId : Number = param["id"];
            this.entryService.getById(entryId)
            .subscribe(entry => {
                entry.content = this.toMarkdown(entry.content);
                this.entry = entry;
            })
        });
    }

    /**
     * helper function to parse raw data to markdown
     */
    private toMarkdown(data : string) : string {
        return this.parser.convert(data);
    }
}