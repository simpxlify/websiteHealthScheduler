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


                var usernames = doc.data().username;
                var imagePath = doc.data().imagePath;
                var addressUsers = doc.data().address;


                imagePath = imagePath.replace(/^"(.*)"$/, '$1');
                username.innerHTML = "" + usernames.replace(/^"(.*)"$/, '$1');
                addressUser.innerHTML = "" + addressUsers.replace(/^"(.*)"$/, '$1');

                imageUser.src = imagePath;
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
	} else {
        alert("Utilzador não logado!");
        window.location.replace("login.html");
	} 
});
