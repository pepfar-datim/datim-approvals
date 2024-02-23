import {defineConfig, loadEnv, ProxyOptions, ServerOptions} from 'vite'
import react from '@vitejs/plugin-react-swc'

let auth;
try {
    auth = loadEnv('development', process.cwd())['VITE_DHIS_AUTH']
} catch (e) {
    throw new Error(`You have to specify VITE_DHIS_AUTH env variable. E.g. btoa('username:password') in JavaScript`)
}



const proxy:ProxyOptions = {
    target: 'https://test.datim.org/',
    configure: (proxy, options) => {
        options.headers = {Authorization: `Basic ${auth}`}
    },
    secure: false,
    changeOrigin: true
};

const server:ServerOptions = {
    port: 3000,
    proxy: {
        '/api': proxy,
        '/dhis-web-commons': proxy,
    }
}

export default defineConfig({
    base: '',
    plugins: [react()],
    server,
    preview: server
})
