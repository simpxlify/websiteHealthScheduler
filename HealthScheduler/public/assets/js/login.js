const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const alertBox = document.querySelector(".alert-danger");
const loader = document.querySelector(".loader");
const contentContainer = document.querySelector("#content-container");

auth.onAuthStateChanged(user => {
	if (user) {
		window.location.assign("/404");
		console.log("idk");
	} else {
		loader.classList.add("hide");
		loader.classList.remove("d-flex");
		contentContainer.classList.remove("hide");
		console.log("loaded");
	}
});

function login() {
	event.preventDefault();
	const email = emailInput.value;
	const password = passwordInput.value;
	auth.signInWithEmailAndPassword(email, password)
		.then(() => {
			console.log("signed in");
			window.location.assign("/404");
		})
		.catch(error => {
			alertBox.classList.remove("hide");
			alertBox.innerHTML = error.message;
			console.log("Error: " + error.message);
		});
}
