import {loadEnv} from 'vite'

export type Env = {
    server: string;
    username: string;
    password: string;
    authorization: string;
}

async function assembleError(url: string, username: string, password: string, response:Response):Promise<string>{
    const details = response.headers.get('Content-Type').includes('application/json') ? (await response.json()).message : response.statusText
    return `
        Cannot connect to DHIS2 dev server
        Credentials obtained from .env & .env.local
        Server: ${url}
        Username: ${username}
        Password: ${password}
        HTTP status code: ${response.status}
        Server response: ${details}
    `
}

export function getEnv():Env {
    const {
        VITE_DEV_SERVER: url,
        VITE_DEV_USERNAME: username,
        VITE_DEV_PASSWORD: password,
    } = loadEnv('development', process.cwd())
    const authorization = `Basic ${btoa(`${username}:${password}`)}`
    fetch(`${url}api/me`, {
        headers:{
            Authorization: authorization,
        },
    }).then(async (response) => {
        if (!response.ok) {
            throw Error(await assembleError(url, username, password, response))
        }
    })
    return {
        server: url.replace(/\/$/, ''),
        username,
        password,
        authorization,
    }
}