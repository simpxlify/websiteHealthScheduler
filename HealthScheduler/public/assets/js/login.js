function login(){
	var email = document.getElementById("email_input");
    var password = document.getElementById("password_input");
	const db = firebase.firestore();	
    const auth = firebase.auth();
    
    db.collection("users_medic").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            
            if(doc.data().phoneNumberEmail == email.value){
                auth.signInWithEmailAndPassword(email.value, password.value).then((user) => {
                    window.location.replace("mainpage.html");
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                
                    alert("Verifique o email ou a password!");
                });
            }
            
        });
    });

    // password.addEventListener("keyup", function(e) {
    //     if (e.key === 'Enter') {
    //      event.preventDefault();
    //      document.getElementById("button_login").click();
    //     }
    //   });
  
}

    


