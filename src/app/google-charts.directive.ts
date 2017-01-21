import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

interface IWindow extends Window {
	google?: any;
}

@Directive({
	selector: '[appGoogleCharts]'
})
export class GoogleChartsDirective implements OnInit {
	@Input() chartData: Observable<any>;
	@Input() chartOptions: any;
	@Input() chartType: any;
	g: any;

	constructor(private el: ElementRef) {
	}

	ngOnInit() {
		let self = this;
		this.g = (<IWindow>window).google;
		this.g.charts.setOnLoadCallback(drawChart);
		
		window.onresize = drawChart;

		function drawChart() {
			var wrapper;
			self.chartOptions['width'] = window.innerWidth - 100;			
			self.chartData.subscribe(res => {
				console.log(res);
				wrapper = new self.g.visualization.ChartWrapper({
					chartType: self.chartType,
					dataTable: res,
					options: self.chartOptions || {},
					containerId: self.el.nativeElement.id
				});
				wrapper.draw();
			})
		}
	}
}
