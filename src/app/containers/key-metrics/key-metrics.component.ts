import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { AppActions } from '../../actions';

@Component({
	selector: 'app-key-metrics',
	templateUrl: './key-metrics.component.html',
	styleUrls: ['./key-metrics.component.scss'],
	host: {
		style: 'text-align:center;'
	}
})
export class KeyMetricsComponent implements OnInit {
	chartOptions: any;
	issuesChartDataOb: Subject<any> = new BehaviorSubject([['Month', 'Issues']]);
	customersChartDataOb: Subject<any> = new BehaviorSubject([['Week', 'Number of Customers']]);

	@select(['app', 'keyMetricsData']) kmData: Subject<any>;

	constructor(private appActions: AppActions, private redux: NgRedux<any>) { }

	ngOnInit() {
		this.redux.dispatch(<any>this.appActions.getkeyMetricsData());

		this.chartOptions = {
			chart: {
				title: 'Issues vs Months',
				subtitle: 'Number of issues in respective months',
			},
			bars: 'vertical',
			chartArea: {
				backgroundColor: 'transparent',
				width: '70%'
			},
			backgroundColor: 'transparent',
			width: window.innerWidth - 100,
			height: 400
		};

		let chartData = [['Month', 'Issues']];
		let customersChartData = [['Week', 'Number of Customers']];

		this.kmData.subscribe(kmdata => {

			if (kmdata.get('months')) {
				let months = kmdata.get('months').toJS().map(m => {
					return [m.label, m.issues]
				})
				let customers = kmdata.get('customers').toJS().map(m => {
					return [m.week_num, m.num_customers]
				})
				this.issuesChartDataOb.next(chartData.concat(months));
				this.customersChartDataOb.next(customersChartData.concat(customers));
			}
		})
	}



}
