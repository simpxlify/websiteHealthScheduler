// Your web app's Firebase configuration

//const { sign } = require("crypto");

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

function signIn(imagePath){
	const db = firebase.firestore();	
	const auth = firebase.auth();
	const phoneNumberEmail = document.getElementById("email_input_register").value;
	const passwordRegister = document.getElementById("password_input_register").value;
	const passwordVerifyRegister = document.getElementById("password_confirm_input_register").value;
	const username = document.getElementById("nome_input").value;
	const address = document.getElementById("morada_input").value;

	if(passwordRegister == passwordVerifyRegister){
		auth.createUserWithEmailAndPassword(phoneNumberEmail, passwordRegister)
		.then((user) => {
			auth.signInWithEmailAndPassword(phoneNumberEmail, passwordRegister)
			.then((user) => {
				auth.onAuthStateChanged(function(user) {
					if (user) {
						const medicID = "" + user.uid;

						db.collection('users_medic').doc("" + uid).set({
							address,
							imagePath,
							phoneNumberEmail,
							medicID,
							username
						});
						setTimeout(function(){ window.location = "login.html"; }, 3000);
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
		
			alert("Verifique a palavra-passe ou Email!");
		});
	} else {
		alert("Verifique que todos os campos estejam preenchidos conforme o pedido.");
	}
}

function swapImage(){
	var fileButton = document.getElementById('photo');
	var buttonRegister = document.getElementById('register');
	var photoRegister = document.getElementById('imgRegister');

	fileButton.addEventListener('change', function(e){
		var file = e.target.files[0];
		photoRegister.src = file.name;
		photoRegister.src = URL.createObjectURL(event.target.files[0]);
		photoRegister.onload = function() {
			URL.revokeObjectURL(photoRegister.src);
			buttonRegister.addEventListener("click", function(){
				var fileImg = document.getElementById("photo").files[0];
				var durl = '';

				var metadata = {
					contentType: 'image/jpeg'
				};
	
				var files = photoRegister.src;
	
				var filename = files.replace('blob:http://localhost:5000/', '');

				var uploadTask = firebase.storage().ref().child('images/' + filename).put(fileImg, metadata);
				
				// Register three observers:
				// 1. 'state_changed' observer, called any time the state changes
				// 2. Error observer, called on failure
				// 3. Completion observer, called on successful completion
				uploadTask.on('state_changed', function(snapshot){
					// Observe state change events such as progress, pause, and resume
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					//var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
					// Handle unsuccessful uploads
				}, function() {
					// Handle successful uploads on complete
					// For instance, get the download URL: https://firebasestorage.googleapis.com/...
					uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
					//console.log('File available at', downloadURL);
					signIn(downloadURL);
					});
				});
			});
		}
	  });
}