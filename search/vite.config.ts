import {defineConfig, ProxyOptions, ServerOptions} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {getEnv} from "./scripts/getEnv.service";
import ReportPlugin from "./scripts/reportPlugin";

const {server:target, authorization:Authorization} = getEnv()

const proxy:ProxyOptions = {
    target,
    configure: (proxy, options) => {
        options.headers = {Authorization}
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
    plugins: [react(), ReportPlugin()],
    server,
    preview: server,
    build: {
        assetsDir: 'search'
    }
})
