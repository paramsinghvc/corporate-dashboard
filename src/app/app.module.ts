import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { GeoSpatialComponent } from './containers/geo-spatial/geo-spatial.component';
import { KeyMetricsComponent } from './containers/key-metrics/key-metrics.component';
import { DataComponent } from './containers/data/data.component';

import { ApiBridge } from './shared/api-bridge.service';
import { Paginator } from './shared/paginator.service';
import { AppActions } from './actions';

import { store } from './shared/buildReduxStore';
import { Routing } from './app.router';
import { GoogleChartsDirective } from './google-charts.directive';

const firebaseConfig = {
    apiKey: "AIzaSyDrNGdYNemMcZmDusvEgcQmKvZIQz6tqfo",
    authDomain: "corporate-dashboard-8ddf3.firebaseapp.com",
    databaseURL: "https://corporate-dashboard-8ddf3.firebaseio.com",
    storageBucket: "corporate-dashboard-8ddf3.appspot.com",
    messagingSenderId: "830838883549"
};

@NgModule({
    declarations: [
        AppComponent,
        GeoSpatialComponent,
        KeyMetricsComponent,
        DataComponent,
        GoogleChartsDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ClarityModule.forChild(),
        Routing,
        NgReduxModule,
        HttpModule,
        AngularFireModule.initializeApp(firebaseConfig)
    ],
    providers: [ApiBridge, Paginator, AppActions],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(ngRedux: NgRedux<any>) {
        ngRedux.provideStore(store);
    }
}
