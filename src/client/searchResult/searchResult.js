/**
 * Created by cristianandrei on 13/09/15.
 */
import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import SearchResultStore from './SearchResultStore';
import SearchResultActions from './SearchResultActions';

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = SearchResultStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        SearchResultStore.listen(this.onChange);
        SearchResultActions.getResults(this.props.params);
    }

    componentWillUnmount() {
        SearchResultStore.unlisten(this.onChange);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.params, this.props.params)) {
            SearchResultActions.getResults(this.props.params);
        }
    }

    onChange(state) {
        this.setState(state);
    }

    onFormSubmit(e){
        e.preventDefault();
        let searchTerm = this.refs.searchTerm.getDOMNode().value;
        SearchResultActions.getResults(searchTerm);
    }
    onKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            let searchTerm = this.refs.searchTerm.getDOMNode().value;
            SearchResultActions.getResults(searchTerm);
        }
    }


    render() {
        let searchResult = this.state.items.map((item, index) => {
            return (
                <div key={item.id} className='list-group-item animated fadeIn'>
                    <div className='media'>
                        <div className='media-body'>
                            <h4 className='media-heading'>
                                <small>Name: {item.name}</small>
                            </h4>
                            <small>Location: {item.city}, {item.country}</small>
                            <br />
                            <small>Timestamp: {item.timestamp}</small>
                            <br />
                            <small>Description: {item.description}</small>
                            <br />
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className='container'>
                <form onSubmit={::this.onFormSubmit}>
                        <legend>Search Oppex</legend>
                        <input
                            autoFocus
                            ref="searchTerm"
                            placeholder='search term goes here'
                            onKeyDown={::this.onKeyDown}
                            />
                        <br />
                        <button
                            type="submit"
                            children='Submit'
                            />
                </form>
                <div className='list-group'>
                    {searchResult}
                </div>
            </div>
        );
    }
}

SearchResult.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default SearchResult;