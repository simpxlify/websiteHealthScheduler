const db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
	if (user != null) {
        document.getElementsByTagName("BODY")[0].style.display = "contents";
        const uid = "" + user.uid;
        
        db.collection('users_medic').doc(uid + "").get().then(function(doc) {
            if (doc.exists) {
                //console.log("Document data:", doc.data());
                document.getElementById("img_user").removeAttribute('src');

                var username = document.getElementById("user_name");
                var imageUser = document.getElementById("img_user");
                var addressUser = document.getElementById("address_user");
                var emailUser = document.getElementById("email_user");


                var usernames = doc.data().username;
                var imagePath = doc.data().imagePath;
                var addressUsers = doc.data().address;
                var emailUsers = doc.data().phoneNumberEmail;


                imagePath = imagePath.replace(/^"(.*)"$/, '$1');
                username.innerHTML = "" + usernames.replace(/^"(.*)"$/, '$1');
                addressUser.innerHTML = "" + addressUsers.replace(/^"(.*)"$/, '$1');
                emailUser.innerHTML = "" + emailUsers.replace(/^"(.*)"$/, '$1');

                imageUser.src = imagePath;

                listConsultas(uid);
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
	} else {
        window.location.replace("login.html");
	} 
});


function listConsultas(uid){
    db.collection("consultas").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            if(doc.data().medicID == uid){
                var h1Title = document.createElement("h1");
                var spanText = document.createElement("span");

                h1Title = "" + doc.data().typeOfConsult;
                spanText = "" + doc.data().notes;

                console.log("title: " + h1Title + " text: " + spanText);

                var divTitle = document.getElementById("titleOfConsutla");
                var divSpan = document.getElementById("descriptionOfConsulta");
                divTitle.appendChild(
                    "<h1>" +
                    h1Title +
                    "</h1> <br>"
                );

                divSpan.appendChild(
                    "<span>" +
                    spanText +
                    "</span> <br>"
                );
                
            }
        });
    });
}