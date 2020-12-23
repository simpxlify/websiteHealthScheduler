const db = firebase.firestore();

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
    db.collection("consultas").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.data().medicID == uid) {
                var userID = doc.data().userID;

                var consultaContainer = document.getElementById('allConsultas');
                var titleOfConsulta = document.createElement('div');
                titleOfConsulta.className = 'titleOfConsulta';
                var descriptionOfConsulta = document.createElement('div');
                descriptionOfConsulta.className = 'descriptionOfConsulta';

                document.getElementsByClassName('appointementsContainer')[0].appendChild(consultaContainer);
                
                
                consultaContainer.appendChild(titleOfConsulta);
                consultaContainer.appendChild(descriptionOfConsulta);


                var title = document.createElement("h1");
                var span = document.createElement("span");
                var hour = document.createElement("p");

                

                var spanText = document.createTextNode(doc.data().notes);

                span.appendChild(spanText);

                var hourText = document.createTextNode(doc.data().hour);

                hour.appendChild(hourText);

                var titleText = document.createTextNode(doc.data().typeOfConsult);

                title.appendChild(titleText);

                titleOfConsulta.append(title);
                descriptionOfConsulta.append(span);
                descriptionOfConsulta.append(hour);
            }
        });
    });
}