angular
    .module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngMdIcons'])

.config(function($mdThemingProvider) {

  $mdThemingProvider.theme('default')
    .primaryPalette('blue', {
      'default': '800',
      'hue-1': '500', 
      'hue-2': '800',
      'hue-3': 'A200'
    })
    .accentPalette('light-blue', {
      'default': 'A200'
    });
})

.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $mdDialog, $http) {
    $scope.toggleLeft = buildToggler('left');
    
    function buildToggler(componentId){
        return function(){
            $mdSidenav(componentId).toggle();
        };
    }
    $scope.menu = [
    {
      link : '',
      title: 'Change Language',
      icon: 'language'
    },
    {
      link : '#',
      title: 'Upload',
      icon: 'playlist_add'
    }
  ];
    $scope.selectLanguage = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: "../templates/langSelect.html",
      targetEvent: ev,
    })
    /*.then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });*/
  };
    $scope.viewTranslation = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: "../templates/translationSlider.html",
      targetEvent: ev,
    })
    /*.then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });*/
  };
    function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  }
    $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
    }
   //$scope.chips = $http.get('api/visitors');

   /*$http.get("api/visitors")
     .success(function(name) {
       $scope.chips = name;
       console.log("Your name is: " + name);
     })
     .error(function(response, status) {
       console.log("The request failed with response " + response + " and status code " + status);
     });*/

   //console.log($scope.chips);
   $scope.chips = ["The","quick","blue","fox","jumps","over","the","lazy","dog"];
});

/*angular
    .module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildDelayedToggler('left');

};*/
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
   /* function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }*/

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    /*function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }
  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  });*/
/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/