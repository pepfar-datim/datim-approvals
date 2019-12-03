import api from "../../shared/services/api.service";

export function fetchUserType():Promise<string>{
    return api.get('/me?fields=userGroups[name]')
        .then(response=>{
            return response.userGroups.map(g=>g.name.toLowerCase());
        }).then(groups=>{
            return groups.filter(name=>name.indexOf('users')>-1||name.indexOf('country team')>-1)
        }).then(groupNames=>{
            let type;
            groupNames.forEach(groupName=> {
                if (groupName.indexOf('global users') > -1) type = 'global';
                if (groupName.indexOf('country team') > -1) type = 'inter-agency';
                if (groupName.indexOf('agency') > -1) type = 'agency';
                if (groupName.indexOf('global agency') > -1) type = 'agency hq';
                if (groupName.indexOf('partner') > -1) type = 'partner';
            });
            if (!type) console.error(`can't determine user type: ${JSON.stringify(groupNames)}`);
            return type;
        });
}

export function fetchUserOu():Promise<string>{
    return api.get('/me?fields=organisationUnits').then(response=>response.organisationUnits[0].id);
}