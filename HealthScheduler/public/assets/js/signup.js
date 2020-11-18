const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const alertBox = document.querySelector(".alert-danger");
const loader = document.querySelector(".loader");
const contentContainer = document.querySelector("#content-container");

auth.onAuthStateChanged(user => {
	if (user) {
		window.location.assign("/public/index.html");
	} else {
		loader.classList.add("hide");
		loader.classList.remove("d-flex");
		contentContainer.classList.remove("hide");
	}
});

auth.useDeviceLanguage();

function signUp() {
	event.preventDefault();
	const email = emailInput.value;
	const password = passwordInput.value;
	auth.createUserWithEmailAndPassword(email, password)
		.then(user => {
			const userUid = user.user.uid;
			const account = {
				events: []
			};
			usersRef
				.doc(userUid)
				.set(account)
				.then(() => {
					verifyUserEmail();
					window.location.assign("index.html");
				});
		})
		.catch(error => {
			alertBox.classList.remove("hide");
			alertBox.innerHTML = error.message;
			console.log("Error: " + error.message);
		});
}

function verifyUserEmail() {
	auth.currentUser.sendEmailVerification().then(() => {
		console.log("email sent");
	});
}
