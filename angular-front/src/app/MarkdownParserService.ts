import { Injectable } from '@angular/core';
import * as marked from 'marked'; // from 'https://github.com/chjj/marked'
declare var hljs: any;

@Injectable()
export class MarkdownParserService {

    private md : MarkedStatic;

    constructor() { 
        this.md = marked;
        this.md.setOptions({
            gfm     : true, 
            breaks  : true,
            highlight(code){
                return hljs.highlightAuto(code).value;;
            }
        });
    }

    convert(markdown : string) : string {
        return this.md.parse(markdown);
    }
}