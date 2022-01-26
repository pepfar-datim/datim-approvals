import queryString from "query-string";
import {SearchFilters} from "../models/filters.model";

export function setUrl(filters:SearchFilters) {
    setTimeout(() => {
        let url = queryString.stringify(filters);
        window.history.pushState(null, null, '#/search?' + url);
    }, 0);
}

export function getUrlFilters():SearchFilters{
    return queryString.parse(window.location.hash.replace(/^.+\?/,'')) as SearchFilters
}