import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { AppActions } from '../../actions';

@Component({
	selector: 'app-geo-spatial',
	templateUrl: './geo-spatial.component.html',
	styleUrls: ['./geo-spatial.component.scss'],
	host: {
		style: 'margin-top: 50px'
	}
})
export class GeoSpatialComponent implements OnInit {

	@select(['app', 'geoSpatialData']) geoSpatialStateData$: Observable<any>;
	chartOptions: any;

	geoSpatialData$: BehaviorSubject<any> = new BehaviorSubject([]);

	constructor(private appActions: AppActions, private redux: NgRedux<any>) { }

	ngOnInit() {

		this.redux.dispatch(<any>this.appActions.getGeoSpatialData());
		this.chartOptions = {
			chart: {
				title: 'Number of employees location wise'
			},
			chartArea: {
				backgroundColor: 'transparent',
				width: '70%'
			},
			backgroundColor: 'transparent',
			width: window.innerWidth - 100,
			height: 400
		};

		let data = [['Country', 'No of Employees']];
		this.geoSpatialStateData$.subscribe(res => {
			let d = res.toJS().map(r => [r.location, r.numemployees]);
			this.geoSpatialData$.next(data.concat(d));
		})
	}

}
