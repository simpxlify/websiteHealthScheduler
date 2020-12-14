// Your web app's Firebase configuration
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

function logOut(){
	firebase.auth().signOut().then(function() {
		alert("Saiu com sucesso!");
	  }).catch(function(error) {
		// An error happened.
	  });
}