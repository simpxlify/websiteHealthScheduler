function login() {
    var email = document.getElementById("email_input");
    var password = document.getElementById("password_input");
    const db = firebase.firestore();
    const auth = firebase.auth();
    var docRef = db.collection("users_medic").where("phoneNumberEmail", "==", email.value);

    docRef.get().then(function (querysnapshot) {
        if (querysnapshot.empty) {
            alert("Verifique o email ou a password!");
        } else {
            auth.signInWithEmailAndPassword(email.value, password.value)
                .then((user) => {

                    auth.onAuthStateChanged(function (user) {
                        if (user) {
                            var emailVerf = user.emailVerified;
                            db.collection("users_medic").doc(user.uid).get().then(function (doc) {
                                if (doc.data().typeOfAcc == "Medico") {
                                    if (emailVerf) {
                                        window.location.replace("mainpage.html");
                                    } else {
                                        alert("Valide o email")
                                    }
                                } else if (doc.data().typeOfAcc == "Administrativo" || doc.data().typeOfAcc == "Enfermeiro"){
                                    if (emailVerf) {
                                        window.location.replace("mainpageAdmins.html");
                                    } else {
                                        alert("Valide o email")
                                    }
                                } 
                                
                            });
                        } else {
                            
                        }
                    });
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                });
        }

    }).catch(function (error) {
        console.log("erro no acesso a bd aqui");
    });
}

function myFunction(event) {
    var x = event.key;
    if (x === 'Enter') {
        document.getElementById("button_login").click();
    }
}