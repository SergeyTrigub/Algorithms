import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface BinarySearchState {
    currentCount: number;
    searchText: string;
    itemsToSearch: number[];
    itemsToSearchCount: number;
    searchResult: SearchResultState;
}

interface SearchResultState {
    index: number;
    attempts: number;
}

export class BinarySearch extends React.Component<RouteComponentProps<{}>, BinarySearchState> {
    constructor() {
        super();
        this.state = {
            currentCount: 0,
            searchText: '',
            itemsToSearch: [],
            itemsToSearchCount: 1000000,
            searchResult: { index: -1, attempts: 0 }
        };
    }

    componentWillMount() {
        const { itemsToSearch, itemsToSearchCount } = this.state;

        for (let i = 1; i <= itemsToSearchCount; i++) {
            itemsToSearch.push(i);
        }

    }

    handleSearchTextChanged = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ searchText: e.currentTarget.value });
    }

    search(text: string) {
        const { itemsToSearch } = this.state;

        const searchNumber = parseInt(text, 10);

        const searchResult = this.searchBinary(searchNumber, itemsToSearch);

        this.setState({
            searchResult: searchResult
        });
    }

    searchSimple() { }

    searchBinary(searchNumber: number, itemsToSearch: number[]): SearchResultState {
        let low = 0;
        let high = itemsToSearch.length - 1;
        let mid = 0;
        let guess;

        const result = { index: -1, attempts: 0 };
        const attempts = 0;
        debugger;
        while (low < high) {
            result.attempts++;

            mid = Math.round((low + high) / 2);

            guess = itemsToSearch[mid];

            if (guess == searchNumber) {
                result.index = mid;
                break;
            }

            if (guess > searchNumber) {
                high = mid - 1;
            }

            if (guess < searchNumber) {
                low = mid + 1;
            }
        }

        return result;
    }

    public render() {
        const { searchText, itemsToSearchCount, searchResult } = this.state;

        return <div>
            <h1>BinarySearchState</h1>
            <div>
                <strong>Items to search: </strong>
                <span>{itemsToSearchCount}</span>
            </div>
            <div>
                <strong>Search Results: </strong>
                <span>idx: {searchResult.index}, </span>
                <span>attempts: {searchResult.attempts}</span>
            </div>
            <input type="text" onChange={this.handleSearchTextChanged} value={this.state.searchText} />
            <button onClick={() => { this.search(searchText) }}>Search</button>
        </div>;
    }
}
