//global variables
 const db = firebase.firestore();
 var myList = new Array();


  var medicID = "";
  firebase.auth().onAuthStateChanged(function(user) {
    if (user != null) {
          document.getElementsByTagName("BODY")[0].style.display = "contents";
          medicID = "" + user.medicID;
    }
  });
  
  db.collection("users").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            var user = {userID : doc.data().userID , nome : doc.data().username, avatar : doc.data().imagePath }
            
            myList.push(user);
            // myList.push(doc.data().imagePath);
            // console.log(doc.data().userID);
          });
      })
      .catch(function(error) {
  
          console.log("Error getting documents: ", error);
  
      });
  
      console.log(myList);

    function getContacts(){
      var li = document.createElement("li")
      li.appendChild(t)
      for (var i = 0; i < myList.length; i ++ ){
        
    
          // id: i,
          // username: myList[i].nome,
          // avatar: myList[i].avatar,
          // messages: ["ola"]
        }
      };
      
    
     

// Animation Styles
$(function() {

  var index = 0;
  
  function initScroll() {
    $(".message-wrap").animate({ 
      scrollTop: $("main").height() 
    }, 1000);
  }
  
  function scroll() {
    $(".message-wrap").animate({
      scrollTop: 9000
    }, 1000);
  }
  
  $("input[type='submit']").click(function() {
    scroll();
  });

  $("aside").find("li").click(function() {
    initScroll();
    $(".init").animate({
      'opacity': '0'
    }, 500);
  });

  $("aside").find("li").click(function() {
    if (index == 1) {
      index = 0;
      $(".message-wrap").find(".message").css({
        'opacity': '1'
      });
    } else {
      index = 0;
      $(".message-wrap").find(".message").css({
        'opacity': '0'
      });
      $(".loader").delay(500).animate({
        'opacity': '1'
      });
      setTimeout(function() {
        index = 0;
        $(".message-wrap").find(".message").css({
          'opacity': '1'
        });
        $(".loader").animate({
          'opacity': '0'
        });
      }, 3000)
    }
  });
});