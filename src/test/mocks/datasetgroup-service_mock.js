function dataSetGroupServiceMock() {
    return {
        datasetGroups: [ 'MER', 'EA' ],
        getDataSetGroupNames: function () {
            return this.datasetGroups;
        },
        getDataSetsForGroup: function () {
            return [];
        }
    }
}
