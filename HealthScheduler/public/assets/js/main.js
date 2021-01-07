firebase.auth().onAuthStateChanged(function (user) {
  if (user != null) {
    document.getElementsByTagName("BODY")[0].style.display = "contents";
    const uid = "" + user.uid;

    db.collection('users_medic').doc(uid + "").get().then(function (doc) {
      if (doc.exists) {
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
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  } else {
    window.location.replace("login.html");
  }
});

function listConsultas(uid) {
  var consultaContainer = document.getElementById('allConsultas');
  db.collection("consultas").onSnapshot(function (querySnapshot) {
    consultaContainer.innerHTML = "";
    querySnapshot.forEach(function (doc) {
      if (doc.data().medicID == uid) {
        var notes = doc.data().notes;
        var hour = doc.data().hour;
        var consultaContainer = document.getElementById('allConsultas');
        var titleOfConsulta = document.createElement('div');
        var descriptionOfConsulta = document.createElement('div');
        titleOfConsulta.className = 'titleOfConsulta';
        descriptionOfConsulta.className = 'descriptionOfConsulta';

        document.getElementsByClassName('appointementsContainer')[0].appendChild(consultaContainer);

        consultaContainer.appendChild(titleOfConsulta);
        consultaContainer.appendChild(descriptionOfConsulta);


        var titles = document.createElement("h1");
        var spans = document.createElement("span");
        var hours = document.createElement("p");
        var divider = document.createElement("hr");
        divider.className = "inConsultaDivider";

        var spanText = document.createTextNode(notes);

        spans.appendChild(spanText);

        var hourText = document.createTextNode(hour);

        hours.appendChild(hourText);

        var titleText = document.createTextNode(doc.data().typeOfConsult);

        titles.appendChild(titleText);

        titleOfConsulta.append(titles);
        descriptionOfConsulta.append(spans);
        descriptionOfConsulta.append(hours);
        descriptionOfConsulta.append(divider);
      }
    });
  });
}

function getUserID(userID, notes, hour) {

  db.collection("consultas").where("medicID", "==", userID)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
}