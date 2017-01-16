import { Injectable } from '@angular/core';

@Injectable()
export class Paginator {
	data: Array<any> = [];
	currentPage: number = 0;
	totalItems: number = 0;
	totalPages: number = 0;
	perPage: number = 10;
	isLast: boolean = false;

	setData(data: Array<any>) {
		this.data = data;
		this.currentPage = 1;
		this.totalItems = data.length;
		this.totalPages = Math.ceil(this.totalItems / this.perPage);
	}

	setPerPage(p: number) {
		this.perPage = p;
	}

	calcIsLast() {
		this.isLast = this.currentPage === this.totalPages;
	}

	next(): any{
		if (this.isLast) return false;
		return this.data.splice((this.currentPage++ * this.perPage), this.perPage);
	}

	prev(): any{
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