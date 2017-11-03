import { OnInit, Input } from '@angular/core';
import { Component } from '@angular/core';
import { EntryService } from 'app/entry-component/EntryService';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-entry-pagination',
    templateUrl : './entry.pagination.html'
})
export class EntryPagination implements OnInit {

    total : Number = 0;

    constructor(
        private entryService : EntryService,
    ) {}

    ngOnInit() : void {
        this.entryService.totalPosts()
        .subscribe(response => {
            this.total = parseInt(response.total);
        })
        console.log("inir");
    }
}