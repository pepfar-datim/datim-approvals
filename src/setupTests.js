import {apiInit, initTestApiCache} from "@pepfar-react-lib/http-tools";
import {baseUrl} from "./modules/shared/services/apiUrl.service";


HTMLCanvasElement.prototype.getContext = () => {
    // return whatever getContext has to return
};
initTestApiCache()
apiInit(baseUrl,process.env.NODE_ENV);

let timeout = process.env.JEST_TIMEOUT_SEC*1000||5000;
jest.setTimeout(timeout);

process.env.DEBUG_PRINT_LIMIT = 10000000;