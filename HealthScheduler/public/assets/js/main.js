var uid = "";
firebase.auth().onAuthStateChanged(function (user) {
  if (user != null) {
    uid = "" + user.uid;
  }
});

function updateEmail() {
  var emailAddress = document.getElementById("email_input_change").value;

  firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
      user.updateEmail(emailAddress).then(function () {
        db.collection("users_medic").doc(uid).update({
            phoneNumberEmail: emailAddress
          })
          .then(function () {

          })
          .catch(function (error) {

          });
      }).catch(function (error) {

      });
    }
  });
}

function updateAddress() {
  var address = document.getElementById("address_input_change").value;

  db.collection("users_medic").doc(uid).update({
      address: address
    })
    .then(function () {

    })
    .catch(function (error) {

    });
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";

}

function openForm2() {
  document.getElementById("myForm2").style.display = "block";
}


function closeForm2() {
  document.getElementById("myForm2").style.display = "none";

}

function openForm3() {
  document.getElementById("myForm3").style.display = "block";
}


function closeForm3() {
  document.getElementById("myForm3").style.display = "none";

}

function swapImage() {
  var fileButton = document.getElementById('photo');
  var photoRegister = document.getElementById('img_user');

  fileButton.addEventListener('change', function (e) {
    var file = e.target.files[0];
    photoRegister.src = file.name;
    photoRegister.src = URL.createObjectURL(event.target.files[0]);
    photoRegister.onload = function () {
      URL.revokeObjectURL(photoRegister.src);

      URL.revokeObjectURL(photoRegister.src);
      var fileImg = document.getElementById("photo").files[0];
      var durl = '';

      var metadata = {
        contentType: 'image/jpeg'
      };

      var files = photoRegister.src;



      var uploadTask = firebase.storage().ref().child('images/' + filename).put(fileImg, metadata);

      var filename = files.replace('blob:http://localhost:5000/', '');

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            // console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            // console.log('Upload is running');
            break;
        }
      }, function (error) {
        // Handle unsuccessful uploads
      }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          // console.log('File available at', downloadURL);
          updateImage(downloadURL);
        });
      });
    }

  });
}

function updateImage(imagePath) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
      db.collection("users_medic").doc(uid).update({
          imagePath: imagePath
        })
        .then(function () {

        })
        .catch(function (error) {

        });
    }
  });
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user != null) {
    // document.getElementsByTagName("BODY")[0].style.display = "contents";
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

        if(imagePath == ""){
          imageUser.src = "https://firebasestorage.googleapis.com/v0/b/healthscheduler-834e9.appspot.com/o/images%2Fpicuser.png?alt=media&token=ec435ba3-5fad-4223-a46a-7879db069ca5"
        } else{
          imageUser.src = imagePath;
        }
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

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var weekDayIndex = today.getDay();
  var monthIndex = today.getMonth()
  var days = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sabado'];
  var monthText = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"];
  
  var todayDate = yyyy + '-' + mm + '-' + dd;
  document.getElementById("appointmentsTitle").innerHTML = days[weekDayIndex] + ", " + dd + " de " + monthText[monthIndex] /*+ " - Consultas"*/;

  db.collection("consultas").where("date", "==", todayDate).onSnapshot(function (querySnapshot) {
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

        var spanText = document.createTextNode("Descrição: " + notes);

        spans.appendChild(spanText);

        var hourText = document.createTextNode(hour);

        hours.appendChild(hourText);

        var titleText = document.createTextNode("Paciente: " + doc.data().patientName);

        titles.appendChild(titleText);

        titleOfConsulta.append(titles);
        descriptionOfConsulta.append(spans);
        descriptionOfConsulta.append(hours);
        descriptionOfConsulta.append(divider);

        return true;
      }
    });
  });
}