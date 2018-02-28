angular
    .module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngMdIcons', 'ngAnimate'])

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
        scope: angular.extend($scope.$new(), { close: function() {$mdDialog.cancel();} }),
    })
    /*.then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });*/
};
$scope.upload = function(ev) {
    $mdDialog.show({
        controller: DialogController,
        templateUrl: "../templates/upload.html",
        targetEvent: ev,
        scope: angular.extend($scope.$new(), { close: function() {$mdDialog.cancel();} }),
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
//Temporarily clear code for demonstration
$scope.clearSentence = function() {
    $scope.chips = [];
}

//Enables translate button
$scope.enableTrans = function() {
   document.getElementById("transButton").removeAttribute("disabled");
}

$scope.disableTrans = function() {
   document.getElementById("transButton").setAttribute("disabled", "disabled");
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
        $scope.index = 0;

    
//Slider Stuff
  $scope.images = [
    'https://media.giphy.com/media/26FL1Z4aQQggwu57G/giphy.gif',
    'https://media.giphy.com/media/3o6Zt75NDGTAIeydck/giphy.gif',
    'https://media.giphy.com/media/l4q7X9WikgtfBKmCQ/giphy.gif',
    'https://media.giphy.com/media/l0MYtTptyL8h88UHm/giphy.gif',
    'https://media.giphy.com/media/l0HlBGjKUV8KJxDoc/giphy.gif'
  ];
  
  // callbacks for change in slides
  $scope.updateTsPrevious = function() {
    $scope.tsPrevious = +new Date();
  };
  $scope.updateTsNext = function() {
    $scope.tsNext = +new Date();
  };

})

//Animated Slider
.directive('wallopSlider', function () {
    return {
      template: '<div class="wallop-slider {{animationClass}}"><ul class="wallop-slider__list"><li class="wallop-slider__item {{itemClasses[$index]}}" ng-repeat="i in images"><img src="{{i}}"></li></ul><button ng-show="images.length>1" class="st-button wallop-slider__btn wallop-slider__btn--previous btn btn--previous" ng-disabled="prevDisabled" ng-click="onPrevButtonClicked()">Previous</button><button ng-show="images.length>1" class="st-button wallop-slider__btn wallop-slider__btn--next btn btn--next" ng-disabled="nextDisabled" ng-click="onNextButtonClicked()">Next</button></div>',
      restrict: 'EA',
      transclude: true,
      replace: false,
      scope: {
        images: '=',
        animation: '@',
        currentItemIndex: '=',
        onNext: '&',
        onPrevious: '&'
      },
      controller: function($scope, $timeout) {

        $scope.itemClasses = [];

        $scope.$watch('images', function(images) {
          if (images.length) {
            _goTo(0);
          }
        });

        $scope.$watch('itemClasses', function(itemClasses) {
          console.log('itemClasses', itemClasses);
        });

        // set animation class corresponding to animation defined in CSS. e.g. rotate, slide
        if ($scope.animation) {
          $scope.animationClass = 'wallop-slider--' + $scope.animation;
        }

        var _displayOptions = {
          btnPreviousClass: 'wallop-slider__btn--previous',
          btnNextClass: 'wallop-slider__btn--next',
          itemClass: 'wallop-slider__item',
          currentItemClass: 'wallop-slider__item--current',
          showPreviousClass: 'wallop-slider__item--show-previous',
          showNextClass: 'wallop-slider__item--show-next',
          hidePreviousClass: 'wallop-slider__item--hide-previous',
          hideNextClass: 'wallop-slider__item--hide-next'
        };

        function updateClasses() {
          if ($scope.itemClasses.length !== $scope.images.length) {
            $scope.itemClasses = [];
            for (var i=0; i<$scope.images.length; i++) {
              $scope.itemClasses.push('');
            }
          }
        }
        function _nextDisabled() {
          console.log('$scope.currentItemIndex', $scope.currentItemIndex, $scope.images.length);

          return ($scope.currentItemIndex + 1) === $scope.images.length;
        }
        function _prevDisabled() {
          return !$scope.currentItemIndex;
        }
        function _updatePagination() {
          $scope.nextDisabled = _nextDisabled();
          $scope.prevDisabled = _prevDisabled();
        }
        function _clearClasses() {
          for (var i=0; i<$scope.images.length; i++) {
            $scope.itemClasses[i] = '';
          }

        }

        // go to slide
        function _goTo(index) {
          console.log('_goTo', index);
          if (index >= $scope.images.length || index < 0 || index === $scope.currentItemIndex) {

            if (!index) {
              $scope.itemClasses[0] = _displayOptions.currentItemClass;
            }
            return;
          }

          _clearClasses();

          $scope.itemClasses[$scope.currentItemIndex] = (index > $scope.currentItemIndex) ? _displayOptions.hidePreviousClass : _displayOptions.hideNextClass;

          var currentClass = (index > $scope.currentItemIndex) ? _displayOptions.showNextClass : _displayOptions.showPreviousClass;
          $scope.itemClasses[index] = _displayOptions.currentItemClass + ' ' + currentClass;

          $scope.currentItemIndex = index;

          _updatePagination();

        }

        // button event handlers
        // consider using the ng-tap directive to remove delay
        $scope.onPrevButtonClicked = function () {
          _goTo($scope.currentItemIndex - 1);
        };
        $scope.onNextButtonClicked = function () {
          _goTo($scope.currentItemIndex + 1);
        };
        
        $scope.$watch('currentItemIndex', function(newVal, oldVal) {
          if (oldVal > newVal) {
            if (typeof $scope.onPrevious === 'function') {
              $scope.onPrevious();
            }
          } else {
            if (typeof $scope.onNext === 'function') {
              $scope.onNext();
            }
          }
        });

      }
    };
});