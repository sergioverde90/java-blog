import { Injectable } from '@angular/core';
import { Entry } from 'app/entry-component/Entry';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EntryService {
    HOST = 'http://server:8080'; //'http://alb-backend-server-868001910.eu-west-1.elb.amazonaws.com:8080';
    constructor(private http: Http) {}

    fromJSON() : Observable<Entry[]> {
        return this.http.get(`${this.HOST}/query/entries`)
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
}