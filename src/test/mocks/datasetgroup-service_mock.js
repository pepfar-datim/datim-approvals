function dataSetGroupServiceMock(rx) {
    return {
        setCurrentDataSetGroup: function () {},
        dataSetGroups$: rx.Observable.just(['MER', 'EA'])
        // currentDataSetGroup$: currentDataSetGroup$,
        // getDataSetsForGroup: getDataSetsForGroup
    };
}
