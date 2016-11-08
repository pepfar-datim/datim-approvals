function applyDataSetDisplayRulesFactory(dataSetGroupService) {
    function appliesToCurrentWorkflow(dataSets) {
        return function (rulesDefinition) {
            return dataSets.every(function (dataSet) {
                return (new RegExp(rulesDefinition.workflow)).test(dataSet.name);
            });
        };
    }

    function hasValidRulesDefinition(rulesDefinition) {
        if (rulesDefinition &&
            rulesDefinition.workflow &&
            rulesDefinition.matchPeriodOn.test &&
            rulesDefinition.matchPeriodOn.comparator &&
            rulesDefinition.matchPeriodOn.value
        ) {
            return true;
        }
        return false;
    }

    function buildRulesFromConfig(currentPeriod) {
        return dataSetGroupService
            .getDataSetDisplayRules()
            .filter(hasValidRulesDefinition)
            .filter(appliesToCurrentWorkflow(scope.details.dataSetsFilteredByMechanisms))
            // Check if rule applies to the current periodType
            .filter(function (rulesDefinition) {
                var periodTest = new RegExp(rulesDefinition.matchPeriodOn.test);

                return periodTest.test(currentPeriod);
            })
            // Check if the rule applies to the current period
            .filter(function (rulesDefinition) {
                var fullYear = parseInt(currentPeriod.substring(0, 4), 10);

                switch (rulesDefinition.matchPeriodOn.comparator) {
                    case "gte":
                        return (fullYear >= rulesDefinition.matchPeriodOn.value)
                    case "lt":
                        return (fullYear < rulesDefinition.matchPeriodOn.value)
                }

                return false;
            })
            .map(function (ruleDefinition) {
                return function (dataSet) {
                    // We only want dataSets that are in the list of dataSets from the ruleDefinition
                    return ruleDefinition.dataSets.indexOf(dataSet.id) >= 0;
                };
            })
    }

    function applyDataSetDisplayRules(dataSets, period) {
        var rules = buildRulesFromConfig(period);

        // When rules are available run them
        if (rules.length) {
            return rules.reduce(function (dataSets, ruleFn) {
                return dataSets.filter(ruleFn);
            }, dataSets);
        }

        return dataSets;
    }

    return applyDataSetDisplayRules;
}

angular.module('PEPFAR.approvals').factory('applyDataSetDisplayRules', applyDataSetDisplayRulesFactory);
