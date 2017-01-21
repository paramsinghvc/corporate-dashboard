import { Injectable } from '@angular/core';
import { ApiBridge } from '../shared/api-bridge.service';
import { IActionCreator, Issue } from '../models';
import { AppConstants } from '../constants';

@Injectable()
export class AppActions {
	constructor(private apiBridge: ApiBridge) {
	}

	setLoader: IActionCreator = (status: boolean) => {
		return {
			type: AppConstants.SHOW_LOADER,
			payload: status
		}
	}

	setIssues: IActionCreator = (data: Array<Issue>) => {
		return {
			type: AppConstants.SET_ISSUES_DATA,
			payload: data
		}
	}

	setIssuesFilter: IActionCreator = (status: string) => {
		return {
			type: AppConstants.FILTER_ISSUES,
			payload: status
		}
	}

	sortIssuesByDate: IActionCreator = (isAsc) => {
		return {
			type: AppConstants.SORT_ISSUES_BY_DATE,
			payload: isAsc
		}
	}

	removeIssuesFilter: IActionCreator = (status: string) => {
		return {
			type: AppConstants.CLEAR_FILTERS
		}
	}

	setNextShownIssues: IActionCreator = () => {
		return {
			type: AppConstants.SET_NEXT_SHOWN_ISSUES
		}
	}

	setPrevShownIssues: IActionCreator = () => {
		return {
			type: AppConstants.SET_PREV_SHOWN_ISSUES
		}
	}

	setGeoSpatialData: IActionCreator = (payload: any) => {
		return {
			type: AppConstants.SET_GEOSPATIAL_DATA,
			payload
		}
	}

	setKeyMetricsData: IActionCreator = (payload: any) => {
		return {
			type: AppConstants.SET_KEYMETRICS_DATA,
			payload
		}
	}

	getAllIssues() {
		return (dispatch) => {
			dispatch(this.setLoader(true));
			this.apiBridge.getAllIssues().subscribe(res => {
				dispatch(this.setLoader(false));
				dispatch(this.setIssues(res));
			})
		}
	}

	getkeyMetricsData(){
		return (dispatch) => {
			dispatch(this.setLoader(true));
			this.apiBridge.getKeyMetricsData().subscribe(res => {
				dispatch(this.setLoader(false));
				dispatch(this.setKeyMetricsData(res));
			})
		}
	}

	getGeoSpatialData(){
		return (dispatch) => {
			dispatch(this.setLoader(true));
			this.apiBridge.getGeoSpatialData().subscribe(res => {
				dispatch(this.setLoader(false));
				dispatch(this.setGeoSpatialData(res));
			})
		}
	}

}