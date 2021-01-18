//  var myList = new Array();

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
//david nabo


function openTab(evt, Tabs) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(Tabs).style.display = "block";
  evt.currentTarget.className += " active";
}


// por o nome em cima, por a foto do contacto a falar, fazer o css do 
// chat e fazer o css do enter message tambem

var userContainer = document.getElementById('userContainer');

var listContainer = document.getElementById('allUsersContainer');


db.collection("users").onSnapshot(function (querySnapshot) {

  listContainer.innerHTML = '';

  querySnapshot.forEach(function (doc) {

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

    listItemLatestMessage = document.createElement('span');
    listItemLatestMessage.className = 'listItems latestMessage';

    // para funcionar todos basta mudar para snapshot, erro!

    db.collection("latest_messages").doc(uid)
    .collection("latest_message").doc(doc.data().userID)
    .get().then(function (doc) {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        if (doc.data().messageType == "text") {
          listItemLatestMessage.innerHTML = doc.data().message;
          divInsideUsers.appendChild(listItemLatestMessage);
        } else if (doc.data().messageType == "image") {
          listItemLatestMessage.innerHTML = "Imagem.";
          divInsideUsers.appendChild(listItemLatestMessage);
        } else {
          listItemLatestMessage.innerHTML = "Audio.";
          divInsideUsers.appendChild(listItemLatestMessage);
        }
      }
    });

    listItem = document.createElement('img');
    listItem.className = 'imgRedonda'
    // Add the item text
    listItem2.innerHTML = doc.data().username;
    listItem.src = doc.data().imagePath;

    // Add listItem to the listElement
    divInsideUsersImg.appendChild(listItem);
    divInsideUsers.appendChild(listItem2);
    

    listElement.addEventListener("click", function () {
      toId = doc.data().userID;
      listElement.className = 'listOfUsers';
      var nameOfTheUser = document.getElementById("nameOfTheUser");
      nameOfTheUser.className = "nameOfTheUser";
      nameOfTheUser.innerHTML = doc.data().username;
      //sendMessage(uid, toId);
      listAllMessages(uid, toId);
    });
  });

  var sendmsg = document.getElementById("sendmsg");

  sendmsg.addEventListener("click", function () {

    var text = "text";

    var timeStamp2 = parseInt(Date.now() / 1000);

    var message = document.getElementById("message").value;

    db.collection('chat_messages').doc(uid).collection(toId).add({
      "fromId": uid,
      "message": message,
      "messageType": text,
      "toId": toId,
      "timeStamp": timeStamp2
    });

    db.collection('chat_messages').doc(toId).collection(uid).add({
      "fromId": uid,
      "message": message,
      "messageType": text,
      "toId": toId,
      "timeStamp": timeStamp2
    });

    db.collection('latest_messages').doc(uid).collection('latest_message').doc(toId).set({
      "fromId": uid,
      "message": message,
      "messageType": text,
      "toId": toId,
      "timeStamp": timeStamp2
    });

    db.collection('latest_messages').doc(toId).collection('latest_message').doc(uid).set({
      "fromId": uid,
      "message": message,
      "messageType": text,
      "toId": toId,
      "timeStamp": timeStamp2
    });
    document.getElementById('message').value = '';
  });
  userContainer.appendChild(listContainer);
});

// listen for incoming messages
function listAllMessages(uid, toId) {
  var allMessagesContainer = document.getElementById('allMessagesContainer');

  var listMessages = document.getElementById('allMessagesList');

  db.collection("chat_messages").doc(uid).collection(toId).orderBy("timeStamp").onSnapshot(function (querySnapshot) {

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
        medicIdForImage = doc.data().fromId;

        listItem6 = document.createElement('li');
        listItem6.className = 'listItemsMessages date';

        if (doc.data().fromId == uid) {
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
          var userIdForImage = doc.data().fromId;
          db.collection("users").get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                if (userIdForImage == doc.data().userID) {
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
        medicIdForImage = doc.data().fromId;

        listItem6 = document.createElement('li');
        listItem6.className = 'listItemsMessages date';

        if (doc.data().fromId == uid) {
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
          var userIdForImage = doc.data().fromId;
          db.collection("users").get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                if (userIdForImage == doc.data().userID) {
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

// function deleteMessage(self) {
//   // get message ID
//   var messageId = self.getAttribute("data-id");

//   // delete message
//   db.collection("messages").child(messageId).remove();
// }

// // attach listener for delete message
// db.collection("messages").on("child_removed", function (snapshot) {
//   // remove message node
//   document.getElementById("message-" + snapshot.key).innerHTML = "This message has been removed";
// });

// Animation Styles
// $(function() {

//   var index = 0;

//   function initScroll() {
//     $(".message-wrap").animate({ 
//       scrollTop: $("main").height() 
//     }, 1000);
//   }

//   function scroll() {
//     $(".message-wrap").animate({
//       scrollTop: 9000
//     }, 1000);
//   }

//   $("input[type='submit']").click(function() {
//     scroll();
//   });

//   $("aside").find("li").click(function() {
//     initScroll();
//     $(".init").animate({
//       'opacity': '0'
//     }, 500);
//   });

//   $("aside").find("li").click(function() {
//     if (index == 1) {
//       index = 0;
//       $(".message-wrap").find(".message").css({
//         'opacity': '1'
//       });
//     } else {
//       index = 0;
//       $(".message-wrap").find(".message").css({
//         'opacity': '0'
//       });
//       $(".loader").delay(500).animate({
//         'opacity': '1'
//       });
//       setTimeout(function() {
//         index = 0;
//         $(".message-wrap").find(".message").css({
//           'opacity': '1'
//         });
//         $(".loader").animate({
//           'opacity': '0'
//         });
//       }, 3000)
//     }
//   });
// });