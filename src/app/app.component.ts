import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { AppActions } from './actions';
import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	@select(['app', 'isLoading']) isLoading: Observable<boolean>;

	constructor(private appActions: AppActions, private redux: NgRedux<any>) { }

	ngOnInit() {
		this.redux.dispatch(<any>this.appActions.getAllIssues());
	}
}
