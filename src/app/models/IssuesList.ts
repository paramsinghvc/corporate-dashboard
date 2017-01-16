import { Issue } from './';

export class IssuesList {
	private data: Array<Issue> = [];
	private currentPage: number = 0;
	private totalItems: number = 0;
	private totalPages: number = 0;
	private perPage: number = 10;
	private isLast: boolean = false;

	constructor(data: Array<Issue>, perPage?: number){
		this.data = data;
		this.perPage = perPage || this.perPage;
		this.initParams();
	}

	initParams() {
		this.currentPage = 1;
		this.totalItems = this.data.length;
		this.totalPages = Math.ceil(this.totalItems / this.perPage);
	}

	setPerPage(p: number) {
		this.perPage = p;
	}

	calcIsLast() {
		this.isLast = this.currentPage === this.totalPages;
	}

	next(): any {
		if (this.isLast) return false;
		return this.data.splice((this.currentPage++ * this.perPage), this.perPage);
	}

	prev(): any {
		if (this.currentPage <= 1) return false;
		return this.data.splice((--this.currentPage * this.perPage), this.perPage);
	}

	first() {
		return this.data.splice(0, this.perPage);
	}

	last() {
		return this.data.splice(-this.perPage, this.perPage);
	}
}