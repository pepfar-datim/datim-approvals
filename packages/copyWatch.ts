import {buildWatch, copyWatch} from "@pepfar-react-lib/local-package-builder";

console.log(`Building ${process.argv[2]}`)

copyWatch(process.argv[2],'../dhis2-app')