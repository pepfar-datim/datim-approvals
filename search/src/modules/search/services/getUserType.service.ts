import {isSuperUser, determineUserType, UserType} from "@pepfar-react-lib/datimuser";

export async function getUserType():Promise<UserType>{
    const {userGroups,userCredentials:{userRoles}} = await fetch('/api/me.json?fields=userGroups[id,name],userCredentials[userRoles[id,name]]').then(r=>r.json());
    if (isSuperUser(userRoles)) return UserType.superAdmin
    return determineUserType(userGroups)
}