/**
 * Created by cristianandrei on 13/09/15.
 */

import alt from '../app/alt';
import SearchResultActions from './SearchResultActions';

class SearchResultStore {
    constructor() {
        this.bindActions(SearchResultActions);
        this.items = [];
    }

    onGetResultsSuccess(data) {
        this.items = data;
    }

    onGetResultsFail(jqXhr) {
        toastr.error(jqXhr.responseJSON.message);
    }
}

export default alt.createStore(SearchResultStore);