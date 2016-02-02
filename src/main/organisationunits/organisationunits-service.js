function organisationunitsService(d2Api) {
    this.currentOrganisationUnit = {};

    this.requestOrganisationUnitsForLevel = function (orgUnitId, orgUnitLevel) {
        return d2Api.organisationUnits.get(orgUnitId, {
            fields: 'id,name,displayName',
            level: orgUnitLevel,
            paging: 'false'
        }).then(function (organisationUnitData) {
            return organisationUnitData.organisationUnits;
        });
    };

    d2Api.addEndPoint('organisationUnits');
}

angular.module('PEPFAR.approvals').service('organisationunitsService', organisationunitsService);
