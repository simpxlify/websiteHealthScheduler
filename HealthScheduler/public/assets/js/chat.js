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
  
 


    //   var li = document.createElement("li")
    //   li.appendChild(t)

      db.collection("users").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
           var user = {userID : doc.data().userID , nome : doc.data().username, avatar : doc.data().imagePath }


          var listContainer = document.createElement('div');
          listContainer.className = 'userBox'
          // Make the list
          var listElement = document.createElement('ul');
          listElement.className = 'listOfUsers'
          // Set up a loop that goes through the items in listItems one at a time

              // let div = document.createElement('div')
              document.getElementsByTagName('body')[0].appendChild(listContainer);
              listContainer.appendChild(listElement);



              listItem = document.createElement('li');

              listItem2 = document.createElement('img');
              listItem2.className = 'imgRedonda'
        // Add the item text
              listItem.innerHTML = doc.data().username;
              listItem2.src = doc.data().imagePath;


        // Add listItem to the listElement
              listElement.appendChild(listItem);
              listElement.appendChild(listItem2);
              console.log(user);

          // myList.push(user);
          // myList.push(doc.data().imagePath);
          // console.log(doc.data().userID);
        });
    })
    .catch(function(error) {

        console.log("Error getting documents: ", error);

    });


//     div.innerHTML = `



//               <div class="contact-list-item" style="z-index: 427; height: 72px; display: contents;">
//                     <div class="JSbIY">
//                         <div tabindex="-1">
//                             <div class="_2EXPL aZ91u">
//                                 <div class="dIyEr">
//                                     <div class="_1WliW" style="height: 49px; width: 49px;">
//                                         <img src="#" class="Qgzj8 gqwaM contact-photo" style="display:none">
//                                         <div class="_3ZW2E">
//                                             <span data-icon="default-user">
//                                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
//                                                     <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
//                                                     <g fill="#FFF">
//                                                         <path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"></path>
//                                                     </g>
//                                                 </svg>
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="_3j7s9">
//                                     <div class="_2FBdJ">
//                                         <div class="_25Ooe">
//                                             <span dir="auto" class="_1wjpf contact-name">${user.username}</span>
//                                         </div>
//                                     </div>
//                                     <div class="_1AwDx">
//                                         <div class="_itDl"></div>
//                                         <div class="_3Bxar"></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>




//               `;

        
  
// var novoElem  = document.createElement('li');
// var nome     = document.createTextNode('');
// novoElem.appendChild(texto);

// //
// // Recuperando a lista
// //
// var lista = document.getElementsByTagName('ul')[0];

// //
// // Recuperando os itens
// //
// var itens = document.getElementsByTagName('li');

// //
// // Inserindo com insertBefore()
// //
// lista.insertBefore(novoElem, itens[0]);

          // id: i,
          // username: myList[i].nome,
          // avatar: myList[i].avatar,
          // messages: ["ola"]
      
    
     

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