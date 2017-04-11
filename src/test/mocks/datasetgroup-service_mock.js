function dataSetGroupServiceMock(rx) {
    return {
        setCurrentDataSetGroup: function () {},
        dataSetGroups$: rx.Observable.just([
            { name: 'MER' },
            { name: 'EA' }
        ])
        // currentDataSetGroup$: currentDataSetGroup$,
        // getDataSetsForGroup: getDataSetsForGroup
    };
}
