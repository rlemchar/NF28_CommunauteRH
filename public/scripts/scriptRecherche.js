var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function getXMLHttpRequest() {
    var xhr = null;
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest();
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }
    return xhr;
}


var xmlhttp = null;

function results() {
    // Requête pour récupérer les données du formulaire
    var form = document.querySelector("form");
    var nom = form.elements.nom.value;
    alert(nom);
    var prenom = form.elements.prenom.value;
    var metier = form.elements.job.value;
    var keywords = document.getElementsByTagName("span"); //boucle commence à i = 2
    xmlhttp = getXMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        alert("status = " + xmlhttp.status + " et readyState = " + xmlhttp.readyState);
        if (xmlhttp.readyState == 4 && (xmlhttp.status == 200 || xmlhttp.status == 0)) {
            alert(xmlhttp.responseText);
            var xmlDoc = xmlhttp.responseXML;
            var ppl = xmlDoc.getElementsByTagName("personne");
            //variables pour la gestion des données
            var pers;
            var comp;
            var lan;
            var level;
            var lastname;
            var name;
            var job;
            var company;
            var city;
            //variables pour la réponse à la requête
            var test = 0;
            var result = "";
            //variabes pour les boucles
            var i;
            var j;
            var k;
            var l;
            var z;
            var currentKW;

            for (i = 0; i < ppl.length; i++) {
                pers = ppl[i];
                //c = p.getElementsByClassName("competence");
                comp = pers.getElementsByTagName("competences");
                //alert(comp.length);
                //alert(comp[0].childNodes[0].nodeValue);
                //alert(comp[1].childNodes[0].nodeValue);
                lan = pers.getElementsByTagName("langues");
                level = pers.getElementsByTagName("niveau");
                lastname = pers.getElementsByTagName("nom")[0].childNodes[0].nodeValue;
                name = pers.getElementsByTagName("prenom")[0].childNodes[0].nodeValue;
                job = pers.getElementsByTagName("metier")[0].childNodes[0].nodeValue;
                company = pers.getElementsByTagName("entreprise")[0].childNodes[0].nodeValue;
                city = pers.getElementsByTagName("ville")[0].childNodes[0].nodeValue;
                
                
                if (nom == lastname || prenom == name || metier == job){
                    test = 1;
                }

                j = 0;
                //alert(keywords.length);
                while(j < keywords.length && test != 1) {
                    //alert(keywords[j].innerHTML);
                    currentKW = keywords[j].innerHTML;
                    k = 0;
                    while (k < comp.length && test != 1) {
                        if (comp[k].childNodes[0].nodeValue == currentKW) {
                            test = 1;
                        }
                        k++;
                    }
                    k = 0;
                    while (k < lan.length && test != 1) {
                        if (lan[k].childNodes[0].nodeValue == currentKW) {
                            test = 1;
                        }
                        k++;
                    }
                    if (currentKW == city || currentKW == company){
                        test = 1;
                    }
                    j++;
                }

                if (test == 1) {
                    result += "<div id=\"divPersonne\" class=\"col-md-12\">";

                    result += "<div id=\"Profil\" class=\"col-md-4\">";
                    result += name;
                    result += " ";
                    result += lastname;
                    result += "<br/>";
                    result += "<i>" + job + "</i>";
                    result += "<br/>";
                    result += "<br/>";
                    result += company;
                    result += "<br/>";
                    result += city;
                    result += "</div>";

                    result += "<div id=\"Compétences\" class=\"col-md-3\">";
                    result += "<b>Compétences</b>";
                    result += "<ul id = \"lComp\" class=\"list-unstyled\" ";
                    for (l = 0; l < comp.length; l++) {
                        result += "<li>" + comp[l].childNodes[0].nodeValue + "</li>";
                    }
                    result += "</ul>";
                    result += "</div>";

                    result += "<div id=\"Langues\" class=\"col-md-5\">";
                    result += "<b>Langues</b>";
                    result += "<ul id = \"lLangues\" class=\"list-unstyled\" ";
                    for (z = 0; z < lan.length; z++) {
                        result += "<li>" + lan[z].childNodes[0].nodeValue + " " + level[z].childNodes[0].nodeValue + "</li>";
                    }
                    result += "</ul>";           
                    result += "</div>";
                    
                    result += "<div id=\"buttons\" class=\"col-md-12\">"
                    result += "<button id=\"sendMsg\" onclick=\"sendMsg();\">Envoyer un message</button>";
                    result += "<a href=\"//localhost:8080/newProject\"><button id=\"addToProject\" onclick=\"\">Ajouter à un projet</button></a>";
                    result += "</div>";

                    result += "</div>";
                    result += "<br/><br/>";
                    
                    // Ajouter le contenu de la variable 'result' dans la partie résultats
                    document.getElementById("resultatsRecherche").innerHTML = result;
                    test = 0;

                }
            }
    
        }
    };

    // Accède au xml source dans une URL 
    var path = "//localhost:8080/recherche";
    xmlhttp.open("GET", path, true);
    xmlhttp.send(null);
}

function sendMsg()
{
    alert("renvoi vers une page de messagerie");
}

document.getElementById("selectOrganigramme").addEventListener("change", orga);

function orga(selected, ele1, ele2)
{
    var path = "img/";
	path += selected + ".PNG";

    result = "<img id = \"imgOrga\" src = " + path + ">";
    
    document.getElementById("divOrga").innerHTML = result;
    ele1.style.backgroundColor = "#8B949E";
    ele1.style.color = "white";
    ele2.style.backgroundColor = "#C0C0C0";
    ele2.style.color = "#41484E";


}
