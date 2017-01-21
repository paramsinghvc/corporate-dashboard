import { IReducer, IAction, IssuesList } from '../models';
import { Map, fromJS } from 'immutable';
import { AppConstants } from '../constants';

const initialState = fromJS({
    isLoading: false,
    paginatedIssues: {
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
        perPage: 10,
        isLast: false,
        shownIssues: []
    },
    issues: [],
    issuesOriginal: [],
    geoSpatialData: [],
    keyMetricsData: {}
})

export const AppReducer: IReducer<Map<string, any>> = (state: Map<string, any> = initialState, action: IAction) => {
    switch (action.type) {
        case AppConstants.SHOW_LOADER:
            return state.merge({
                isLoading: action.payload
            })
        case AppConstants.SET_ISSUES_DATA: {
            let perPage = state.get('paginatedIssues').get('perPage');
            let totalItems = action.payload.length;
            let totalPages = Math.ceil(totalItems / perPage);
            return state.merge({
                issues: action.payload,
                issuesOriginal: action.payload,
                paginatedIssues: {
                    totalItems: totalItems,
                    totalPages: totalPages,
                    currentPage: 1,
                    perPage: perPage,
                    isLast: totalPages === 1,
                    shownIssues: action.payload.slice(0, perPage)
                }
            })
        }
        case AppConstants.FILTER_ISSUES: {
            let perPage = state.get('paginatedIssues').get('perPage');
            let issues = state.get('issuesOriginal').filter(issue => issue.status == action.payload);
            let totalItems = issues.size;
            let totalPages = Math.ceil(totalItems / perPage);
            return state.merge({
                issues: issues,
                paginatedIssues: {
                    totalItems: totalItems,
                    totalPages: totalPages,
                    currentPage: 1,
                    perPage: perPage,
                    isLast: totalPages === 1,
                    shownIssues: issues.slice(0, perPage)
                }
            })
        }
        case AppConstants.CLEAR_FILTERS: {
            let perPage = state.get('paginatedIssues').get('perPage');
            let io = state.get('issuesOriginal');
            let totalItems = io.size;
            let totalPages = Math.ceil(totalItems / perPage);
            return state.merge({
                issues: io,
                paginatedIssues: {
                    totalItems: totalItems,
                    totalPages: totalPages,
                    currentPage: 1,
                    perPage: perPage,
                    isLast: totalPages === 1,
                    shownIssues: io.slice(0, perPage)
                }
            })
        }
        case AppConstants.SORT_ISSUES_BY_DATE: {
            let perPage = state.get('paginatedIssues').get('perPage');
            let sortedIssues = [];
            if (action.payload === true)
                sortedIssues = state.get('issues').sort((a, b) => new Date(a.submission.slice(0, -7)) < new Date(b.submission.slice(0, -7)));
            else
                sortedIssues = state.get('issues').sort((a, b) => new Date(a.submission.slice(0, -7)) > new Date(b.submission.slice(0, -7)));

            console.log(sortedIssues);
            return state.merge({
                issues: sortedIssues,
                paginatedIssues: state.get('paginatedIssues').merge({
                    shownIssues: sortedIssues.slice(0, perPage)
                })
            })
        }
        case AppConstants.SET_NEXT_SHOWN_ISSUES: {

            let currentPage = state.getIn(['paginatedIssues', 'currentPage']);
            let perPage = state.getIn(['paginatedIssues', 'perPage']);
            let totalPages = state.getIn(['paginatedIssues', 'totalPages']);
            let totalItems = state.getIn(['paginatedIssues', 'totalItems']);

            return state.setIn(['paginatedIssues'], Map({
                currentPage: (currentPage + 1),
                totalPages: totalPages,
                totalItems: totalItems,
                perPage: perPage,
                isLast: totalPages === currentPage,
                shownIssues: state.get('issues').slice(currentPage * perPage, (currentPage + 1) * perPage)
            }))
        }
        case AppConstants.SET_PREV_SHOWN_ISSUES: {
            let currentPage = state.getIn(['paginatedIssues', 'currentPage']);
            let perPage = state.getIn(['paginatedIssues', 'perPage']);
            let totalPages = state.getIn(['paginatedIssues', 'totalPages']);
            let totalItems = state.getIn(['paginatedIssues', 'totalItems']);

            return state.setIn(['paginatedIssues'], Map({
                currentPage: (currentPage - 1),
                totalItems,
                totalPages,
                perPage,
                isLast: totalPages === currentPage,
                shownIssues: state.get('issues').slice((currentPage - 2) * perPage, (currentPage - 1) * perPage)
            }))
        }
        case AppConstants.SET_GEOSPATIAL_DATA: {
            return state.merge(fromJS({
                geoSpatialData: action.payload
            }))
        }

        case AppConstants.SET_KEYMETRICS_DATA: {
            return state.merge(fromJS({
                keyMetricsData: action.payload
            }))
        }
        default:
            return state;
    }
}