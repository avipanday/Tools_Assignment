/* 
  site.js
*/

$(document).ready(function() {

	"use strict";

	//var resultDiv = document.getElementById("results");
	//resultDiv.innerHTML = "<p>Hello world in JavaScript!</p>";
	
	var resultList = $("#resultList");	
	resultList.text("This is from JQuery");
	
	var toggleButton = $("#toggleBtn");

	toggleButton.on("click",function(){
		resultList.toggle(500);

		if(toggleButton.text() == "Hide")
		{
			toggleButton.text("Show") ;
		}
		else
			toggleButton.text("Hide");
	
	});

	var apiCall = $("#searchForm");

	apiCall.on("submit", function(e) {
		
		var searchPhrase = $("#searchPhrase").val();
		var langChoice = $("#langChoice").val();

		var gitHubSearch = "https://api.github.com/search/repositories?q=" + searchPhrase + "_language:" + langChoice + "&sort=starts";
		
		//IE broswer will require to make the cross domain value to true 
		jQuery.support.cors = true;
		
		$.get(gitHubSearch)
		.success(function(r) {
	      console.log(r.items.length);
		  displayResults(r.items);
		  lengthCheck(r.items.length);
	    })
		.fail(function(err) {
	      alert("Your call to the API failed!");
	    })
		.done(function() {
	      console.log("API Call completed");
	    });

	    e.preventDefault();

		function lengthCheck(x) {
			if (x <= 0) {
				alert("Your search returned no results!");
			}
		}
	    
		function displayResults(results) {
		    resultList.empty();
		    $.each(results, function(i, item) {

		      var newResult = $("<div class='result'>" +
		        "<div class='title'>" + item.name + "</div>" +
		        "<div>Language: " + item.language + "</div>" +
		        "<div>Owner: " + item.owner.login + "</div>" +
		        "</div>");

		      newResult.hover(function() {
		        // make it darker
		        $(this).css("background-color", "lightgray");
		      }, function() {
		        // reverse
		        $(this).css("background-color", "transparent");
		      });

		      resultList.append(newResult);
	  		})
	  	}

	});


	/* Manipulate DOM*/

/*	resultList.empty();
	
	var results = [{
		name: "jQuery",
		language: "JavaScript",
		score: 4.5,
		owner : {
			login: "Ge",
			id: 123456}
		},{
		name: "jQuery UI",
		language: "JavaScript",
		score: 5,
		owner : {
			login: "Ramesh",
		id: 123456}
		},{
		name: "jQuery Mobile",
		language: "JavaScript",
		score: 5.5,
		owner : {
			login: "Ramesh",
		id: 123456}
		}];
	
	$.each(results, function(i, item){
		var newResult = $("<div class='result'>" +
       	"<div class='title'>" + item.name + "</div>" +
       	"<div>Language: " + item.language + "</div>" +
       	"<div>Owner: " + item.owner.login + "</div>" +
       	"</div>");
		
		newResult.hover(function() {
        // make it darker
		$(this).css("background-color", "lightgray");
       }, function() {
		// reverse
		$(this).css("background-color", "transparent");
		});

		resultList.append(newResult);
		
	});
	*/
	
	/*Network API Calls */

});





