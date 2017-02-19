import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { AppRouteModule } from './app.route-module';


@NgModule({
    declarations: [
        AppComponent, // initial component
    ],
    imports:[
        BrowserModule, // module browser
        AppRouteModule // import routing module
    ],
    bootstrap : [
        AppComponent // bootstrap initial component
    ]
})
export class AppModule{}
platformBrowserDynamic().bootstrapModule(AppModule);