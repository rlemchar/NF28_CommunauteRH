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
//var uniqueID = "";
var uniqueIndex =0;


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
            uniqueIndex +
            "\" class=\"draggable " + tiltedSpec + " textPost\" onclick=\"showComments(" +
            uniqueIndex +
            ")\">"+
            "<h4>" +
            publicationTextTitle +
            "</h4>" +
            "<p style =\" white-space: pre-wrap;\">" +
            publicationText +
            "</p>" +
            "</aside>"
        );
        makePostsDraggable();
        // Clearing values after editing
        $("#publicationTextTitle").val('');
        $("#publicationText").val('');
        uniqueIndex++;
    });
    $("#image-publi-option").click(function(){
        var postedImgURL = document.getElementById("downloadedImg").src;
        $("#publications").append(
            "<aside draggable=\"true\" id=\" " +
            uniqueIndex +
            "\" class=\"draggable imagePost\" onclick=\"showComments(" + uniqueIndex + ")\">" +
            "<img class=\"imageInsidePost\" draggable=\"false\" src=\" " + String(postedImgURL) + " \" alt=\"yourimage\" />" +
            "</aside>"
        );
        makePostsDraggable();
        uniqueIndex++;
    });

    $("#survey-publi-option").click(function(){
        var question = document.getElementById("surveyTitle").value;
        var optionPublicationRootID = "opRoot" + uniqueIndex;
        $("#publications").append(
            "<aside draggable=\"true\" id=\" " +
            uniqueIndex +
            "\" class=\"draggable " + tiltedSpec + " textPost\" onclick=\"showComments(" +
            uniqueIndex +
            ")\">"+
            "<h4>" +
            question +
            "</h4>" +
            "<p class=\"option\" id=\"" +
            optionPublicationRootID+
            "\" style =\" white-space: pre-wrap;\">" +
            "</p>" +
            "</aside>"
        );

        for (var i= 0; i<= numberOfSurveyOptions;i++){
            surveyOptionID = "op"+i;
            var newOption = document.getElementById(surveyOptionID).value;
            $("#"+ optionPublicationRootID).append(" <div class=\"row optionDisplay\"><input type=\"radio\" name=\"op\"> " +
                "<label for=\"op\">" +
                newOption +
                " </label> </div> ");

        }

        makePostsDraggable();
        uniqueIndex++;
        numberOfSurveyOptions=0;
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

// Survey

var index = 0;
// Pour recupérer les options
var numberOfSurveyOptions=0;

$(document).ready(function() {
    $("#surveyAdd").click(function () {
        nextID = "op" + index++;
        $("#surveyOptions").append(" <div class=\"row\"> </div><input type=\"radio\" name=\"op\"> " +
            "<label for=\"op\"> <input class=\"addedOption\" id=\"" + nextID + "\" placeholder=\"Option\" autocomplete=\"off\"> </label> </div> ");
    });
    numberOfSurveyOptions++;

    $("#surveyDelete").click(function () {

    });
});

// -----------------------------------------

// Comments and reactions

var tableOfComments = {};
var tableNumberOfReactions = {};
var currentPostCommentedID ="";

function addComment() {


    var comment = document.getElementById("add-comments").value;
    if (tableOfComments[currentPostCommentedID] == null){
        tableOfComments[currentPostCommentedID] = [comment];
    }else{
        tableOfComments[currentPostCommentedID].push(comment);
    }
    // Clearing comment area after publishing
    $(document).ready(function() {
        $("#add-comments").val('');
    });
    loadModal();
}

function addReaction(){

    console.log("adding for :" + currentPostCommentedID);
    if (tableNumberOfReactions[currentPostCommentedID] == null){
        tableNumberOfReactions[currentPostCommentedID] = 1;
    }else{
        tableNumberOfReactions[currentPostCommentedID]++;
    }

    loadModal();
}


function loadModal(){
    console.log("In modal for id : " + currentPostCommentedID );
    $("#commentModal").modal();

    var numberOfReactions = tableNumberOfReactions[currentPostCommentedID];
    console.log("Number of reactions : " + numberOfReactions);
    var comments = tableOfComments[currentPostCommentedID];
    var text = " personne a aimé ça.";
    $(document).ready(function() {
        if (numberOfReactions != null){
            if (numberOfReactions>1){
                text = " personnes ont aimé ça."
            }

                    $("#displayReactions").empty();
                    $("#displayReactions").append("<div id= \"like-explanation\"class=\"top-right display-comments\"> " +
                        numberOfReactions + text + "</div>");

        }
        if (comments != null) {

            $("#comment-row").empty();
            for (var i = 0; i < comments.length; i++) {

                $("#comment-row").append("<div class=\"comment row\"> " +
                    "<a><img class=\"user-logo\" src=\"img/ronaldo.png\"></a><p> "
                    + comments[i] +
                    " </p> </div>"
                );
            }
        }
    });
}


function showComments(id_pub){
    console.log("in show comments");
    currentPostCommentedID = id_pub;
    console.log("in show comments for :" + currentPostCommentedID);
    loadModal();
}

$(document).ready(function() {
    $('#commentModal').on('hidden.bs.modal', function () {
        // clearing the modal when closed
        console.log("CLOSED");
        $("#displayReactions").empty();
        $("#comment-row").empty();
    });
});









