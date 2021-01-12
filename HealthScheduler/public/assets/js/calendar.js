// "site": "healthscheduler-am",
//global variables
// const db = firebase.firestore();

var medicID = "";
firebase.auth().onAuthStateChanged(function (user) {
  if (user != null) {
    // document.getElementsByTagName("BODY")[0].style.display = "contents";
    medicID = "" + user.uid;
  }
});

var monthEl = $(".c-main");
var dataCel = $(".c-cal__cel");
var dateObj = new Date();
var month = dateObj.getMonth() + 1;
var day = dateObj.getDate();
// var year = dateObj.getUTCFullYear(); // 2020
var year = dateObj.getFullYear(); // 2021
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
  "Dezembro"
];
var indexMonth = month;
var todayBtn = $(".c-today__btn");
var addBtn = $(".js-event__add");
var saveBtn = $(".js-event__save");
var closeBtn = $(".js-event__close");
var winCreator = $(".js-event__creator");
var inputDate = $(this).data();
day = (day < 10) ? '0' + day : day;
month = (month < 10) ? '0' + month : month;
today = year + "-" + month + "-" + day;
fillEventSidebar($(this), today);


// ------ set default events -------
function defaultEvents(dataDay, dataName, dataNotes, classTag) {
  var date = $('*[data-day=' + dataDay + ']');
  date.attr("data-name", dataName);
  date.attr("data-notes", dataNotes);
  date.addClass("event");
  date.addClass("event--" + classTag);

}

// defaultEvents(today, 'HOJE', '', 'important');
// defaultEvents('2021-12-25', 'FELIZ NATAL', '', 'festivity');

db.collection("consultas").get().then(function (querySnapshot) {
  querySnapshot.forEach(function (doc) {
    if (doc.data().medicID == medicID) {


      var thisYear = (doc.data().date).slice(0, 4);


      if (year == thisYear) {


        if (doc.data().typeOfConsult == 'Fisioterapia') {
          defaultEvents(doc.data().date, doc.data().doctorName, doc.data().notes, 'Fisioterapia');
        }
        if (doc.data().typeOfConsult == 'Medicina física') {
          defaultEvents(doc.data().date, doc.data().doctorName, doc.data().notes, 'Medicina');

        }
        if (doc.data().typeOfConsult == 'Reabilitação') {
          defaultEvents(doc.data().date, doc.data().doctorName, doc.data().notes, 'Reabilitação');

        }
        if (doc.data().typeOfConsult == 'Cuidados Paliativos') {
          defaultEvents(doc.data().date, doc.data().doctorName, doc.data().notes, 'Cuidados');
        }
        if (doc.data().typeOfConsult == 'Neurologia') {
          defaultEvents(doc.data().date, doc.data().doctorName, doc.data().notes, 'Neurologia');

        }
        if (doc.data().typeOfConsult == 'Pneumologia') {
          defaultEvents(doc.data().date, doc.data().doctorName, doc.data().notes, 'Pneumologia');
        }
        // defaultEvents(doc.data().date,doc.data().doctorName,doc.data().notes,'Medicina');
        // defaultEvents(doc.data().date,doc.data().doctorName,doc.data().notes,'Reabilitação');
        // defaultEvents(doc.data().date,doc.data().doctorName,doc.data().notes,'Cuidados');
        // defaultEvents(doc.data().date,doc.data().doctorName,doc.data().notes,'Neurologia');
        // defaultEvents(doc.data().date,doc.data().doctorName,doc.data().notes,'Pneumologia');


      }
      // else {
      //   alert('error');
      // }
    }
  });
});


// ------ functions control -------

//button of the current day
todayBtn.on("click", function () {
  if (month < indexMonth) {

    var step = indexMonth - month;
    movePrev(step, true);


  } else if (month > indexMonth) {

    var step = month - indexMonth;
    moveNext(step, true);



  } else if (month == indexMonth) {
    var step = month;

  }
});


//higlight the cel of current day
dataCel.each(function () {
  if ($(this).data("day") === today) {
    $(this).addClass("isToday");
    var thisDay = $(this).attr("data-day").slice(8);
    var thisMonth = $(this).attr("data-day").slice(5, 7);
    var thisYear = $(this).attr("data-day").slice(0, 4);
    var thisDate = thisYear + "-" + thisMonth + "-" + thisDay;
    fillEventSidebar($(this), thisDate);
  }
});


var inputTypeofconsult = document.getElementById("typeOfMedic");
var inputDocname = document.getElementById("medicName");

//window event creator
addBtn.on("click", function () {
  winCreator.addClass("isVisible");

  db.collection("users_medic").doc(medicID)
    .get().then(function(doc) {
      if (doc.exists){
        inputTypeofconsult.value = doc.data().typeOfMedic;
        inputDocname.value = doc.data().username;
      } else {
        console.log("No such document!");
      }}).catch(function(error) {
        console.log("Error getting document:", error);
      });

  $("body").addClass("overlay");
  dataCel.each(function () {
    if ($(this).hasClass("isSelected")) {
      today = $(this).data("day");
      document.querySelector('input[type="date"]').value = today;
    } else {
      document.querySelector('input[type="date"]').value = today;
    }
  });
});


closeBtn.on("click", function () {
  winCreator.removeClass("isVisible");
  $("body").removeClass("overlay");
  $("#addEvent")[0].reset();

});






saveBtn.on("click", function () {

  const inputCabinet = $("input[name=cabinet]").val();
  const inputDate = $("input[name=date]").val();
  // const inputDocname = $("input[name=doctorname]").val();
  const inputHour = $("input[name=hour]").val();
  const inputFloor = $("input[name=floor]").val();
  // const inputLocal = $("input[name=local]").val();
  const inputLocal = $("select[name=local]").find(":selected").text();
  const inputPavilion = $("input[name=pavilion]").val();
  const inputNotes = $("input[name=notes]").val();
  // const inputTypeofconsult = $("select[name=typeofconsult]").find(":selected").text();
  var typeOfConsult = inputTypeofconsult.value;
  var doctorName = inputDocname.value;


  if (doctorName === "" || inputCabinet === "" || inputDate === "" || inputHour === "" || inputFloor === "" || inputLocal === "" ||
    inputPavilion === "" || inputNotes === "" || typeOfConsult === "") {

    alert("Preencha tudo");

  } else {

    db.collection('consultas').add({
        cabinet: inputCabinet,
        date: inputDate,
        doctorName,
        floor: inputFloor,
        hour: inputHour,
        local: inputLocal,
        pavilion: inputPavilion,
        typeOfConsult,
        notes: inputNotes,
        medicID: medicID


      }),
      function (error) {
        if (!error) {
          const inputCabinet = $("input[name=cabinet]").val();
          const inputDate = $("input[name=date]").val();
          const inputDocname = $("input[name=doctorname]").val();
          const inputHour = $("input[name=hour]").val();
          const inputFloor = $("input[name=floor]").val();
          // const inputLocal = $("input[name=local]").val();
          const inputLocal = $("select[name=local]").find(":selected").text();
          const inputPavilion = $("input[name=pavilion]").val();
          const inputNotes = $("textarea[name=notes]").val();
          const inputTypeofconsult = $("select[name=typeofconsult]").find(":selected").text();
        } else {
          alert("error")
        }
      }


      winCreator.removeClass("isVisible");
      $("body").removeClass("overlay");
      $("#addEvent")[0].reset();
  }
  
  dataCel.each(function () {
    if ($(this).data("day") === inputDate) {
      if (doctorName != null) {
        $(this).attr("data-name", doctorName);
      }
      if (inputNotes != null) {
        $(this).attr("data-notes", inputNotes);
      }
      $(this).addClass("event");
      if (typeOfConsult != null) {
        $(this).addClass("event--" + typeOfConsult);
      }

      // var thisDay = $(this).attr("data-day").slice(8);
      // var thisMonth = $(this).attr("data-day").slice(5, 7);
      // var thisYear = $(this).attr("data-day").slice(0,4);
      // var thisDate = thisYear + "-" + thisMonth + "-" + thisDay;
      // fillEventSidebar($(this) , thisDate);
    }


  });

});

//fill sidebar event info
function fillEventSidebar(self, thisDate) {

  $(".c-aside__event").remove();
  // var thisName = self.attr("data-name");
  // var thisNotes = self.attr("data-notes");
  // var thisFisioterapia = self.hasClass("event--Fisioterapia");
  // var thisMedicina = self.hasClass("event--Medicina");
  // var thisReabilitação = self.hasClass("event--Reabilitação");
  // var thisCuidados = self.hasClass("event--Cuidados");
  // var thisNeurologia = self.hasClass("event--Neurologia");
  // var thisPneumologia = self.hasClass("event--Pneumologia");
  // var thisEvent = self.hasClass("event");


  // switch (true) {

  //   case thisEvent:

  //     $(".c-aside__eventList").append("<p class='c-aside__event'>" +thisName +" <span> • " +thisNotes +"</span></p>");
  //     break;
  // }

  db.collection("consultas").where("medicID", "==", medicID).where("date", "==", thisDate).onSnapshot(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {

      switch (doc.data().typeOfConsult) {

        case "Fisioterapia":

          $(".c-aside__eventList").append("<p class='c-aside__event c-aside__event--Fisioterapia'>" + doc.data().hour + " <span> • " + doc.data().notes + "</span></p>");
          break;

        case "Medicina física":

          $(".c-aside__eventList").append("<p class='c-aside__event c-aside__event--Medicina'>" + doc.data().hour + " <span> • " + doc.data().notes + "</span></p>");
          break;

        case "Reabilitação":

          $(".c-aside__eventList").append("<p class='c-aside__event c-aside__event--Reabilitação'>" + doc.data().hour + " <span> • " + doc.data().notes + "</span></p>");
          break;

        case "Cuidados Paliativos":

          $(".c-aside__eventList").append("<p class='c-aside__event c-aside__event--Cuidados'>" + doc.data().hour + " <span> • " + doc.data().notes + "</span></p>");
          break;

        case "Neurologia":

          $(".c-aside__eventList").append("<p class='c-aside__event c-aside__event--Neurologia'>" + doc.data().hour + " <span> • " + doc.data().notes + "</span></p>");
          break;

        case "Pneumologia":

          $(".c-aside__eventList").append("<p class='c-aside__event c-aside__event--Pneumologia'>" + doc.data().hour + " <span> • " + doc.data().notes + "</span></p>");
          break;

          // case thisEvent:

          // $(".c-aside__eventList").append("<p class='c-aside__event'>" +thisName +" <span> • " +thisNotes +"</span></p>");
          // break;

      }
    })
  })


  // db.collection("consultas").where('medicID', "==", medicID).get().then(function (querySnapshot) {
  //   querySnapshot.forEach(function (doc) {
  //     switch (true) {

  //       case thisFisioterapia:


  //         $(".c-aside__eventList").append("<p class='c-aside__event c-aside__event--Fisioterapia'>" + thisName + " <span> • " + thisNotes + "</span></p>");

  //         break;

  //       case thisMedicina:


  //         $(".c-aside__eventList").append("<p class='c-aside__event c-aside__event--Medicina'>" + thisName + " <span> • " + thisNotes + "</span></p>");

  //         break;

  //       case thisReabilitação:


  //         $(".c-aside__eventList").append("<p class='c-aside__event c-aside__event--Reabilitação'>" + thisName + " <span> • " + thisNotes + "</span></p>");

  //         break;

  //       case thisCuidados:


  //         $(".c-aside__eventList").append("<p class='c-aside__event c-aside__event--Cuidados'>" + thisName + " <span> • " + thisNotes + "</span></p>");

  //         break;

  //       case thisNeurologia:


  //         $(".c-aside__eventList").append("<p class='c-aside__event c-aside__event--Neurologia'>" + thisName + " <span> • " + thisNotes + "</span></p>");

  //         break;

  //       case thisPneumologia:


  //         $(".c-aside__eventList").append("<p class='c-aside__event c-aside__event--Pneumologia'>" + thisName + " <span> • " + thisNotes + "</span></p>");

  //         break;

  //       case thisEvent:

  //         $(".c-aside__eventList").append("<p class='c-aside__event'>" + thisName + " <span> • " + thisNotes + "</span></p>");
  //         break;

  //     }
  //   })
  // })

};


dataCel.on("click", function () {
  var thisEl = $(this);
  var thisDay = $(this).attr("data-day").slice(8);
  var thisMonth = $(this)
    .attr("data-day")
    .slice(5, 7);
  var thisYear = $(this).attr("data-day").slice(0, 4);
  var thisDate = thisYear + "-" + thisMonth + "-" + thisDay;

  fillEventSidebar($(this), thisDate);


  $(".c-aside__num").text(thisDay);
  $(".c-aside__month").text(monthText[thisMonth - 1]);

  dataCel.removeClass("isSelected");
  thisEl.addClass("isSelected");

});

//function for move the months
function moveNext(fakeClick, indexNext) {
  for (var i = 0; i < fakeClick; i++) {
    $(".c-main").css({
      left: "-=100%"
    });
    $(".c-paginator__month").css({
      left: "-=100%"
    });
    switch (true) {
      case indexNext:
        indexMonth += 1;
        break;
    }
  }
}

function movePrev(fakeClick, indexPrev) {
  for (var i = 0; i < fakeClick; i++) {
    $(".c-main").css({
      left: "+=100%"
    });
    $(".c-paginator__month").css({
      left: "+=100%"
    });
    switch (true) {
      case indexPrev:
        indexMonth -= 1;
        break;
    }
  }
}

//months paginator
function buttonsPaginator(buttonId, mainClass, monthClass, next, prev) {
  switch (true) {
    case next:
      $(buttonId).on("click", function () {
        if (indexMonth >= 2) {
          $(mainClass).css({
            left: "+=100%"
          });
          $(monthClass).css({
            left: "+=100%"
          });
          indexMonth -= 1;
        }
        return indexMonth;
      });
      break;
    case prev:
      $(buttonId).on("click", function () {
        if (indexMonth <= 11) {
          $(mainClass).css({
            left: "-=100%"
          });
          $(monthClass).css({
            left: "-=100%"
          });
          indexMonth += 1;
        }
        return indexMonth;
      });
      break;
  }
}

buttonsPaginator("#next", monthEl, ".c-paginator__month", false, true);
buttonsPaginator("#prev", monthEl, ".c-paginator__month", true, false);

//launch function to set the current month
moveNext(indexMonth - 1, false);

//fill the sidebar with current day
$(".c-aside__num").text(day);
$(".c-aside__month").text(monthText[month - 1]);