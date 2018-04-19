angular
    .module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngMdIcons', 'ngAnimate', 'ui', 'jkAngularCarousel', 'ui.carousel'])

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
        templateUrl: "templates/langSelect.html",
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
    $http.get('../testSlider.json')
    .then(function(response) {
        $scope.dataArray = response.data;
        console.log("Retriving from Database...");
        $mdDialog.show({
            controller: DialogController,
            templateUrl: "templates/translationSlider.html",
            targetEvent: ev,
            scope: angular.extend($scope.$new(), { close: function() {$mdDialog.cancel();} }),
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        })
    })
    /*.then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });*/
};
$scope.englishInterface = function() {
        $scope.mHold = "Tap to Capture Audio";
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
        $scope.mHold = "Toque Presionado Para Capturar Audio";
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
        templateUrl: "templates/upload.html",
        targetEvent: ev,
        scope: angular.extend($scope.$new(), { close: function() {$mdDialog.cancel();} }),
    })
    /*.then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });*/
}
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
//Get sentence from WATSON API and store to a variable
$scope.printSentence = function() {
try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://luwatsonproxy.mybluemix.net/WatsonProxy/api/speech-to-text/token', true);
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
                    $scope.capturedSentence = data.results[0].alternatives[0].transcript;
                    console.log("Intermediary Transcript: " + $scope.capturedSentence);
                });
                //Tell Watson to wrap up speech capture after pause and create final transcript
                if(data.results[0] && data.results[0].final) {
                    stream.stop();
                    console.log('---------Stoping Stream...----------');
                    //Send final sentence to DB for further processing in Java
                    $scope.formSubmit = function() {
                        $http({
                            method: 'POST',
                            url: 'api/translate',
                            data: JSON.stringify({'fullSentence': $scope.capturedSentence }),
                            headers: {
                                'Content-type': 'application/json'
                            }
                        })
                    };
                    console.log('Final Sentence: ' + $scope.capturedSentence)
                }
                //Enable Translate button
                document.getElementById("transButton").removeAttribute("disabled");
            });
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
}
//Enable clear button after sentence is output
$scope.clearSentenceActive = function() {
    document.getElementById("clearButton").removeAttribute("disabled");
}
    //Disable clear button after using
$scope.clearSentenceDisable = function() {
    $scope.capturedSentence = null;
    document.getElementById("clearButton").setAttribute("disabled", "disabled");
}
//Disable translate button
$scope.disableTrans = function() {
   document.getElementById("transButton").setAttribute("disabled", "disabled");
}
})