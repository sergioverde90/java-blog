import { Injectable } from '@angular/core';
import { Entry } from 'app/entry-component/Entry';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EntryService {
    
    constructor(private http: Http) {}

    fromJSON() : Observable<Entry[]> {
        // http://stackoverflow.com/questions/34517265/linking-containers-between-task-definitions-in-aws-ecs
        // uncomment in prod mode
        // return this.http.get("NAME_OF_AWS_ECS_SERVICE") eg. ES-service
        // return this.http.get("NAME_OF_AWS_ECS_TASK_DEFINITION") eg. task-def-es
        return this.http.get("app/entry-component/mock/mock-entries.json")
        .map(response => response.json() as Entry[])
    }
}