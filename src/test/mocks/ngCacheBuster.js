angular.module('ngCacheBuster', [])
    .provider('httpRequestInterceptorCacheBuster', function () {
        return {
            setMatchlist: sinon.spy(),
            $get: function () {
                return {};
            }
        }
    });
