function organisationunitsService(d2Api) {
    this.currentOrganisationUnit = {};

    this.requestOrganisationUnitsForLevel = function (orgUnitLevel) {
        return d2Api.organisationUnits.getList({
            fields: 'id,name',
            filter: 'level:eq:' + orgUnitLevel,
            paging: 'false'
        });
    };

    d2Api.addEndPoint('organisationUnits');
}

angular.module('PEPFAR.approvals').service('organisationunitsService', organisationunitsService);
