firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        db.collection("users_medic").doc(user.uid)
            .get().then(function (doc) {
                if (doc.exists) {
                    if ((doc.data().typeOfAcc == "Enfermeiro" || doc.data().typeOfAcc == "Administrativo")) {
                        
                    }else{
                        window.location.replace("login.html");
                    }
                } else {
                    console.log("No such document!");
                    window.location.replace("login.html");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
    } else {
        window.location.replace("login.html");
    }
});