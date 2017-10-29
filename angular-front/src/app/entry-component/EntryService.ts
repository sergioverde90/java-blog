import { Injectable } from '@angular/core';
import { Entry } from 'app/entry-component/Entry';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EntryService {
    HOST = 'http://server:8080';
    constructor(private http: Http) {}

    fromJSON() : Observable<Entry[]> {
        return this.http.get('http://server:8080/query/entries')
            .map(response => {
                console.log(response.status)
                return response.json();
            });
    }

    getById(id : Number) : Observable<Entry> {
        console.log("this id = ", id);
        return this.http.get('http://server:8080/query/entries/' + id)
        .map(response => { 
            return response.json();
        });
    }
}