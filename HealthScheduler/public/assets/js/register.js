// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDryIOo95hphK_njejU0M5g7iEHT4OY2Ow",
    authDomain: "healthscheduler-834e9.firebaseapp.com",
    databaseURL: "https://healthscheduler-834e9.firebaseio.com",
    projectId: "healthscheduler-834e9",
    storageBucket: "healthscheduler-834e9.appspot.com",
    messagingSenderId: "1081449165079",
    appId: "1:1081449165079:web:ad0897787ad0bd310c0752",
    measurementId: "G-8WKMXG4700"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

function signup() {
	const db = firebase.firestore();	
	const auth = firebase.auth();
	const phoneNumberEmail = document.getElementById("email_input_register").value;
	const passwordRegister = document.getElementById("password_input_register").value;
	const username = document.getElementById("nome_input").value;
	const address = document.getElementById("morada_input").value;

	auth.createUserWithEmailAndPassword(phoneNumberEmail, passwordRegister)
	.then((user) => {
		auth.signInWithEmailAndPassword(phoneNumberEmail, passwordRegister)
		.then((user) => {
			auth.onAuthStateChanged(function(user) {
				if (user) {
					const uid = "" + user.uid;
					
					var imagePath = "" + swapImage();

					console.log(imagePath);

					db.collection('users_medic').doc("" + uid).set({
						address,
						imagePath,
						phoneNumberEmail,
						uid,
						username
					});

					//setTimeout(function(){ window.location = "login.html"; }, 2000);

				} else {
					
				}
			});
		})
		.catch(error => {
			var errorCode = error.code;
			var errorMessage = error.message;

			alert(errorMessage);
		});
	})
	.catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		
		alert("Email já registado!");
	})
}

function swapImage(){
	var fileButton = document.getElementById('photo');
	var buttonRegister = document.getElementById('register');
	var photoRegister = document.getElementById('imgRegister');
	//callback
	var imagePath = "";

	fileButton.addEventListener('change', function(e){
		var file = e.target.files[0];


		photoRegister.src = file.name;

		photoRegister.src = URL.createObjectURL(event.target.files[0]);
		photoRegister.onload = function() {
			URL.revokeObjectURL(photoRegister.src) // free memory

			buttonRegister.addEventListener("click", function(){
				const fileImg = document.getElementById("photo").files[0];

				var metadata = {
					contentType: 'image/jpeg'
				};
	
				var files = photoRegister.src;
	
				var filename = files.replace('blob:http://localhost:5000/', '');
	
				var uploadTask = firebase.storage().ref().child('images/' + filename).put(fileImg, metadata);
	
				uploadTask.then(function(snapshot) {
					uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
						function(snapshot) {
							// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
							var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
							//console.log('Upload is ' + progress + '% done');
							switch (snapshot.state) {
							case firebase.storage.TaskState.PAUSED: // or 'paused'
								//console.log('Upload is paused');
								break;
							case firebase.storage.TaskState.RUNNING: // or 'running'
								//console.log('Upload is running');
								break;
							}
						}, function(error) {
		
						// A full list of error codes is available at
						// https://firebase.google.com/docs/storage/web/handle-errors
						switch (error.code) {
							case 'storage/unauthorized':
							// User doesn't have permission to access the object
							break;
		
							case 'storage/canceled':
							// User canceled the upload
							break;
		
							
		
							case 'storage/unknown':
							// Unknown error occurred, inspect error.serverResponse
							break;
						}
						}, function() {
							// Upload completed successfully, now we can get the download URL
							uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
								//console.log('File available at', downloadURL);
								//enviar callback
								return downloadURL;
						});
					});
				});
				
			});
		}
	  });
}