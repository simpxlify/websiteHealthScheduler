function changeFunc() {
	var typeOfAcc = document.getElementById("acc_input").value;
	var eleTypeMed = document.getElementById("medic_input")


	if (typeOfAcc == "Medico") {
		eleTypeMed.className = "medicoVisivel"
	} else {
		eleTypeMed.className = "inputTypeMedic"
	}
}


function signIn(imagePath) {
	const db = firebase.firestore();
	const auth = firebase.auth();
	const phoneNumberEmail = document.getElementById("email_input_register").value;
	const passwordRegister = document.getElementById("password_input_register").value;
	const passwordVerifyRegister = document.getElementById("password_confirm_input_register").value;
	const username = document.getElementById("nome_input").value;
	const address = document.getElementById("morada_input").value;

	var typeOfMedic = document.getElementById("medic_input").value;
	var typeOfAcc = document.getElementById("acc_input").value;

	console.log()


	if (typeOfAcc != "Medico") {
		typeOfMedic = "";
	}
	if (passwordRegister == passwordVerifyRegister && phoneNumberEmail != "" &&
		passwordRegister != "" && passwordVerifyRegister != "" &&
		username != "" && address != "") {
		auth.createUserWithEmailAndPassword(phoneNumberEmail, passwordRegister)
			.then((user) => {
				auth.signInWithEmailAndPassword(phoneNumberEmail, passwordRegister)
					.then((user) => {
						auth.onAuthStateChanged(function (user) {
							if (user) {
								const medicID = "" + user.uid;

								db.collection('users_medic').doc("" + medicID).set({
									address,
									imagePath,
									phoneNumberEmail,
									medicID,
									typeOfMedic,
									typeOfAcc,
									username
								});
								setTimeout(function () {
									window.location = "login.html";
								}, 3000);
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

				alert("Verifique que todos os campos estejam preenchidos conforme o pedido.");
			});
	} else {
		alert("Verifique que todos os campos estejam preenchidos conforme o pedido.");
	}
}

function swapImage() {


}


var fileButton = document.getElementById('photo');
var buttonRegister = document.getElementById('register');
var photoRegister = document.getElementById('imgRegister');
fileButton.addEventListener('change', function (e) {
	var file = e.target.files[0];
	photoRegister.src = file.name;
	photoRegister.src = URL.createObjectURL(e.target.files[0]);
	photoRegister.onload = function () {
		URL.revokeObjectURL(photoRegister.src);

	}
});

buttonRegister.addEventListener("click", function () {
	var fileImg = document.getElementById("photo").files[0];
	var durl = '';

	if (fileImg != undefined) {
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
		uploadTask.on('state_changed', function (snapshot) {
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
		}, function (error) {
			// Handle unsuccessful uploads
		}, function () {
			// Handle successful uploads on complete
			// For instance, get the download URL: https://firebasestorage.googleapis.com/...
			uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
				//console.log('File available at', downloadURL);
				signIn(downloadURL);
			});
		});
	} else {

		signIn("");
	}
});