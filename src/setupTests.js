import {apiInit, debugLog, initTestApiCache} from "@pepfar-react-lib/http-tools";
import {baseUrl} from "./modules/shared/services/apiUrl.service";
import {configure} from '@testing-library/dom'


HTMLCanvasElement.prototype.getContext = () => {
    // return whatever getContext has to return
};
initTestApiCache()
apiInit(baseUrl,process.env.NODE_ENV);

let timeout = process.env.JEST_TIMEOUT_SEC*1000||5000;
debugLog(`Setting test timeout: ${timeout}ms`)
jest.setTimeout(timeout);
configure({asyncUtilTimeout:timeout});

process.env.DEBUG_PRINT_LIMIT = 10000000;