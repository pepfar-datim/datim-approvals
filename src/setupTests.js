import {apiInit, initTestApiCache} from "@pepfar-react-lib/http-tools";
import {baseUrl} from "./modules/shared/services/apiUrl.service";


HTMLCanvasElement.prototype.getContext = () => {
    // return whatever getContext has to return
};
initTestApiCache()
apiInit(baseUrl,process.env.NODE_ENV);

let timeout = process.env.JEST_TIMEOUT_SEC*1000||30000;
console.log(`Test timeout is:\t${timeout}`)
jest.setTimeout(timeout);