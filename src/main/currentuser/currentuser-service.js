function currentUser(Restangular, $q, $log) {
    var permissions;
    var user;

    function loadPermissions() {
        var permissionPromise = Restangular
            .one('me/authorization')
            .get();

        function hasPermission(permissionToCheck) {
            return permissionPromise.then(function (permissions) {
                if (permissions.indexOf(permissionToCheck) > 0) {
                    return true;
                } else {
                    return $q.reject('User does not have this permission');
                }
            });
        }

        permissionPromise.hasPermission = hasPermission;
        return permissionPromise;
    }

    /**
     * Loading of the user profile
     */
    user = Restangular
        .one('me')
        .get({
            fields: 'id,name,displayName,surname,firstName,organisationUnits[id,name,displayName],dataViewOrganisationUnits[id,name,displayName]'
        });

    user = angular.extend(user, {
        valueFor: function (valueKey) {
            if (this[valueKey]) {
                return this[valueKey];
            } else {
                return undefined;
            }
        },
        permissions: loadPermissions()
    });

    user.then(function (response) {
        angular.extend(user, response);
    });

    return user;
}
currentUser.$inject = ["Restangular", "$q", '$log'];

angular.module('PEPFAR.approvals').factory('currentUser', currentUser);
