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
    
    const auth = firebase.auth().currentUser;
    var confirmEmail = document.getElementById("confirmEmail");

    confirmEmail.addEventListener("click", function () {

        var emailAddress = document.getElementById("email_input_change").value;
        

        auth.updateEmail(emailAddress).then(function () {


            return db.collection("users_medic").doc(uid).update({
                phoneNumberEmail: emailAddress
            })
            .then(function() {
                
            })
            .catch(function(error) {
                
            });

        }).catch(function (error) {

            alert("Error");
        });
    })
};