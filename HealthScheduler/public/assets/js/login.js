var medicID = "";
firebase.auth().onAuthStateChanged(function (user) {
  if (user != null) {
    // document.getElementsByTagName("BODY")[0].style.display = "contents";
    medicID = "" + user.uid;
  }
});

function login() {
    var email = document.getElementById("email_input");
    var password = document.getElementById("password_input");
    const db = firebase.firestore();
    const auth = firebase.auth();
    var em = "" + email.value
    var docRef = db.collection("users_medic").where("phoneNumberEmail", "==", em);

    docRef.get().then(function (querysnapshot) {
        if (querysnapshot.empty) {
            alert("Verifique o email ou a password!");
            console.log("1")
        } else {
            db.collection("users_medic").doc(medicID).get().then(function (doc) {
                if (doc.data().typeOfAcc == "Medico") {
                    querysnapshot.forEach(function (doc) {
                        auth.signInWithEmailAndPassword(email.value, password.value).then((user) => {
                            console.log("signin")
                            console.log(doc.data().typeOfAcc)



                            var user = firebase.auth().currentUser;
                            if (user != null) {
                                console.log(user)

                                if (user.emailVerified) {
                                    console.log("main")
                                    window.location.replace("mainpage.html");
                                } else {
                                    alert("Valide o email")
                                }
                            }

                        }).catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            alert("Verifique o email ou a password!");
                            console.log("2")
                        });
                    })

                } else {
                    querysnapshot.forEach(function (doc) {
                        auth.signInWithEmailAndPassword(email.value, password.value).then((user) => {
                            console.log("signin2")
                            console.log(doc.data().typeOfAcc)



                            var user = firebase.auth().currentUser;
                            if (user != null) {
                                console.log(user)

                                if (user.emailVerified) {
                                    console.log("main2")
                                    window.location.replace("mainpageAdmins.html");
                                } else {
                                    alert("Valide o email")
                                }
                            }

                        }).catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            alert("Verifique o email ou a password!");
                            console.log("3")
                        });
                    })

                }
            })

        }

    }).catch(function (error) {
        console.log("erro no acesso a bd");
    });
}

function myFunction(event) {
    var x = event.key;
    if (x === 'Enter') {
        document.getElementById("button_login").click();
    }
}