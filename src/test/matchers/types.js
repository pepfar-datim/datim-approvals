beforeEach(function () {
    this.addMatchers({
        toBeAnObject: function () {
            var result = angular.isObject(this.actual);

            this.message = function () {
                return 'Expected ' + this.actual + (result ? ' NOT' : '') + ' to be an object';
            }
            return result;
        },

        toBeAnArray: function () {
            var result = angular.isArray(this.actual);

            this.message = function () {
                return 'Expected ' + this.actual + (result ? ' NOT' : '') + ' to be an array';
            }
            return result;
        },

        toBeAFunction: function () {
            var result = angular.isFunction(this.actual);

            this.message = function () {
                return 'Expected ' + this.actual + (result ? ' NOT' : '') + ' to be an function';
            }
            return result;
        },

        toBeAPromiseLikeObject: function () {
            var result = angular.isFunction(this.actual.then) &&
                         angular.isFunction(this.actual.catch) &&
                         angular.isFunction(this.actual.finally);

            this.message = function () {
                return 'Expected ' + this.actual + (result ? ' NOT' : '') + ' to have the functions then, catch and finally';
            }
            return result;
        }
    });
});
