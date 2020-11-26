
function login(){
	var email = document.getElementById("email_input");
	var password = document.getElementById("password_input");

	firebase.auth().signInWithEmailAndPassword(email.value, password.value).then((user) => {
		window.location.assign("mainpage.html");

	}).catch((error) => {
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
	firebase.auth().createUserWithEmailAndPassword(phoneNumberEmail, passwordRegister)
	.then((user) => {
		const userID = "" + user.uid;
		const response = db.collection('users_medic').doc().set({
			address,
			imagePath: "",
			phoneNumberEmail,
			userID,
			username
		});

		loginOnSignup(phoneNumberEmail, passwordRegister);
	}).catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		
		alert(errorMessage);
	})
}

function loginOnSignup(email, password){
	firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
		window.location.assign("mainpage.html");

	}).catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;

		alert(errorMessage);
	  });
}

function writeUserDataWithCompletion(userId, name, email, imageUrl, address) {
	firebase.firestore().collection("users").doc(userId + "").set({
		address: address,
		imagePath: imageUrl,
		phoneNumberEmail : email,
		userID : "",
		username : name
	}, function(error) {
	  if (error) {
		  alert(error);
	  } else {
		// Data saved successfully!
	  }
	});
  }

function fadeIn(){
	
}