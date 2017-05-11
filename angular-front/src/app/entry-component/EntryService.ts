import { Injectable } from '@angular/core';
import { Entry } from 'app/entry-component/Entry';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EntryService {
    
    constructor(private http: Http) {}

    fromJSON() : Observable<Entry[]> {
        // return this.http.get("NAME_OF_AWS_ECS_SERVICE") eg. ES-service
        // return this.http.get("NAME_OF_AWS_ECS_TASK_DEFINITION") eg. task-def-es
        let response =  this.http.get("http://localhost:9200/posts/_search/");
        return response.map(response => {
            var json =  response.json();
            let hits = json.hits.hits;
            let entries : Entry[] = [];
            for(let hit in hits){
                let actHit = hits[hit];
                let content : string = actHit._source.content;
                let id : Number = actHit._id;
                let entry = new Entry(id, content);
                entries.push(entry);
            }
            return entries;
        });
    }
}