angular
    .module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngMdIcons', 'ngAnimate', 'ui'])

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
//Get sentence from WATSON API and store to a variable    
$scope.printSentence = function() {
try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://luwatsonproxy.mybluemix.net/WatsonProxy/api/speech-to-text/token', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // Got the token back from the Proxy
            var token = xhr.responseText;
            console.log("---------WATSON TOKEN Loaded--------");
            var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
                token: token,
                objectMode: true
            });
            //Capture raw JSON data from API
            stream.on('data', function(data) {
                $scope.$apply(function() {
                    $scope.chips = data.results[0].alternatives[0].transcript;
                });
                console.log("Transcript: " + $scope.chips); 
            });
            //Tell Watson to wrap up speech capture and create final transcript
            $scope.stopCapture = function() {
                stream.stop();
                console.log("-------Stoping Stream...--------");
                //Enable "Translate" button
                document.getElementById("transButton").removeAttribute("disabled");
            };
            //Error handling
            stream.on('error', function(err) {
                console.log(err);
            });
        }
    }
}
//Error handling
catch(error) {
    console.log(error);
}
//Enable clear button after sentence is output
document.getElementById("clearButton").removeAttribute("disabled");
};
//Temporarily clear code for demonstration
$scope.clearSentence = function() {
    $scope.chips = [];
    //Disable clear button after using
    document.getElementById("clearButton").setAttribute("disabled", "disabled");
}

//Enables translate button
$scope.enableTrans = function() {
   document.getElementById("transButton").removeAttribute("disabled");
}
//Disables Translate button
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