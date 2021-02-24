import api from './api.service';

function checkSuperUser():Promise<boolean>{
    return api.get('/me?fields=userCredentials[userRoles[name]]')
        .then(result=>result.userCredentials.userRoles)
        .then(result=>result.map(r=>r.name))
        .then(result=>result.includes("Superuser ALL authorities"))
}

export default class SuperUserService {
    public isSuperUser:boolean;
    async init():Promise<boolean>{
        let isSuperUser:boolean = await checkSuperUser();
        return isSuperUser
    }

}