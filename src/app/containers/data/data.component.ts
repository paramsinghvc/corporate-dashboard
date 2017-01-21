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
	filtersExpanded: boolean = false;
	@select(['app', 'paginatedIssues', 'shownIssues']) Issues: Observable<Array<Issue>>;
	@select(['app', 'paginatedIssues', 'currentPage']) currentPage: Observable<number>;
	@select(['app', 'paginatedIssues', 'isLast']) isLast: Observable<boolean>;

	constructor(private appActions: AppActions, private redux: NgRedux<any>) { }

	ngOnInit() {
		this.redux.dispatch(<any>this.appActions.getAllIssues());
	}

	getNextData() {
		this.redux.dispatch(<any>this.appActions.setNextShownIssues());
	}

	getPrevData() {
		this.redux.dispatch(<any>this.appActions.setPrevShownIssues());
	}

	filterIssues(e) {
		this.redux.dispatch(<any>this.appActions.setIssuesFilter(e.target.value));
	}

	removeIssuesFilter() {
		this.redux.dispatch(<any>this.appActions.removeIssuesFilter());
		this.filtersExpanded = false;
	}

	sortIssuesByDate(order: boolean){
		this.redux.dispatch(<any>this.appActions.sortIssuesByDate(order));
	}
}
