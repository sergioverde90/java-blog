import { Injectable } from '@angular/core';
import { Entry } from 'app/entry-component/Entry';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EntryService {

    constructor(private http: Http) {}

    fromJSON() : Observable<Entry[]> {
       return this.http.get("app/entry-component/mock/mock-entries.json")
       .map(response => response.json() as Entry[])
    }
}