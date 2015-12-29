(function() {

  var app = angular.module('myApp.Controllers', []);

  app.controller('MainController', ['$scope', function($scope) {
    $scope.message = "test...";
    
    var yourVideo = document.querySelector('#yours'), 
        theirVideo = document.querySelector('#theirs'),
        yourConnection, theirConnection;

    
    $scope.foo = function(){
      getUserMedia({video: true, audio: false}, function(stream){
        yourVideo.src = window.URL.createObjectURL(stream);
        
        startPeerConnection(stream);
        
        
        
      }, function(error){
        alert("Failed to load camera..."); 
      });
    }
    
    // Fetch the user's camera
    $scope.getCameraAndMicrophone = function(){
      
    };
    
    // Create the connection object(s)
    function startPeerConnection(stream){
      var configuration = {
        "iceServers": [
                       { "url": "stun:stun.1.google.com:19302" }
                      //  { "url": "stun:127.0.0.1:9876"} 
                      ]
      }
      yourConnection = new webkitRTCPeerConnection(configuration);
      theirConnection = new webkitRTCPeerConnection(configuration);
      
      // Begin stream from caller, then attach it as 'them'-element 
      yourConnection.addStream(stream);
      theirConnection.onaddstream = function(e){
        theirVideo.src = window.URL.createObjectURL(e.stream);
      }
      
      // Setup ICE handling 
      yourConnection.onicecandidate = function(event){
        if(event.candidate){
          theirConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
        }  
      }
      
      theirConnection.onicecandidate = function(event){
        if(event.candidate){
          yourConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
        }
      }
      
      // Begin the offer
      yourConnection.createOffer(function(offer){
        yourConnection.setLocalDescription(offer);
        theirConnection.setRemoteDescription(offer);
        
        theirConnection.createAnswer(function(offer){
          theirConnection.setLocalDescription(offer);
          yourConnection.setRemoteDescription(offer);
        });
      });
       
      
    }
    
    
    
    
    
    
    
    
    
  }]);

  app.controller('HeadController', ['$scope', function($scope) {
    $scope.title = "Yajerobe";
  }]);

})();
