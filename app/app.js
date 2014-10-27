(function () {

  angular.module('MyApp', [
    'ngRoute',
    'ngSanitize'
  ])
  // App configuration
  .config(function ($routeProvider, $locationProvider, $controllerProvider, $provide, $compileProvider) {
    // Saving provider references
    var _app = angular.module('MyApp');
    _app.controller = $controllerProvider.register;
    _app.factory = $provide.factory;
    _app.directive = $compileProvider.directive;

    // Dependencies resolver
    function fetch (urls) {
      return {
          load: ['$q', '$rootScope', function ($q, $rootScope) {
              var deferred = $q.defer();

              urls.forEach(function (url, i) {
                require([url], function () {
                  $rootScope.$apply(function () {
                      deferred.resolve();
                  });
                });
              });

              return deferred.promise;
          }]
        };
    }

    // Router settings
    $routeProvider
      .when('/', {
        templateUrl : 'app/modules/index/indexTemplate.html',
        controller : 'IndexController',
        controllerAs : 'index',
        resolve : fetch(['app/modules/index/indexController.js'])
      })
      .otherwise({ redirectTo : '/' });
  })
  // App runtime definitions
  .run(function ($rootScope, $http, $location) {
    // History tracking
    var BrowserHistory = [];

    // Global location functions
    $rootScope.getPreviousPage = function () { return BrowserHistory.length > 1 ? BrowserHistory.splice(-2)[0] : '/'; };
    $rootScope.changeLocation = function (url) { $location.path(url); };

    // Activities post-routing
    $rootScope.$on('$routeChangeSuccess', function () {
      // Keeping track of the history
      BrowserHistory.push($location.$$path);

      // Window activity check
      $rootScope.isWindowActive = true;

      window.onblur = function () { $rootScope.isWindowActive = false; };
      window.onfocus = function () { $rootScope.isWindowActive = true; };
    });
  });

})();