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
	var emailRegister = document.getElementById("email_input_register").value;
	var passwordRegister = document.getElementById("password_input_register").value;
	var nomeRegister = document.getElementById("nome_input").value;
	var moradaRegister = document.getElementById("morada_input").value;

    firebase.auth().createUserWithEmailAndPassword(emailRegister, passwordRegister)
	.then((user) => {
		writeUserDataWithCompletion("asd", nomeRegister, emailRegister, "", moradaRegister);
		window.location.assign("mainpage.html");

	})
	.catch((error) => {
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