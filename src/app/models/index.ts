export interface IAction {
	type: string,
	payload?: any
}

export interface IActionCreator {
	(...args: any[]): IAction
}

export interface IReducer<T> {
	(state: T, action: IAction): T;
}

type Person = {
	name: string,
	company: string
}

export class Issue {
	id: string;
	submission: string;
	closed: string;
	status: string;
	isActive: boolean;
	customer: Person;
	employee: Person;
	description: string;
	constructor(issue) {
		this.id = issue.id || '';
		this.submission = issue.submission || '';
		this.closed = issue.closed || '';
		this.status = issue.status || '';
		this.isActive = issue.isActive || '';
		this.customer = issue.customer || {};
		this.employee = issue.employee || {};
		this.description = issue.description || '';
	}
}

export { IssuesList} from './IssuesList';