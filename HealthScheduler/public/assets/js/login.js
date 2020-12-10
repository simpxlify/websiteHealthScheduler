// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDryIOo95hphK_njejU0M5g7iEHT4OY2Ow",
    authDomain: "healthscheduler-834e9.firebaseapp.com",
    databaseURL: "https://healthscheduler-834e9.firebaseio.com",
    projectId: "healthscheduler-834e9",
    storageBucket: "healthscheduler-834e9.appspot.com",
    messagingSenderId: "1081449165079",
    appId: "1:1081449165079:web:ad0897787ad0bd310c0752",
    measurementId: "G-8WKMXG4700"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

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
}