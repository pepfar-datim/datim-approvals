import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react-swc'

let auth;
try {
    auth = loadEnv('development', process.cwd())['VITE_DHIS_AUTH']
} catch (e) {
    throw new Error(`You have to specify VITE_DHIS_AUTH env variable. E.g. btoa('username:password') in JavaScript`)
}



const proxy = {
    target: 'https://dev.datim.org/',
    configure: (proxy, options) => {
        options.headers = {Authorization: `Basic ${auth}`}
    },
    secure: false,
    changeOrigin: true
};

export default defineConfig({
    base: '',
    plugins: [react()],
    server: {
        port: 3001,
        proxy: {
            '/api': proxy,
            '/dhis-web-commons': proxy,
        }
    },
    optimizeDeps:{
        include: ['@mui/material']
    },
    build: {
        minify: false,
    }
})
