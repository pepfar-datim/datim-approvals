export function getActionPageUrlService():string{
    if (window.location.hostname.includes('localhost')) return `http://localhost:3001`
    else return '../view/index.html'
}