const db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
	if (user != null) {
        const uid = "" + user.uid;
        
        db.collection('users_medic').doc(uid + "").get().then(function(doc) {
            if (doc.exists) {
                //console.log("Document data:", doc.data());
                //document.getElementById("img_user").removeAttribute('src');
                //var imageUser = document.getElementById("img_user");
                //var imagePath = doc.data().imagePath;
                //imagePath = imagePath.replace(/^"(.*)"$/, '$1');
                //imageUser.src = imagePath;
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
	} else {
        window.location.replace("404.html");
	} 
});
