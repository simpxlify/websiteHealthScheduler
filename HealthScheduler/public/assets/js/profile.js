var uid = "";
firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
        uid = "" + user.uid;
    }
});

function updatePhoto() {
    user.updateProfile({
        photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function () {
        // Update successful.
    }).catch(function (error) {
        // An error happened.
    });
}

function updatePassword() {
    var newPassword = getASecureRandomPassword();

    user.updatePassword(newPassword).then(function () {
        // Update successful.
    }).catch(function (error) {
        // An error happened.
    });
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function updateEmail() {

    const auth = firebase.auth();
    var confirmEmail = document.getElementById("confirmEmail");
    db.collection("users_medic").doc(uid).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            confirmEmail.addEventListener("click", function () {

                var emailAddress = document.getElementById("email_input_change").value;
                
                auth.updateEmail(emailAddress).then(function () {
                    alert("deu");
                }).catch(function (error) {
                    alert("n deu");
                });
            })
        })
    })
};