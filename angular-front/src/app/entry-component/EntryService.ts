import { Injectable } from '@angular/core';
import { Entry } from 'app/entry-component/Entry';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EntryService {

    constructor(private http: Http) {}

    fromJSON() : Observable<Entry[]> {
        return this.http.get('/query/entries')
            .map(response => response.json());
    }

    getById(id : Number) : Observable<Entry> {
        return this.http.get('/query/entries/' + id)
        .map(response => { 
            return response.json();
        });
    }
}