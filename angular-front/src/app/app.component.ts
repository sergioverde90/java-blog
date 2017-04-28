import { Component } from '@angular/core';
import {Entry} from 'app/entry-component/Entry';
import { OnInit } from '@angular/core';
import {EntryService} from 'app/entry-component/EntryService'
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    entries : Entry[];

    constructor(private entryService : EntryService) { }

    ngOnInit(): void {
      this.entryService.fromJSON().
      subscribe(entries => {
        console.log(entries);
        this.entries = entries;
      });
    }
}
