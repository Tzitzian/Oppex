/**
 * Created by cristianandrei on 13/09/15.
 */

import alt from '../app/alt';

class SearchResultActions {
    constructor() {
        this.generateActions(
            'getResultsSuccess',
            'getResultsFail'
        );
    }

    getResults(payload) {
        let url = 'http://api.alpha.oppex.com/api/notices';
        let params = {
            description: 'bill'
            // @TODO : change this to -> description: payload.description
            // when "Uncaught ReferenceError: $ is not defined" is fixed for
            // the ajax call below
        };


        $.ajax({ url: url, data: params })
            .done((data) => {
                this.actions.getResultsSuccess(data);
            })
            .fail((jqXhr) => {
                this.actions.getResultsFail(jqXhr);
            });
    }
}

export default alt.createActions(SearchResultActions);