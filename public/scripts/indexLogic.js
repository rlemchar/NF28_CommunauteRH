var selectedImgpath = "";

//switching from welcome page to whiteboard
var wb = false;
function displayWhiteboard() {
    var main = document.getElementById("main-content");
    var whiteboard = document.getElementById("whiteboard");
    var plus = document.getElementById("plus");
    var h = main.offsetHeight;
    if (wb) {
        whiteboard.style.height = "0";
        plus.style.display = "none";
    } else {
        whiteboard.style.height = h+'px';
        plus.style.display = "block";
    }
    wb = !wb;
}
// -----------------------------------------

// Creating posts

var tilted = 1;
var tiltedSpec ="";
var uniqueID = 0;

$(document).ready(function(){
    $("#text-publi-option").click(function(){
        var publicationText = document.getElementById("publicationText").value;
        var publicationTextTitle = document.getElementById("publicationTextTitle").value;
        if (tilted == 1){
            tiltedSpec = "tilted-left";
            tilted = tilted*-1;
        }else{
            tiltedSpec = "tilted-right";
            tilted = tilted*-1;
        }
        console.log(tiltedSpec);
        $("#publications").append(
            "<aside draggable=\"true\" id=\" " +
            uniqueID++ +
            "\" class=\"draggable " + tiltedSpec + " textPost\">\n" +
            "<h4>" +
            publicationTextTitle +
            "</h4>" +
            "<p style =\" white-space: pre-wrap;\">" +
            publicationText +
            "</p>" +
            "</aside>"
        );
        makePostsDraggable();
    });
    $("#image-publi-option").click(function(){
        var postedImgURL = document.getElementById("downloadedImg").src;
        $("#publications").append(
            "<aside draggable=\"true\" id=\" " +
            uniqueID++ +
            "\" class=\"draggable imagePost\">" +
            "<img class=\"imageInsidePost\" draggable=\"false\" src=\" " + String(postedImgURL) + " \" alt=\"yourimage\" />" +
            "</aside>"
        );
        makePostsDraggable();
    });

    $("#survey-publi-option").click(function(){
        $("#publications").append(
            "<aside draggable=\"true\" id=\" " +
            uniqueID++ +
            "\" class=\"draggable\">\n" +
            "    This is a survey.\n" +
            "</aside>"
        );
        makePostsDraggable();
    });
});

// -----------------------------------------


// Drag and drop
function drag_start(event) {

    this.id = "draggedItem";
    var style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData("text/plain",
        (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
}
function drag_over(event) {

    event.preventDefault();
    return false;
}

function drop(event) {

    var offset = event.dataTransfer.getData("text/plain").split(',');
    var dm = document.getElementById('draggedItem');
    dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
    dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
    event.preventDefault();
    var currentElementDragged = document.getElementById('draggedItem');
    currentElementDragged.id = "";
    return false;
}

window.onload=function(){

    document.body.addEventListener('dragover',drag_over,false);
    document.body.addEventListener('drop',drop,false);
    makePostsDraggable()
}

function makePostsDraggable(){

    var draggables = document.getElementsByClassName("draggable");
    for (var i = 0; i < draggables.length; i++) {
        draggables[i].addEventListener('dragstart',drag_start,false);
    }
}

// -----------------------------------------

// Load images



/*
        // Load images
        function readURL(input) {
            console.log("in readURL");
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#selectedImage').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#imgPath").change(function(){
            console.log("imgpath changed");
            readURL(this);


        });
*/
// -----------------------------------------

// Survey

var index = 0;

$(document).ready(function() {
    $("#surveyAdd").click(function () {
        nextID = "op" + index++;
        console.log("in add option survey" + nextID);
        $("#surveyOptions").append(" <div class=\"row\"> </div><input type=\"radio\" id=\" " + nextID + "\" name=\"op\"> " +
            "<label for=\"op\"> <input class=\"addedOption\" id=\" " + nextID + "\" placeholder=\"Option\" autocomplete=\"off\"> </label> </div> ");
    });

    $("#surveyDelete").click(function () {

    });
});



/*
 <div>
    <input type="radio" id="contactChoice1"
     name="contact" value="email">
    <label for="contactChoice1">Email</label>

    <input type="radio" id="contactChoice2"
     name="contact" value="telephone">
    <label for="contactChoice2">Téléphone</label>

    <input type="radio" id="contactChoice3"
     name="contact" value="courrier">
    <label for="contactChoice3">Courrier</label>
  </div>
 */


// -----------------------------------------

// Comments and reactions

var tableOfComments = {};
var tableNumberOfReactions = {};

function addComment(id_pub,comment) {

    var key = toString(id_pub);
    if (tableNumberOfReactions.key == null){
        tableNumberOfReactions.key = [comment];
    }else{
        tableNumberOfReactions.key.push(comment);
    }
}

function addReaction(id_pub){

    var key = toString(id_pub);
    if (tableNumberOfReactions.key == null){
        tableNumberOfReactions.key = 1;
    }else{
        tableNumberOfReactions.key++;
    }
    console.log(tableNumberOfReactions.key);
}

function displayReaction(id_pub){
    var key = toString(id_pub);
    return tableNumberOfReactions.key;
}

function openCommentModal(id_pub){

    //$("#displayReactions").append(displayReaction(id_pub));

}


$(document).ready(function() {
    $("#lebouton").click(function () {
        $("#commentModal").modal();
    });
});




