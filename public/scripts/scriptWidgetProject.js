// Project object
function Project(id, name, tasks, indexTask) {
	this.id = id;
	this.name = name;
	this.tasks = tasks;
	this.indexTask = indexTask;
	this.nextTask = function() {
		if (this.indexTask == this.tasks.length-1) return false;
		this.indexTask++;
		return true;
	};			
	this.getTask = function() {
		return {
			percentage : (this.indexTask)/this.tasks.length,
			name : this.tasks[this.indexTask][0],
			deadline : this.tasks[this.indexTask][1]
		};
	};
	
	this.deadline = function() {
		return "30 j";
	}

}

// Array of projects, temporary (to be obtained from the SQL database in the future)
var P = [
	new Project(1,"Création d'un outil de recherche",[["tache1","date1"],["tache2","date2"],["tache3","date3"],["tache4","date4"]],1),
	new Project(2,"Autre projet important",[["tache1","date1"],["tache2","date2"],["tache3","date3"],["tache4","date4"]],2),
	new Project(3,"Autre projet important important très très important mais genre vraiment vraiment vraiment vraiiiiment important, genre vraiment",[["tache1","date1"],["tache2","date2"],["tache3","date3"],["tache4","date4"]],2)
];

// Display the projects from the array P
function loadProjects(projects) {
	projects.forEach(function(ele) {
		$("#arrayOfProjects").prepend("<div class='contentProject' id='project"+ele.id+"'></div>");
		$("#project"+ele.id).append("<div class='nameProject'></div>")
		.append("<div class='deadlineProject'></div>")
		.append("<div class='cursorProject'></div>")
		.append("<div class='arrowProject'></div>")
		.append("<div class='taskProject'></div>");
		
		$("#project"+ele.id+" .cursorProject").append("<div class='loadingBarProject'></div>");
		
		$("#project"+ele.id+" .taskProject").append("<div class='checkBoxProject'></div>")
		.append("<div class='nameTaskProject'></div>")
		.append("<div class='dateTaskProject'></div>");
	
		$("#project"+ele.id+" .nameProject").html(ele.name);
		$("#project"+ele.id+" .deadlineProject").html(ele.deadline());
		cssBar(ele.id, ele.getTask());
		cssTask(ele.id, ele.getTask());
	});

}
	
// Get the project object from its ID
function getProjectFromId(id) {
	var e = false;
	P.forEach(function(ele) {
		if (ele.id == id) {
			e=ele;
			return;
		}
	});
	return e;
}

// Update the css of the loading bar when a task is completed (or display the right when the page load)	
function cssBar(id, task=0) {
	if (!task) task = getProjectFromId(id).getTask();
	$("#project"+id+" .loadingBarProject").css('width',(task.percentage*0.96)*100+"%");
	$("#project"+id+" .arrowProject").css('left',(task.percentage*0.82+0.09)*100+"%");
	return task;
}

// Update the innerHTML of the task bar when a task is completed (or display the right when the page load)	
function cssTask(id, task=0) {
	if (!task) task = getProjectFromId(id).getTask();
	$("#project"+id+" .nameTaskProject").html(task.name);
	$("#project"+id+" .dateTaskProject").html(task.deadline);
	return task;
}
	
// Put the right dimension of all the containers of the widget from the width in pixel of the #widgetProject 
// (it's the only size that must be given, everything else is calculated from this)	
function sizeWidget() {
	$('#widgetProject').css('height',0.5*$('#widgetProject').width());
	$('#nameWidgetProject').css('font-size', 0.9*$('#nameWidgetProject').height());
	$('#addNewProject').css('border-width',0.01*$('#arrayOfProjects').height());
	$('#addNewProject').css('height',"calc(100% - "+  0.02*$('#arrayOfProjects').height()+"px)");
	$('.arrowProject').each(function(index) {
		$(this).css('border-width',0.03*$('contentProject').height());
	}); 
	$('.nameProject').each(function(index) {
		$(this).css('font-size', 0.43*$(this).height());
	});
	$('.deadlineProject').each(function(index) {
		$(this).css('font-size', 0.67*$(this).height());
	});
	$('.nameTaskProject, .dateTaskProject').each(function(index) {
		$(this).css('font-size', 0.83*$(this).height());
	}); 
}

// on load			
$(function() {
	$('#widgetProject').css('width', w); // get the width (given via the url as ?w=widthInPixels)
	loadProjects(P); // Display the projects
	sizeWidget(); // Put the right dimension for everything
	$('.checkBoxProject').click(function() { // When a task is completed
		var current = $(this).parent().parent();
		$(this).css('background-color', 'rgb(114,183,189)');
		var id = current.attr('id').split('project')[1];
		var project = getProjectFromId(id);
		if(!project.nextTask()) {	// project finished !
			current.find(".loadingBarProject").css('width',"96%");
			current.find(".arrowProject").css('left',"91%");
			current.find('.nameTaskProject, .dateTaskProject').hide("fast", function() {
				current.find('.checkBoxProject').css('background-color', '#A8A8A8');
				current.hide("fast");
			});
		}
		else {
			var task = project.getTask();
			cssBar(id, task);
			current.find('.nameTaskProject, .dateTaskProject').hide("fast", function() {
				current.find('.checkBoxProject').css('background-color', '#A8A8A8');
				cssTask(id, task);
			}).show(500);
		}
	});
});