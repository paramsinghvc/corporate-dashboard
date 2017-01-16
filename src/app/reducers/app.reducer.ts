import { IReducer, IAction, IssuesList } from '../models';
import { Map, fromJS } from 'immutable';
import { AppConstants } from '../constants';

const initialState = fromJS({
    isLoading: false,
    paginatedIssues: {
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
        perPage: 5,
        isLast: false,
        shownIssues: []
    },
    issues: []
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
                paginatedIssues: {
                    totalItems: totalItems,
                    totalPages: totalPages,
                    currentPage: 1,
                    perPage,
                    isLast: totalPages === 1,
                    shownIssues: action.payload.splice(0, perPage)
                }
            })
        }
        case AppConstants.SET_NEXT_SHOWN_ISSUES: {
            let currentPage = state.getIn(['paginatedIssues', 'currentPage']);
            let perPage = state.getIn(['paginatedIssues', 'perPage']);
            let totalPages = state.getIn(['paginatedIssues', 'totalPages']);
            let totalItems = state.getIn(['paginatedIssues', 'totalItems']);
            return state.setIn(['paginatedIssues'], fromJS({

                currentPage: (currentPage + 1),
                totalPages: totalPages,
                totalItems: totalItems,
                isLast: totalPages === currentPage,
                shownIssues: state.get('issues').slice(currentPage * perPage, (currentPage + 1) * perPage)

            }))
        }
        case AppConstants.SET_PREV_SHOWN_ISSUES: {
            let currentPage = state.getIn(['paginatedIssues', 'currentPage']);
            let perPage = state.getIn(['paginatedIssues', 'perPage']);
            let totalPages = state.getIn(['paginatedIssues', 'totalPages']);
            let totalItems = state.getIn(['paginatedIssues', 'totalItems']);

            return state.setIn(['paginatedIssues'], fromJS({
            
                    currentPage: (currentPage - 1),
                    totalItems,
                    totalPages,
                    perPage,
                    isLast: totalPages === currentPage,
                    shownIssues: state.get('issues').slice(0, 10)
                
            }))
        }
        default:
            return state;
    }
}