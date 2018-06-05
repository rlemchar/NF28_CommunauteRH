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
$(document).ready(function(){
    $("#text-publi-option").click(function(){
        var publicationText = document.getElementById("publicationText").value;
        var publicationTextTitle = document.getElementById("publicationTextTitle").value;
        $("#publications").append(
            "<aside draggable=\"true\" class=\"draggable textPost\">\n" +
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
            "<aside draggable=\"true\" class=\"draggable imagePost\">" +
            "<img class=\"imageInsidePost\" draggable=\"false\" id=\"downloadedImg\" src=\" " + String(postedImgURL) + " \" alt=\"yourimage\" />" +
            "</aside>"
        );
        makePostsDraggable();
    });

    $("#survey-publi-option").click(function(){
        $("#publications").append(
            "<aside draggable=\"true\" class=\"draggable\">\n" +
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
