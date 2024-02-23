import {Mechanism} from '@approvals/service'

export function sortMechanismsByCodeAndOu(mechanisms:Mechanism[]){
    mechanisms.sort(function(mechanism1:Mechanism, mechanism2:Mechanism){
        const {info: {ouName:ouName1}} = mechanism1
        const {info: {ouName:ouName2}} = mechanism2
        return ouName1<ouName2?1:-1
    })
}