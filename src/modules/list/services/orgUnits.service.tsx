import api from "../../shared/services/api.service";

let allOusUrl = `/organisationUnits/ybg3MO3hcf4.json`
    +`?fields=id,name,displayName`
    +`&level=2`
    +`&paging=false`;

let userOusUrl = `/me?fields=organisationUnits[id,name]`;

export default class OrgUnits {
    static allOus;
    static userOus;

    static init() {
        return Promise.all([this.fetchAllOus(), this.fetchUserOus()]).then(()=>{
            return this.getOus();
        });
    }

    static namesOnly(array) {
        return array.map(ou => ou.name)
    }

    static fetchAllOus() {
        return api.get(allOusUrl).then(res => {
            this.allOus = res.organisationUnits;
            return this.allOus;
        });
    }

    static fetchUserOus() {
        return api.get(userOusUrl).then(res => {
            this.userOus = res.organisationUnits;
            return this.userOus;
        });
    }

    static getOus() {
        if (!this.allOus || !this.userOus) return null;
        if (this.namesOnly(this.userOus).indexOf('Global')>-1) {
            return [{name:'Global', id: 'ybg3MO3hcf4', displayName: 'Global'}].concat(this.allOus);
        }
        else return this.userOus;
    }

    static getOuNames():string[]{
        return this.namesOnly(this.getOus());
    }

    static getOuId(name){
        return this.allOus.filter(ou=>ou.name===name)[0].id;
    }
}