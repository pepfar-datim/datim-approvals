import {fetchMechanisms} from "../../modules/list/services/mechanisms.service";
import {testAs} from "@pepfar-react-lib/http-tools";
import {TestCase, testCases} from "./3.fetchMechanisms.data";



function fetchMechsTest({name, filters, mechanisms,isSuperUser}:TestCase) {
    test(`#3 > Fetch mechanisms > ${name}`, async () => {
        testAs('superAdmin');
        let actualMechs = await fetchMechanisms(filters, isSuperUser);
        expect(actualMechs).toStrictEqual(mechanisms)
    });
}

testCases.map(fetchMechsTest)