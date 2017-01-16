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

	getAllIssues() {
		return (dispatch) => {
			dispatch(this.setLoader(true));
			this.apiBridge.getAllIssues().subscribe(res => {
				dispatch(this.setLoader(false));
				dispatch(this.setIssues(res));
			})
		}
	}

}