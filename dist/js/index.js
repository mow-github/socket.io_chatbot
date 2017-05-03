var socket = io();



socket.on("connect", function (){
  var obj = {
    from: "Välkommen till chatboten, ställ din fråga",
    leftside: true,
    msg: "<ol>" +
    "<li><a href='#'>Vilket glas rekomenderar du för en Sugar creek?</a></li>" +
    "<li><a href='#'>Behöver ni anställa personal?</a></li>" +
    "<li><a href='#'>Kan ni ge mig ett bra citat?</a></li>" +
    "<li><a href='#'>Vilka API:er använder knowyourbeer?</a></li>" +
    "<li><a href='#'>Tycker du att jag ska sluta dricka?</a></li>" +
    "</ol></ol><p class='extra'>Besök hos även på: <a href='https://www.bviking.se/lernia/webbappdev/'>Know your beer</a></p>"
  };
  createMsg(obj);
});

socket.on("disconnect", function (){
  console.log("Disconnect from server");
});

socket.on("serverResponse", function (obj){
  createMsg( obj );
});





$(document).ready(function(){


  $("body").on("click", "ol li a",function(e){
    e.preventDefault();
    $("#chat_text").val( $(this).text() );
  });

  $("#chat_submit").on("click", function(e){
    e.preventDefault();
    console.log( $("#chat_text").val() );

    socket.emit("clientRequest", {text: $("#chat_text").val() }, function(obj){
      $("#chat_text").val("");  /*clear the input field*/
      createMsg( obj );
    });
  });

});


/* create a client side response and add data to the DOM */
function createMsg(obj){
  var divContainer          = document.createElement("div");
  var media_body            = document.createElement("div");
  media_body.className      = "media-body";
  var media_heading         = document.createElement("h4");
  media_heading.className   = "media-heading";
  media_heading.innerHTML   = obj.from;
  var media_paragraph       = document.createElement("p");
  media_paragraph.innerHTML = obj.msg;
  var media_left            = document.createElement("div");
  media_left.className      = "media-left media-middle";
  var media_left_img        = document.createElement("img");
  media_left_img.className  = "media-object";
  media_left_img.src        = "/img/beer.png";
  media_left_img.alt        = "/img/beer.png";

  media_body.appendChild(media_heading);
  media_body.appendChild(media_paragraph);
  media_left.appendChild(media_left_img);

  if(obj.leftside){
    divContainer.appendChild(media_left);
    divContainer.appendChild(media_body);
  }else{
    divContainer.appendChild(media_body);
    divContainer.appendChild(media_left);
  }

  $("#chat_msg").append(divContainer);
}




