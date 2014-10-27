// Index controller
(function () {
  angular.module('MyApp').controller('IndexController', Index);

  // Angular Dependency injection
  Index.$inject = [];

  // Controller ViewModel
  function Index () {
    var self = this;

    self.moduleStatus = "Under construction";
    self.moduleRandom = Math.random();
    self.random = sampleFunction;

    function sampleFunction () {
      return self.moduleRandom;
    }
  }

})();
