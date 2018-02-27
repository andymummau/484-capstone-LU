angular
    .module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngMdIcons'])

//Color Theming config
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

//Primary controller
.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $mdDialog, $http) {
$scope.selectLanguage = function(ev) {
    $mdDialog.show({
        controller: DialogController,
        templateUrl: "../templates/langSelect.html",
        targetEvent: ev,
        scope: angular.extend($scope.$new(), { close: function() {$mdDialog.cancel();} }),
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
};
//Temporay code to demonstrate proof-of-concept    
$scope.printSentence = function() {
    $scope.chips = ["The","quick","blue","fox","jumps","over","the","lazy","dog"];
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
});