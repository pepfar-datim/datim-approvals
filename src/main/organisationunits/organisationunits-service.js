function organisationunitsService(Restangular, rx) {
    function requestOrganisationUnitsForLevel(orgUnitId, orgUnitLevel) {
        var queryParams = {
            fields: 'id,name,displayName',
            level: orgUnitLevel,
            paging: 'false'
        };

        var organisationUnitRequest = Restangular
            .all('organisationUnits')
            .get(orgUnitId, queryParams)
            .then(function (organisationUnitData) {
                return organisationUnitData.organisationUnits;
            });

        return rx.Observable.fromPromise(organisationUnitRequest);
    }

    return {
        currentOrganisationUnit: {},
        requestOrganisationUnitsForLevel: requestOrganisationUnitsForLevel
    };
}

angular.module('PEPFAR.approvals').factory('organisationunitsService', organisationunitsService);
