import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DataComponent } from './containers/data/data.component';
import { GeoSpatialComponent } from './containers/geo-spatial/geo-spatial.component';
import { KeyMetricsComponent } from './containers/key-metrics/key-metrics.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{ path: '', redirectTo: 'data', pathMatch: 'full' },
			{ path: 'data', component: DataComponent },
			{ path: 'geo-spatial', component: GeoSpatialComponent },
			{ path: 'key-metrics', component: KeyMetricsComponent }
		]
	},
	{ path: '**', redirectTo: '/' }
];

export const Routing = RouterModule.forRoot(routes);
