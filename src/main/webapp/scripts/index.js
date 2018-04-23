var app= angular
    .module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngMdIcons', 'ngAnimate', 'ui', 'ngSanitize', 'ui.bootstrap']);

//Color Theming config
app.config(function($mdThemingProvider) {
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
app.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $mdDialog, $http, $interval) {
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
        console.log("Retriving Sentence from Database...");
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

$scope.loadingScreen = function() {
    $scope.loading = true;
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

var self = this;
self.activated = true;
self.determinateValue = 30;

      // Iterate every 100ms, non-stop and increment
      // the Determinate loader.
$interval(function() {
    self.determinateValue += 1;
        if (self.determinateValue > 100) {
            self.determinateValue = 30;
        }
}, 100);




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

//Carousel
  $scope.myInterval = 3000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;


  $scope.data = {
  "_id": "ea19d1becb5c9ce618a5eb4a7996253f",
  "_rev": "2-ccf2dabc45645cba74e8fa13ef17bf2d",
  "translationID": "201804051800",
  "fullSentence": "the quick brown fox jumps over the lazy dog",
  "sentenceChunks": ["brown", "fox", "jumps", "lazy", "dog"],
  "url": ["videos/brown.mp4", "videos/fox.mp4", "videos/jumped.mp4", "videos/lazy.mp4", "videos/dog.mp4"]
}

var wordCount = $scope.data.sentenceChunks.length;
var carouselUrl = $scope.data.url;
var captionText = $scope.data.sentenceChunks;

  for (var i = 0; i < wordCount; i++) {
    slides.push({
      image: carouselUrl[i],
      text: captionText[i],
      id: currIndex++
    });
  }
})