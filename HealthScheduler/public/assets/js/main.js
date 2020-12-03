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

function login(){
	var email = document.getElementById("email_input");
	var password = document.getElementById("password_input");

	firebase.auth().signInWithEmailAndPassword(email.value, password.value).then((user) => {
		window.location.replace("mainpage.html");

	})
	.catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;

		alert(errorMessage);
	});
}

function signup() {
	const db = firebase.firestore();	
	const phoneNumberEmail = document.getElementById("email_input_register").value;
	const passwordRegister = document.getElementById("password_input_register").value;
	const username = document.getElementById("nome_input").value;
	const address = document.getElementById("morada_input").value;
	var imageName = document.getElementById("photo").src;
	imageName = imagePath.replace('blob:http://localhost:5000/', '');

	firebase.auth().createUserWithEmailAndPassword(phoneNumberEmail, passwordRegister)
	.then((user) => {
		firebase.auth().signInWithEmailAndPassword(phoneNumberEmail, passwordRegister)
		.then((user) => {
			firebase.auth().onAuthStateChanged(function(user) {
				if (user) {
					const uid = "" + user.uid;

					db.collection('users_medic').doc("" + uid).set({
						address,
						imagePath,
						phoneNumberEmail,
						uid,
						username
					});
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

function logOut(){
	firebase.auth().signOut().then(function() {
		alert("Saiu com sucesso!");
	  }).catch(function(error) {
		// An error happened.
	  });
}

function swapImage(){
	var fileButton = document.getElementById('photo');
	var photoRegister = document.getElementById('imgRegister');

	
	var imageName = document.getElementById("imgRegister").src;
	imageName = imageName.replace('blob:http://localhost:5000/', '');

	console.log(imageName);

	fileButton.addEventListener('change', function(e){
		var file = e.target.files[0];

		photoRegister.src = file.name;

		photoRegister.src = URL.createObjectURL(event.target.files[0]);
		photoRegister.onload = function() {
			URL.revokeObjectURL(photoRegister.src) // free memory
		}
	  });
}