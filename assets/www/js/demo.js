$("#notificationpage").live("pagecreate", function(event) {

	alertDismissed = function(){
	}
	
	$("#alertLink").live("click",function(e) {
		navigator.notification.alert('You did the alert!', // message
		 alertDismissed, // callback
		 'Alert Demo', // title
		 'Done' // buttonName
		);
		e.preventDefault();
	});

	onConfirm = function(button) {
	    alert('You selected button ' + button);
	}

	// Show a custom confirmation dialog
	//
	$("#confirmLink").live("click",function(e) {
	    navigator.notification.confirm(
	        'You did the confirm!',  // message
	        onConfirm,              // callback to invoke with index of button pressed
	        'Confirm Demo',            // title
	        'Restart,Exit'          // buttonLabels
	    );
		e.preventDefault();
	});

	$("#beepLink").live("click", function() {
		navigator.notification.beep(2);
	});

	$("#vibrationLink").live("click", function() {
		navigator.notification.vibrate(2000);
	});
	
});

$("#devicepage").live("pagecreate", function(event) {

	//load up device info as a string
	var s = "";
	s += "Device Name: " +  device.name + "<br/>";
	s += "Phonegap Version: " + device.phonegap + "<br/>";
	s += "Platform: " + device.platform + "<br/>";
	s += "UUID: " + device.uuid + "<br/>";
	s += "OS Version: " + device.version + "<br/>";
	
	$("#content",this).html(s);

});

$("#connectionpage").live("pagecreate", function(event) {

	var networkState = navigator.network.connection.type;
	var states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.NONE]     = 'No network connection';

	var s = "";
	s = "Connection Type: " + states[networkState] + "<br/>";
		
	$("#content",this).html(s);

});

$("#accelerometerpage").live("pagecreate", function(event) {
	var page = $("#accelerometerpage");
	var watchID = null;
	
	onCurrentSuccess = function(acceleration) {
		var s = 'Acceleration X: ' + acceleration.x + '<br/>' +
	          'Acceleration Y: ' + acceleration.y + '<br/>' +
	          'Acceleration Z: ' + acceleration.z + '<br/>' +
	          'Timestamp: '      + new Date(acceleration.timestamp) + '<br/>';
		$("#status",page).html(s);
	};
	
	function onAccError() {
		$("#status",page).html("An error with the accelerometer. Sorry");
	};
	
	$("#currentLink").live("click",function(e) {
		$("#status",page).html("Getting accelerometer...<br/>");
		navigator.accelerometer.getCurrentAcceleration(onCurrentSuccess, onAccError);
		e.preventDefault();
	});

	$("#startTrackingLink").live("click",function(e) {
		$("#status",page).html("Tracking began...<br/>");
		watchID = navigator.accelerometer.watchAcceleration(onCurrentSuccess, onAccError,{frequency:1000});
		e.preventDefault();
	});

	$("#stopTrackingLink").live("click",function(e) {
		$("#status",page).html("Tracking stopped...<br/>");
		if (watchID) {
			navigator.accelerometer.clearWatch(watchID);
			watchID = null;
		}
		e.preventDefault();
	});

	
});

$("#compasspage").live("pagecreate", function(event) {
	var page = $("#compasspage");
	var watchCompassID = null;
	
	onCurrentCompassSuccess = function(heading) {
		var s = 'Heading: ' + heading + '<br/>';
		$("#status",page).html(s);
	};
	
	function onCompassError() {
		$("#status",page).html("An error with the compass. Sorry");
	};
	
	$("#currentLink",page).live("click",function(e) {
		$("#status",page).html("Getting compass...<br/>");
		navigator.compass.getCurrentHeading(onCurrentCompassSuccess, onCompassError);
		e.preventDefault();
	});

	$("#startTrackingLink",page).live("click",function(e) {
		$("#status",page).html("Tracking began...<br/>");
		watchCompassID = navigator.compass.watchHeading(onCurrentCompassSuccess, onCompassError);
		e.preventDefault();
	});

	$("#stopTrackingLink",page).live("click",function(e) {
		$("#status",page).html("Tracking stopped...<br/>");
		if (watchCompassID) {
			navigator.compass.clearWatch(watchCompassID);
			watchCompassID = null;
		}
		e.preventDefault();
	});

	
});

$("#geolocationpage").live("pagecreate", function(event) {
	var page = $("#geolocationpage");
	var watchGeoID = null;
	
	onCurrentGeoSuccess = function(position) {

		var s = 'Latitude: '    + position.coords.latitude          + '<br/>' +
          'Longitude: '         + position.coords.longitude         + '<br/>' +
          'Altitude: '          + position.coords.altitude          + '<br/>' +
          'Accuracy: '          + position.coords.accuracy          + '<br/>' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br/>' +
          'Heading: '           + position.coords.heading           + '<br/>' +
          'Speed: '             + position.coords.speed             + '<br/>' +
          'Timestamp: '         + new Date(position.timestamp)      + '<br/>';
		  
		$("#status",page).html(s);
	};
	
	onGeoError = function() {
		$("#status",page).html("An error with the geolocation. Sorry");
	};
	
	$("#currentLink",page).live("click",function(e) {
		$("#status",page).html("Getting location...<br/>");
		navigator.geolocation.getCurrentPosition(onCurrentGeoSuccess, onGeoError);
		e.preventDefault();
	});

	$("#startTrackingLink",page).live("click",function(e) {
		$("#status",page).html("Tracking began...<br/>");
		watchGeoID = navigator.geolocation.watchPosition(onCurrentGeoSuccess, onGeoError);
		e.preventDefault();
	});

	$("#stopTrackingLink",page).live("click",function(e) {
		$("#status",page).html("Tracking stopped...<br/>");
		if (watchGeoID) {
			navigator.geolocation.clearWatch(watchGeoID);
			watchGeoID = null;
		}
		e.preventDefault();
	});

	
});

$("#contactpage").live("pagecreate", function(event) {
	var page = this;
	
	$("#createContactLink").live("click",function(e) {
		$("#status",page).html("Creating a contact...<br/>");
		var contact = navigator.contacts.create({
			"displayName": "Random Dude" + Math.floor(Math.random()*100)
			});
		contact.save();
		$("#status",page).html("Done. Made "+contact.displayName+".<br/>");
		
		e.preventDefault();
	});

	contactError = function() {
		$("#status",page).html("An error with the contact search. Sorry");
	};

	contactSuccess = function(contacts){
		var s = "";
		
		s = "Found "+contacts.length +" contacts...<br/>";
		for (var i=0;i<contacts.length;i++) {
			var contact = contacts[i];

			if (contact.photos && contact.photos.length) {				
				for(var z=0; z < contact.photos.length; z++) {
					if (contact.photos[z].type == "url" && contact.photos[z].value.length > 0) {
						s += "<img src='" + contact.photos[z].value + "' align='left'>";
						break;
					}					
				}
			}
						
			s+= "<h2>" + contact.displayName + "</h2>";

			if (contact.phoneNumbers && contact.phoneNumbers.length) {				
				for(var z=0; z < contact.phoneNumbers.length; z++) {
					s+= "<b>" + contact.phoneNumbers[z].type + ":</b> " + contact.phoneNumbers[z].value + "<br/>";
				}
			}
			
			s += "<br clear='left'><p/>";

		}
		
		$("#status",page).html(s);
	
	};
	
	$("#contactsearch").live("click", function(e) {
		var searchterm = $.trim($("#contactname").val());
		if(searchterm == "") return;
		$("#status",page).html("Searching contacts...<br/>");
		var fields = ["*"];
		var options = new ContactFindOptions();
		options.filter = searchterm;
		options.multiple = true;
				
		navigator.contacts.find(fields, contactSuccess, contactError, options);
		e.preventDefault();
	});
	
});

$("#camerapage").live("pagecreate", function(event) {
	var page = this;

	
	onCamSuccess = function(imageData) {
		var image = $("#camImg")[0];
   		image.src = "data:image/jpeg;base64," + imageData;
	};
	
	onCamError = function() {
		$("#status",page).html("An error with the camera. Sorry");
	};
	
	$("#newPicLink").live("click",function(e) {
		navigator.camera.getPicture(onCamSuccess,onCamError, {sourceType:Camera.PictureSourceType.CAMERA, quality:50, targetWidth: 200, targetHeight:200});
		e.preventDefault();
	});

	$("#existingPicLink").live("click",function(e) {
		navigator.camera.getPicture(onCamSuccess,onCamError, {sourceType:Camera.PictureSourceType.PHOTOLIBRARY, quality:50, targetWidth: 200, targetHeight: 200});
		e.preventDefault();
	});
	
});

//Credit for a lot of this logic goes to @Jagautier, Julian Gautier. I had a REAL hard
//time with the deferred stuff and he helped quite a bit.
$("#capturepage").live("pagecreate", function(event) {
	var page = this;

	var deferredTask = function(mediafile){
		var dfd = $.Deferred();
		mediafile.getFormatData(function(r){
			dfd.resolve(r)
		});
		return dfd.promise();
	};

	onCaptureSuccess = function(mediaFiles){
		var dTasks = [];
		var results = [];
		var s = "";
		$("#status",page).html(s);

		for (var i = 0; i < mediaFiles.length; i++) {
			var mf = mediaFiles[i];
			(function(mf) {
			dTasks.push(deferredTask(mf).then(function(data) {
				var topData = {
					media: mf,
					data: data
				};
				results.push(topData);
			}));
			})(mf);
		}
		
		$.when.apply(null,dTasks).done(function() {
			s += results.length + ' media items captured.<p/>';	
			for (var i = 0; i < results.length; i++) {
				var result = results[i];
				s+=results[i].media.fullPath + ' ['+result.media.size + ']<br/>';
				//will always be now, but show it anyway
				s+=new Date(result.media.lastModifiedDate) + '<br/>';
				s+= 'Mime: '+results.type+'<br/>';
				//format stuff
				s+= 'Bitrate: '+result.data.bitrate+'<br/>';
				s+= 'Height: '+result.data.height+'<br/>';
				s+= 'Width: '+result.data.width+'<br/>';
				s+= 'Duration: '+result.data.duration+'<br/>';
				s+= '<p/>';
			}
			$("#status",page).html(s);
		});

		
	};
	
	onCaptureError = function() {
		$("#status",page).html("An error with the capture. Sorry");
	};

	$("#captureAudioLink").live("click",function(e) {
		navigator.device.capture.captureAudio(onCaptureSuccess,onCaptureError, {});
		e.preventDefault();
	});

	$("#capturePictureLink").live("click",function(e) {
		navigator.device.capture.captureImage(onCaptureSuccess,onCaptureError, {limit:2});
		e.preventDefault();
	});

	$("#captureVideoLink").live("click",function(e) {
		navigator.device.capture.captureImage(onCaptureSuccess,onCaptureError, {});
		e.preventDefault();
	});
	
});

window.onerror = function() {
    alert("Error caught");
};
