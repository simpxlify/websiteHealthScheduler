//  var myList = new Array();
var TipoDeLista = "";
var groupID = "";
var toId = "";
// var toId = "0UBWLj6JnRai0DXv08FHlVHPp7M2";
var username = "";
var messages = "";
var timeStamp = "";
var fromId = "";
var uid = "";
firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
        // document.getElementsByTagName("BODY")[0].style.display = "contents";
        uid = "" + user.uid;
        from = "" + user.fromId;
    }

});

// por o nome em cima, por a foto do contacto a falar, fazer o css do 
// chat e fazer o css do enter message tambem

var userContainer = document.getElementById('userContainer');

var listContainer = document.getElementById('allUsersContainer');


db.collection("chat_grupo").onSnapshot(function (querySnapshot) {

    listContainer.innerHTML = '';

    querySnapshot.forEach(function (doc) {
        for (var i = 0; i < doc.data().medicID.length; i++) {
            if (doc.data().medicID[i] == uid) {
                // var listContainer = document.createElement('div');

                var containerUsers = document.createElement('div');
                containerUsers.className = 'usersBox';

                listContainer.appendChild(containerUsers);

                // Make the list
                var listElement = document.createElement('ul');
                listElement.className = 'listOfUsers';
                // Set up a loop that goes through the items in listItems one at a time

                // let div = document.createElement('div')
                document.getElementsByTagName('body')[0].appendChild(listContainer);
                containerUsers.appendChild(listElement);

                var divInsideUsers = document.createElement('div');
                divInsideUsers.className = "divOfUsersInsideBox"
                listElement.appendChild(divInsideUsers);

                var divInsideUsersImg = document.createElement('div');
                divInsideUsersImg.className = "divInsideUsersImg"
                listElement.appendChild(divInsideUsersImg);

                listItem2 = document.createElement('span');
                listItem2.className = 'listItems usernameOfUser';

                listItem = document.createElement('img');
                listItem.className = 'imgRedonda'
                // Add the item text
                listItem2.innerHTML = doc.data().groupName;
                if(doc.data().imagePath == ""){
                    listItem.src = "https://firebasestorage.googleapis.com/v0/b/healthscheduler-834e9.appspot.com/o/images%2Fpicuser.png?alt=media&token=ec435ba3-5fad-4223-a46a-7879db069ca5"
                  } else{
                    listItem.src = doc.data().imagePath;
                  }

                // Add listItem to the listElement
                divInsideUsersImg.appendChild(listItem);
                divInsideUsers.appendChild(listItem2);

                var listSelectPatients = document.createElement('select');
                var optionDefault = document.createElement('option');
                optionDefault.style = "display:none";
                optionDefault.value = "";
                optionDefault.innerHTML = "Ver participantes";
                listSelectPatients.appendChild(optionDefault);
                for (i = 0; i < doc.data().medicID.length; i++) {

                    db.collection("users_medic").doc(doc.data().medicID[i]).get().then(function (doc) {

                        if (doc.exists) {

                            listItem3 = document.createElement('option');
                            listItem3.className = 'listItems usernameOfUser';

                            username = doc.data().username;
                            listItem3.innerHTML = username;
                            
                            listSelectPatients.appendChild(listItem3);
                        
                        }
                    });
                    divInsideUsers.appendChild(listSelectPatients);
                }

                listElement.addEventListener("click", function () {
                    groupID = doc.data().groupID;
                    listElement.className = 'listOfUsers';
                    var nameOfTheUser = document.getElementById("nameOfTheUser");
                    nameOfTheUser.className = "nameOfTheUser";
                    nameOfTheUser.innerHTML = doc.data().groupName;
                    // var btn = document.createElement('button');
                    // btn.id = "buttonOptions";
                    // btn.className = "iconOptions";
                    // nameOfTheUser.appendChild(btn);
                    listAllGroupMessages(groupID);
                });
            }
        }
    });
    userContainer.appendChild(listContainer);
});

function listAllGroupMessages(groupID) {
    var allMessagesContainer = document.getElementById('allMessagesContainer');

    var listMessages = document.getElementById('allMessagesList');

    db.collection("chat_grupo").doc(groupID).collection("messages").orderBy("timeStamp").onSnapshot(function (querySnapshot) {

        listMessages.innerHTML = '';

        querySnapshot.forEach(function (doc) {

            if (doc.data().messageType == 'text') {

                var timeStamp = doc.data().timeStamp;
                var a = new Date(timeStamp * 1000);
                var months = [
                    "Jan",
                    "Fev",
                    "Mar",
                    "Abr",
                    "Mai",
                    "Jun",
                    "Jul",
                    "Ago",
                    "Set",
                    "Out",
                    "Nov",
                    "Dez"
                ];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                hour = (hour < 10) ? '0' + hour : hour;
                var min = a.getMinutes();
                min = (min < 10) ? '0' + min : min;
                var sec = a.getSeconds();
                var formattedTime = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min; //+ ':' + sec;

                var listElement = document.createElement('ul');

                document.getElementsByTagName('body')[0].appendChild(listMessages);
                listMessages.appendChild(listElement);

                listItem4 = document.createElement('li');
                listItem4.className = 'listItemsMessages';

                divMessageListItem4 = document.createElement('div');
                divMessageListItem4.className = 'messageWithImage';
                listItem4.appendChild(divMessageListItem4);

                messageListItem4 = document.createElement('p');

                divMessageListItem4.appendChild(messageListItem4);

                var medicIdForImage = "";
                medicIdForImage = doc.data().senderID;

                listItem6 = document.createElement('li');
                listItem6.className = 'listItemsMessages date';

                if (doc.data().senderID == uid) {
                    listElement.className = 'allMessages myMessage';
                    listItem6.className = 'listItemsMessages dateRight';
                    var source = "";
                    var allMessagesImageOfMessage = document.createElement('img');

                    db.collection("users_medic").get().then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                if (medicIdForImage == doc.data().medicID) {
                                    source = doc.data().imagePath;
                                    allMessagesImageOfMessage.src = source;
                                    allMessagesImageOfMessage.className = "imageOfUser";
                                    listElement.appendChild(allMessagesImageOfMessage);
                                }
                            });
                        })
                        .catch(function (error) {
                            console.log("Error getting documents: ", error);
                        });
                } else {
                    var source = "";
                    var allMessagesImageOfMessage = document.createElement('img');
                    var userIdForImage = doc.data().senderID;
                    db.collection("users_medic").get().then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                if (userIdForImage == doc.data().medicID) {
                                    source = doc.data().imagePath;
                                    allMessagesImageOfMessage.src = source;
                                    allMessagesImageOfMessage.className = "imageOfUser";
                                    listElement.appendChild(allMessagesImageOfMessage);
                                }
                            });
                        })
                        .catch(function (error) {
                            console.log("Error getting documents: ", error);
                        });

                    listElement.className = 'allMessages hisMessage';
                }

                messageListItem4.innerHTML = doc.data().message;
                listItem6.innerHTML = formattedTime;
                listElement.appendChild(listItem4);
                divMessageListItem4.appendChild(listItem6);

            } else if (doc.data().messageType == 'image') {

                var timeStamp = doc.data().timeStamp;
                var a = new Date(timeStamp * 1000);
                var months = [
                    "Jan",
                    "Fev",
                    "Mar",
                    "Abr",
                    "Mai",
                    "Jun",
                    "Jul",
                    "Ago",
                    "Set",
                    "Out",
                    "Nov",
                    "Dez"
                ];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                hour = (hour < 10) ? '0' + hour : hour;
                var min = a.getMinutes();
                min = (min < 10) ? '0' + min : min;
                var sec = a.getSeconds();
                var formattedTime = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;

                var listElement = document.createElement('ul');

                document.getElementsByTagName('body')[0].appendChild(listMessages);
                listMessages.appendChild(listElement);

                listItem4 = document.createElement('li');
                listItem4.className = 'listItemsMessages';

                divMessageListItem4 = document.createElement('div');
                divMessageListItem4.className = 'messageWithImage';
                listItem4.appendChild(divMessageListItem4);

                messageListItem4 = document.createElement('img');
                messageListItem4.className = "imageChat"

                divMessageListItem4.appendChild(messageListItem4);

                var medicIdForImage = "";
                medicIdForImage = doc.data().senderID;

                listItem6 = document.createElement('li');
                listItem6.className = 'listItemsMessages date';

                if (doc.data().senderID == uid) {
                    listElement.className = 'allMessages myMessage';
                    listItem6.className = 'listItemsMessages dateRight';
                    var source = "";
                    var allMessagesImageOfMessage = document.createElement('img');

                    db.collection("users_medic").get().then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                if (medicIdForImage == doc.data().medicID) {
                                    source = doc.data().imagePath;
                                    allMessagesImageOfMessage.src = source;
                                    allMessagesImageOfMessage.className = "imageOfUser";
                                    listElement.appendChild(allMessagesImageOfMessage);
                                }
                            });
                        })
                        .catch(function (error) {
                            console.log("Error getting documents: ", error);
                        });
                } else {
                    var source = "";
                    var allMessagesImageOfMessage = document.createElement('img');
                    var userIdForImage = doc.data().senderID;
                    db.collection("users_medic").get().then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                if (userIdForImage == doc.data().medicID) {
                                    source = doc.data().imagePath;
                                    allMessagesImageOfMessage.src = source;
                                    allMessagesImageOfMessage.className = "imageOfUser";
                                    listElement.appendChild(allMessagesImageOfMessage);
                                }
                            });
                        })
                        .catch(function (error) {
                            console.log("Error getting documents: ", error);
                        });

                    listElement.className = 'allMessages hisMessage';
                }

                messageListItem4.src = doc.data().message;
                listItem6.innerHTML = formattedTime;
                listElement.appendChild(listItem4);
                divMessageListItem4.appendChild(listItem6);
            }

        });
        allMessagesContainer.appendChild(listMessages);
        scrollToBottom()
    });
}

function scrollToBottom() {
    var scrollingElement = document.getElementById('allMessagesList');
    scrollingElement.scrollTop = scrollingElement.scrollHeight - scrollingElement.clientHeight;
}

function myFunction(event) {
    var x = event.key;
    if (x === 'Enter') {
        document.getElementById("sendmsg").click();
    }
}

var sendmsg = document.getElementById("sendmsg");

sendmsg.addEventListener("click", function () {

    var mensagem = document.getElementById('message').value;

    if(mensagem == ""){

    } else{
        var text1 = "text";

        var timeStamp3 = parseInt(Date.now() / 1000);
    
        var message1 = document.getElementById("message").value;
    
        db.collection('chat_grupo').doc(groupID).collection("messages").add({
            "senderID": uid,
            "message": message1,
            "messageType": text1,
            "timeStamp": timeStamp3
        });
    
        db.collection('chat_grupo').doc(groupID).collection('latest_messages').doc("latest_message").set({
            "senderID": uid,
            "message": message1,
            "messageType": text1,
            "timeStamp": timeStamp3
        });
    
        document.getElementById('message').value = '';
    }
});



var fileButton = document.getElementById('image');
var file
fileButton.addEventListener('change', function (e) {
    file = e.target.files[0];
});


var buttonCreateGroup = document.getElementById("createGroup");
buttonCreateGroup.addEventListener("click", function () {
    var groupName = "";
    var arrayMedic = [uid];
    var imagePath = "";

    var inputElements = document.getElementsByClassName('checkbox');

    for (var i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            arrayMedic.push(inputElements[i].value);
        }
    }
    console.log(arrayMedic);

    groupName = document.getElementById("groupName").value;

    var fileImg = document.getElementById("image").files[0];
    var durl = '';

    var metadata = {
        contentType: 'image/jpeg'
    };

    var files = file.name;
    
    var filename = files.replace('blob:http://localhost:5000/', '');

    var uploadTask = firebase.storage().ref().child('images/' + filename).put(fileImg, metadata);

    uploadTask.on('state_changed', function (snapshot) {
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

            imagePath = downloadURL;

            db.collection("chat_grupo").add({
                // "groupName": groupName,
                // "imagePath": imagePath,
                // "medicID": arrayMedic
            }).then(function (docRef) {
                //testar adicionar groupID
                console.log(docRef.id);

                db.collection("chat_grupo").doc(docRef.id).set({
                    "groupID": docRef.id,
                    "groupName": groupName,
                    "imagePath": imagePath,
                    "medicID": arrayMedic
                });
            });

            console.log(imagePath);
        });
    });

    document.getElementById("myForm3").style.display = "none";
});

function openForm3() {

    document.getElementById("myForm3").style.display = "block";
    db.collection("users_medic").get().then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {
            divOfMedicsList = document.createElement('div');
            divOfMedicsList.className = "divOfMedicsList";

            if (doc.data().medicID != uid) {

                checkBox = document.createElement('input');
                checkBox.type = "checkbox";
                checkBox.className = "checkbox";

                label = document.createElement('label');
                br = document.createElement('br');

                if (doc.exists) {

                    checkBox.name = "" + doc.data().username;
                    checkBox.value = "" + doc.data().medicID
                    //checkBox.id = "" + doc.data().medicID

                    label.setAttribute("for", "" + doc.data().medicID)
                    label.innerHTML = doc.data().username;

                } else {
                    console.log("No such document!");
                }

                document.getElementById("formCheckbox").appendChild(divOfMedicsList);
                divOfMedicsList.appendChild(label);
                divOfMedicsList.appendChild(checkBox);
                divOfMedicsList.appendChild(br);
            }
        })
    });
}

function closeForm3() {
    document.getElementById("myForm3").style.display = "none";

}


    var fileButton1 = document.getElementById('photo');
  
    fileButton1.addEventListener('change', function (e) {
      var file1 = e.target.files[0];
  
      var fileImg1 = document.getElementById("photo").files[0];
      var durl = '';
  
      var metadata1 = {
        contentType: 'image/jpeg'
      };
  
      var files1 = file1.name;
  
      var uploadTask1 = firebase.storage().ref().child('images/' + files1).put(fileImg1, metadata1);
  
      uploadTask1.on('state_changed', function (snapshot) {
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
        uploadTask1.snapshot.ref.getDownloadURL().then(function (downloadURL) {
  
            var image1 = "image";
  
            var timeStamp3 = parseInt(Date.now() / 1000);
  
            var message1 = downloadURL;
  
            db.collection('chat_grupo').doc(groupID).collection("messages").add({
                "senderID": uid,
                "message": message1,
                "messageType": image1,
                "timeStamp": timeStamp3
            });
        
            db.collection('chat_grupo').doc(groupID).collection('latest_messages').doc("latest_message").set({
                "senderID": uid,
                "message": message1,
                "messageType": image1,
                "timeStamp": timeStamp3
            });

            document.getElementById('message').value = '';
            document.getElementById('photo').value = '';
          
        });
      });
    });
  
  