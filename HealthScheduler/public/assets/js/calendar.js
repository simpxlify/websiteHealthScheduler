// "site": "healthscheduler-am",
//global variables
const db = firebase.firestore();

var medicID = "";
firebase.auth().onAuthStateChanged(function(user) {
  if (user != null) {
        document.getElementsByTagName("BODY")[0].style.display = "contents";
        medicID = "" + user.medicID;
  }
});

var monthEl = $(".c-main");
var dataCel = $(".c-cal__cel");
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear(); // 2020
// var year = dateObj.getUTCFullYear() + 1; // 2021
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
today = year + "-" + month + "-" + day;



// ------ set default events -------
function defaultEvents(dataDay,dataName,dataNotes,classTag){
  var date = $('*[data-day='+dataDay+']');
  date.attr("data-name", dataName);
  date.attr("data-notes", dataNotes);
  date.addClass("event");
  date.addClass("event--" + classTag);
  
}

defaultEvents(today, 'HOJE','','important');
defaultEvents('2020-12-25', 'FELIZ NATAL','','festivity');

db.collection("consultas").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    if(doc.data().medicID == medicID){

      var thisYear = (doc.data().date).slice(0,4);
      if(year == thisYear)
      {

        if( doc.data().typeOfConsult == 'Fisioterapia'  )
        {
          defaultEvents(doc.data().date,doc.data().doctorName,doc.data().notes,'Fisioterapia');
        }
        if( doc.data().typeOfConsult == 'Medicina física'  )
        {
          defaultEvents(doc.data().date,doc.data().doctorName,doc.data().notes,'Medicina');
          console.log('mf');
        }
        if( doc.data().typeOfConsult == 'Reabilitação'  )
        {
          defaultEvents(doc.data().date,doc.data().doctorName,doc.data().notes,'Reabilitação');
          console.log('rheab');
        }
        if( doc.data().typeOfConsult == 'Cuidados Paliativos'  )
        {
          defaultEvents(doc.data().date,doc.data().doctorName,doc.data().notes,'Cuidados');
        }
        if( doc.data().typeOfConsult == 'Neurologia'  )
        {
          defaultEvents(doc.data().date,doc.data().doctorName,doc.data().notes,'Neurologia');
          console.log('neuro');
        }
        if( doc.data().typeOfConsult == 'Pneumologia'  )
        {
          defaultEvents(doc.data().date,doc.data().doctorName,doc.data().notes,'Pneumologia');
        }
        // defaultEvents(doc.data().date,doc.data().doctorName,doc.data().notes,'Medicina');
        // defaultEvents(doc.data().date,doc.data().doctorName,doc.data().notes,'Reabilitação');
        // defaultEvents(doc.data().date,doc.data().doctorName,doc.data().notes,'Cuidados');
        // defaultEvents(doc.data().date,doc.data().doctorName,doc.data().notes,'Neurologia');
        // defaultEvents(doc.data().date,doc.data().doctorName,doc.data().notes,'Pneumologia');

      console.log(doc.data())
    
  }
    // else {
    //   alert('error');
    // }
    }
  });
});


// ------ functions control -------

//button of the current day
todayBtn.on("click", function() {
  if (month < indexMonth) {
    var step = indexMonth % month;
    movePrev(step, true);
  } else if (month > indexMonth) {
    var step = month - indexMonth;
    moveNext(step, true);
  }
});

//higlight the cel of current day
dataCel.each(function() {
  if ($(this).data("day") === today) {
    $(this).addClass("isToday");
    fillEventSidebar($(this));
  }
});

//window event creator
addBtn.on("click", function() {

  winCreator.addClass("isVisible");
  $("body").addClass("overlay");
  dataCel.each(function() {
    if ($(this).hasClass("isSelected")) {
      today = $(this).data("day");
      document.querySelector('input[type="date"]').value = today;
    } else {
      document.querySelector('input[type="date"]').value = today;
    }
  });
});


closeBtn.on("click", function() {
  winCreator.removeClass("isVisible");
  $("body").removeClass("overlay");
});


saveBtn.on("click", function() {


  const inputCabinet = $("input[name=cabinet]").val();
  const inputDate = $("input[name=date]").val();
  const inputDocname = $("input[name=doctorname]").val();
  const inputHour = $("input[name=hour]").val();
  const inputFloor = $("input[name=floor]").val();
  const inputLocal = $("input[name=local]").val();
  const inputPavilion = $("input[name=pavilion]").val();
  const inputNotes = $("input[name=notes]").val();
  const inputTypeofconsult = $("select[name=typeofconsult]").find(":selected").text();

  if (!inputDocname  ) {

    alert("error");

  } 

  else {


    db.collection('consultas').add({
      cabinet : inputCabinet,
      date : inputDate,
      doctorName : inputDocname,
      floor : inputFloor, 
      hour : inputHour,
      local : inputLocal,
      pavilion : inputPavilion,
      typeOfConsult : inputTypeofconsult,
      notes : inputNotes,
      medicID
    
    
  }),
  function(error){
    if(!error)
    {
      const inputCabinet = $("input[name=cabinet]").val();
      const inputDate = $("input[name=date]").val();
      const inputDocname = $("input[name=doctorname]").val();
      const inputHour = $("input[name=hour]").val();
      const inputFloor = $("input[name=floor]").val();
      const inputLocal = $("input[name=local]").val();
      const inputPavilion = $("input[name=pavilion]").val();
      const inputNotes = $("textarea[name=notes]").val();
      const inputTypeofconsult = $("select[name=typeofconsult]").find(":selected").text();
    }
    else{
      alert("error")
    }
  }
}
  dataCel.each(function() {
    if ($(this).data("day") === inputDate) {
      if (inputDocname != null) {
        $(this).attr("data-name", inputDocname);
      }
      if (inputNotes != null) {
        $(this).attr("data-notes", inputNotes);
      }
      $(this).addClass("event");
      if (inputTypeofconsult != null) {
        $(this).addClass("event--" + inputTypeofconsult);
      }
      fillEventSidebar($(this));
    }

    
  });


  winCreator.removeClass("isVisible");
  $("body").removeClass("overlay");
  $("#addEvent")[0].reset();

});

//fill sidebar event info
function fillEventSidebar(self) {
  $(".c-aside__event").remove();
  var thisName = self.attr("data-name");
  var thisNotes = self.attr("data-notes");
  var thisFisioterapia = self.hasClass("event--Fisioterapia");
  var thisMedicina = self.hasClass("event--Medicina");
  var thisReabilitação = self.hasClass("event--Reabilitação");
  var thisCuidados = self.hasClass("event--Cuidados");
  var thisNeurologia = self.hasClass("event--Neurologia");
  var thisPneumologia = self.hasClass("event--Pneumologia");
  var thisEvent = self.hasClass("event");
  

  switch (true) {
    case thisFisioterapia:
      $(".c-aside__eventList").append(
              "<p class='c-aside__event c-aside__event--Fisioterapia'>" +
              thisName +
              " <span> • " +
              thisNotes +
              "</span></p>"
      );
      break;
    case thisMedicina:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--Medicina'>" +
        thisName +
        " <span> • " +
        thisNotes +
        "</span></p>"
      );
      break;
    case thisReabilitação:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--Reabilitação'>" +
        thisName +
        " <span> • " +
        thisNotes +
        "</span></p>"
      );
      break;
      case thisCuidados:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--Cuidados'>" +
        thisName +
        " <span> • " +
        thisNotes +
        "</span></p>"
      );
      break;
      case thisNeurologia:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--Neurologia'>" +
        thisName +
        " <span> • " +
        thisNotes +
        "</span></p>"
      );
      break;
      case thisPneumologia:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--Pneumologia'>" +
        thisName +
        " <span> • " +
        thisNotes +
        "</span></p>"
      );
      break;
    case thisEvent:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event'>" +
        thisName +
        " <span> • " +
        thisNotes +
        "</span></p>"
      );
      break;
   }
};
dataCel.on("click", function() {
  var thisEl = $(this);
  var thisDay = $(this)
  .attr("data-day")
  .slice(8);
  var thisMonth = $(this)
  .attr("data-day")
  .slice(5, 7);
  // var thisYear = $(this)
  // .attr("data-day")
  // .slice(0,4);

  fillEventSidebar($(this));

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
      $(buttonId).on("click", function() {
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
      $(buttonId).on("click", function() {
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