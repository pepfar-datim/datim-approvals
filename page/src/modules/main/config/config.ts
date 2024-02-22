declare type Version = {
    full: string;
    major: number;
    minor: number;
    patch?: number;
    tag?: string;
};
declare type DateInput = string | Date | number | null;
interface SystemInfo {
    version: string;
    contextPath: string;
    serverTimeZoneId: string;
}
interface Config {
    baseUrl: string;
    apiVersion: number;
    appName?: string;
    appVersion?: Version;
    serverVersion?: Version;
    systemInfo?: SystemInfo;
}
export const dhis2ProviderConfig:Config = {
    baseUrl: '/',
    apiVersion: 40,
    appName: 'Approvals',
    appVersion: {
        full: '2.3.0',
        major: 2,
        minor: 3
    },
    systemInfo:{
        version: '2.40.2.1',
        contextPath: '/',
        serverTimeZoneId: 'UTC'
    }
}