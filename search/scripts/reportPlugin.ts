import {Plugin, ProxyOptions, ResolvedConfig} from "vite";
import colors from "picocolors"
const {
    green,
    dim,
    bold
} = colors

function getUser(authorization:string):string{
    const base64 = authorization.replace('Basic ', '')
    return Buffer.from(base64, 'base64').toString('ascii').replace(/:.+/, '');
}

function reportDatim(config:ResolvedConfig){
    const proxy:ProxyOptions = config.server.proxy['/api'] as ProxyOptions
    const url = proxy.target as string
    const authorization = proxy.headers.Authorization
    const indent = green(dim('  ➜'))
    const who = bold('DATIM server')
    const what = `${dim('url')} ${bold(url)} ${dim('user')} ${bold(getUser(authorization))}`
    const serverReport = `${indent}  ${who} ${what}`
    config.logger.info(serverReport)
}

export default function ReportPlugin():Plugin{
    return {
        name: 'config-report',
        configResolved(config:ResolvedConfig) {
            setTimeout(()=>{
                reportDatim(config);
            }, 1000)
        }
    };
}