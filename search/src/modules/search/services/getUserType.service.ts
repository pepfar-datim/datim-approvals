import {determineUserType, UserType} from "@pepfar-react-lib/datimuser";

export async function getUserType():Promise<UserType>{
    const {userGroups} = await fetch('/api/me.json?fields=userGroups[id,name]').then(r=>r.json());
    return determineUserType(userGroups)
}