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
	var emailRegister = document.getElementById("email_input_register");
	var passwordRegister = document.getElementById("password_input_register");

    firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRegister.value)
	.then((user) => {
		window.location.assign("index.html");
	})
	.catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		
		alert(errorMessage);
	});
    
    
}