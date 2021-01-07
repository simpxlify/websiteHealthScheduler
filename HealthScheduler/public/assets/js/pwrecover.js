// Your web app's Firebase configuration

//const { sign } = require("crypto");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDryIOo95hphK_njejU0M5g7iEHT4OY2Ow",
  authDomain: "healthscheduler-834e9.firebaseapp.com",
  databaseURL: "https://healthscheduler-834e9.firebaseio.com",
  projectId: "healthscheduler-834e9",
  storageBucket: "healthscheduler-834e9.appspot.com",
  messagingSenderId: "1081449165079",
  appId: "1:1081449165079:web:a5c312917c0103ac0c0752",
  measurementId: "G-FLSBZJ2B42"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


var uid = "";
firebase.auth().onAuthStateChanged(function(user) {
  if (user != null) {
        // document.getElementsByTagName("BODY")[0].style.display = "contents";
        uid = "" + user.uid;
  }
});

function recoverpw(){
const auth = firebase.auth();
var recover = document.getElementById("recover");

recover.addEventListener("click", function () {
  var emailAddress = document.getElementById("email_input_pwrecover").value;
  
    if(emailAddress !=""){
      auth.sendPasswordResetEmail(emailAddress).then(function() {
        alert("Email enviado para o seu email com sucesso");
    })
    .catch(function(error) {
        var errorCode = error.code;
				var errorMessage = error.message;

				alert(errorMessage);
    });
    } else {
        alert("Verifique se tem o campo de email bem preenchido");
    }
});
}
