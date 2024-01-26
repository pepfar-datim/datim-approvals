export function getSearchPageUrlService():string{
    if (window.location.hostname.includes('localhost')) return `http://localhost:3000`
    else return '../search/index.html'
}