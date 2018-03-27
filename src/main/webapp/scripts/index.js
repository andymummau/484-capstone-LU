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
    
$scope.englishInterface = function() {

        $scope.mHold = "Tap and Hold to Capture Audio";
        $scope.mClear = "CLEAR TEXT";
        $scope.mTranslate = "TRANSLATE";
        $scope.mTransHeader = "Translation";
        $scope.mUploadMsg = "Upload your Contribution";
        $scope.mUpload = "Upload";
        $scope.mUploadFill = "Word for Upload";
        $scope.mCancel = "CANCEL";
        $scope.mChoose = "CHOOSE PHOTO";
        $scope.mLanguage = "Select Language";
        $scope.mActivate = "Activate Mic";
        $scope.mClose = "Close";
        $scope.mNewTran = "New Translation";
};
    
$scope.spanishInterface = function() {

        $scope.mHold = "Toque y Mantenga Presionado Para Capturar Audio";
        $scope.mClear = "BORRAR TEXTO";
        $scope.mTranslate = "TRADUCIR";
        $scope.mTransHeader = "Traducción";
        $scope.mUploadMsg = "Cargue Su Contribución";
        $scope.mUpload = "Subir";
        $scope.mUploadFill = "Palabra Para Subir";
        $scope.mCancel = "CANCELAR";
        $scope.mChoose = "ESCOGE UNA FOTO";
        $scope.mLanguage = "Seleccione el Idioma";
        $scope.mActivate = "Activar Micrófono";
        $scope.mClose = "Cerca";
        $scope.mNewTran = "Nueva Traducción";
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
    $scope.chips = ["The","quick","brown","fox","jumps","over","the","lazy","dog"];
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
})