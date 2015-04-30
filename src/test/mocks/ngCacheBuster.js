angular.module('ngCacheBuster', [])
    .provider('httpRequestInterceptorCacheBuster', function () {
        return {
            setMatchlist: jasmine.createSpy(),
            $get: function () {
                return {};
            }
        }
    });