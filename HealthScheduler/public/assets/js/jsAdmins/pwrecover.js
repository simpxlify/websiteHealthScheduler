var uid = "";
firebase.auth().onAuthStateChanged(function(user) {
  if (user != null) {
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
