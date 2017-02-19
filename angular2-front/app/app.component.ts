import {Component} from '@angular/core';

// Componente principal que será cargado cuando la aplicación arranque
@Component({
    selector:'blog-test',
    template : `
        <h1>{{title}}</h1>
        <!-- cargar el header -->
        <!-- CARGAR EL PANEL LATERAL -->
        <!-- AQUÍ EL BODY -->
        <router-outlet></router-outlet>
        Initial load successful!
        <!-- cargar el footer -->
    `
})
// Componente principal
export class AppComponent {
    title = 'FIRST-BLOG';
}