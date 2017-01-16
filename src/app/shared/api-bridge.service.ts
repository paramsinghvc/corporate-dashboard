import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
import { Issue } from '../models';

@Injectable()
export class ApiBridge {
	db: any;
	constructor(af: AngularFire) {
		this.db = af.database;
	}

	getAllIssues(): Observable<Array<Issue>> {
		return this.db.object('data')
			.map(res => res.store.issues)
			.map(issues => issues.map(i => new Issue(i)));
	}

}