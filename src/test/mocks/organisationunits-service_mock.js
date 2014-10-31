function organisationunitsServiceMock() {
    return {
        requestOrganisationUnitsForLevel: function () {
            return {
                then: function () {
                    return fixtures.get('organisationUnitsForLevelThree')
                }
            }
        }
    }
}
