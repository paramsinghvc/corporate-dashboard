import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs/Rx';
import { IssuesList, Issue } from '../../models';
import { AppActions } from '../../actions';

@Component({
	selector: 'app-data',
	templateUrl: './data.component.html',
	styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
	@select(['app', 'paginatedIssues', 'shownIssues']) Issues: Observable<Array<Issue>>;
	constructor(private appActions: AppActions, private redux: NgRedux<any>) { }

	ngOnInit() {

	}

	getNextData() {
		this.redux.dispatch(<any>this.appActions.setNextShownIssues());
	}

	getPrevData() {
		this.redux.dispatch(<any>this.appActions.setPrevShownIssues());
	}

}
