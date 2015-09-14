/**
 * Created by cristianandrei on 13/09/15.
 */

import alt from '../app/alt';
import Superagent from 'superagent';



class SearchResultActions {
    constructor() {
        this.generateActions(
            'getResultsSuccess',
            'getResultsFail'
        );
    }

    getResults(payload) {

        Superagent
            .get(`http://api.alpha.oppex.com/api/notices?fields.description=`+payload, res => {
            if (res.status === 200 && res.body.items) {
                this.actions.getResultsSuccess(res.body.items);
            }
        });
    }
}

export default alt.createActions(SearchResultActions);



