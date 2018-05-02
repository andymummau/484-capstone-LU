//-----Initalize AngularJS app-----
var app = angular
 .module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngMdIcons', 'ngAnimate', 'ui', 'ngSanitize', 'ui.bootstrap']);

//-----Color Theming config-----
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

//-----Primary AngularJS controller-----
app.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $mdDialog, $http, $interval) {
 $scope.selectLanguage = function(ev) {
  $mdDialog.show({
   controller: DialogController,
   templateUrl: "templates/langSelect.html",
   targetEvent: ev,
   scope: angular.extend($scope.$new(), {
    close: function() {
     $mdDialog.cancel();
    }
   }),
  })
 };

//-----Diaglog pop-up Controller-----
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

//-----Variables for bilingual interface-----
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
  $scope.mHold = "Toca para Capturar Audio";
  $scope.mClear = "BORRAR TEXTO";
  $scope.mTranslate = "TRADUCIR";
  $scope.mTransHeader = "Traducción";
  $scope.mUploadMsg = "Cargue su Contribución";
  $scope.mUpload = "Subir";
  $scope.mUploadFill = "Palabra para Subir";
  $scope.mCancel = "CANCELAR";
  $scope.mChoose = "ESCOGE UNA FOTO";
  $scope.mLanguage = "Seleccione el Idioma";
  $scope.mActivate = "Activar Micrófono";
  $scope.mClose = "Cerca";
  $scope.mNewTran = "Nueva Traducción";
 };

//-----Loading Icon while retrieving from APIs-----
 $scope.loadingIcon = function() {
  $scope.loading = true;
 };
 $scope.cancelLoadingIcon = function() {
  $scope.loading = false;
 };
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

//-----Upload dialog pop-up box-----
 $scope.upload = function(ev) {
  $mdDialog.show({
    controller: DialogController,
    templateUrl: "templates/upload.html",
    targetEvent: ev,
    scope: angular.extend($scope.$new(), {
     close: function() {
      $mdDialog.cancel();
     }
    }),
   })
 }

//-----Get sentence from WATSON API and store to a variable-----
 $scope.printSentence = function() {
   try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '//luwatsonproxy.mybluemix.net/WatsonProxy/api/speech-to-text/token', true);
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
       if (data.results[0] && data.results[0].final) {
        stream.stop();
        console.log('---------Stoping Stream...----------');
        //Send final sentence to DB for further processing in Java backend
         $scope.postTranslation = function() {$http({
          method: 'POST',
          url: 'api/sentenceAPI',
          data: JSON.stringify({
           'translationID': Date.now(),
           'fullSentence': $scope.capturedSentence
          }),
          headers: {
           'Content-type': 'application/json'
          }
         })
         console.log("POST: " + $scope.capturedSentence)
        }
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
   catch (error) {
    console.log(error);
   }
  }

//-----View Translation pop-up dialog-----
 $scope.viewTranslation = function(ev) {
  $http.get("api/sentenceAPI") //api/results
    //If DB call is successful
    .then(function(response) {
     $scope.translationResults = response.data;
     console.log("Retriving Sentence from Database...");
     $mdDialog.show({
      controller: DialogController,
      templateUrl: "templates/translationSlider.html",
      targetEvent: ev,
      scope: angular.extend($scope.$new(), {
       close: function() {
        $mdDialog.cancel();
       }
      }),
      clickOutsideToClose: true,
      fullscreen: true // Only for -xs, -sm breakpoints.
     })
      var slides = $scope.slides = [];
 var currIndex = 0;
 var wordCount = $scope.translationResults.sentenceChunks.length;
 var carouselUrl = $scope.translationResults.url;
 var captionText = $scope.translationResults.sentenceChunks;
      
       //Push each database item onto a stack for carousel to loop through
 for (var i = 0; i < wordCount; i++) {
  slides.push({
   image: carouselUrl[i],
   text: captionText[i],
   id: currIndex++
  });
 }
    })
 };

//-----Disable/Show UI elements as needed-----
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

//-----Translation Carousel-----
  //Retrieve final translation from database with URL
  /*$scope.translationResults = {
  "_id": "ea19d1becb5c9ce618a5eb4a7996253f",
  "_rev": "2-ccf2dabc45645cba74e8fa13ef17bf2d",
  "translationID": "201804051800",
  "fullSentence": "the quick brown fox jumps over the lazy dog",
  "sentenceChunks": ["brown", "fox", "jumps", "lazy", "dog"],
  "url": ["videos/brown.mp4", "videos/fox.mp4", "videos/jumped.mp4", "videos/lazy.mp4", "videos/dog.mp4"]
 }*/
 //Carousel Parameters
 $scope.myInterval = 3000;
 $scope.pauseButton = false;
 $scope.playButton = true;
 $scope.noWrapSlides = false;
 $scope.active = 0;
 
 //Pause Carousel
 $scope.pauseCarousel = function() {
  $scope.pauseButton = true;
  $scope.playButton = false;
  $scope.myInterval = 0;
 }
 //Play Carousel
 $scope.playCarousel = function() {
  $scope.pauseButton = false;
  $scope.playButton = true;
  $scope.myInterval = 3000;
 }

})

app.directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});