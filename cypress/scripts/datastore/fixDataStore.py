import api


def fetchDataStore():
    return api.get('dataStore/approvals/periodSettings', {})

def fixDates(dataStore):
    dataStore["MER Results"]["2019Q3"]["end"] = "Dec 23 2025 16:00:00 GMT-0500"
    dataStore["MER Targets"]["2019Oct"]["end"] = "Dec 23 2025 16:00:00 GMT-0500"
    dataStore["ER Expenditures FYOct"]["2018Oct"]["end"] = "Dec 23 2025 16:00:00 GMT-0500"
    return dataStore

def saveDataStore(dataStore):
    api.put('dataStore/approvals/periodSettings', dataStore)

dataStore = fetchDataStore()
dataStore = fixDates(dataStore)
saveDataStore(dataStore)