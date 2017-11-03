import { Injectable } from '@angular/core';
import { Entry } from 'app/entry-component/Entry';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EntryService {
    HOST = 'http://localhost:8080';
    constructor(private http: Http) {}

    fromJSON(actPage : Number) : Observable<Entry[]> {
        return this.http.get(`${this.HOST}/query/entries?page=${actPage}`)
            .map(response => {
                return response.json();
            });
    }

    getById(id : Number) : Observable<Entry> {
        return this.http.get(`${this.HOST}/query/entries/${id}`)
        .map(response => { 
            return response.json();
        });
    }

    totalPosts() :  Observable<any> {
        return this.http.get(`${this.HOST}/query/total-entries`)
        .map(response => { 
            return response.json();
        });
    }
}