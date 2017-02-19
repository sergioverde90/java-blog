import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // import routes

/**
 * Config routes for app initial module.
 */
const routes : Routes = [
    {
        path : '',
        redirectTo : '/home',
        pathMatch: 'full'
    }
];

@NgModule({
    // <strong>only uses forRoot method in root routing module</strong>
    imports : [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouteModule {}