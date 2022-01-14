import {insertUser} from "@pepfar-react-lib/dhis2-helpers";
import {users} from "./users.data";

users.forEach(async u=>{
    insertUser(u);
});