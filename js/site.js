var tools = [];
var requests = [];
var requestId = 0;

$(document).ready(function() {
	"use strict";
	console.log(getRandomInt(5,10));

	var myToolFactory = new ToolFactory();
	var myRequestFactory = new RequestFactory();

	//attach listeners to header links
	$('#showSubmitRequest').click(function() {
		$('#submitRequest').show();
		$('#listRequests').hide();
	});

	$('#showRequestList').click(function() {
		$('#submitRequest').hide();
		$('#listRequests').show(); 
	});

	//generate random inventory of tools
	console.log("Generating random inventory of tools.");
	var numberOfTools = getRandomInt(5,20);
	for (var i = 0; i < numberOfTools + 1; i++) {
		var newTool = myToolFactory.createTool({
			name: "Generic tool " + i,
			value: "$" + getRandomInt(2,25000),
			serialNumber: getRandomSerialNumber(),
			});
		tools.push(newTool);
	}

	//populate the select dropdown
	console.log("Populating tool select dropdown.");
	populateToolDropdown(tools);

	//attach listener to submit button
	console.log("Attaching submit button listener.");
	$('#submit').click(function (){ 
		requests.push(myRequestFactory.createRequest({
			requestor: $('#requestRequestor').val(),
			date: $('#requestDate').val(),
			location: $('#requestLocation').val(),
			priority: $('#requestPriority').val(),
			customer: $('#requestCustomer').val(),
			tool: tools.filter(function(option){return option.serialNumber == $('#tool-list :selected').val();})[0]
		}));
	});

	//attach listener to the request searcher
	console.log("Attaching search button listener.");
	$('#search').click(function () {
		console.log(getUserRequests($('#searchSso').val()));
		buildUserRequestList(getUserRequests($('#searchSso').val()));
	});
});

//TOOLS
  ///////
function Tool(options) {
	this.value = options.value || '$100';
	this.name = options.name || 'Generic tool';
	this.serialNumber = options.serialNumber || '001';
}

function ToolFactory(){
	ToolFactory.prototype.createTool = function createNewTool(options) {
		return new Tool(options);
	}
}

function getRandomSerialNumber() {
	return "" + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9);
}

function getRandomToolFromTools() {
	return tools[getRandomInt(0,tools.length)];
}

function populateToolDropdown(tools) {
	var dropdown = $('#tool-list');
	for (var i = 0; i < tools.length; i++) {
		var newOption = document.createElement("option");
		newOption.textContent = tools[i].name + " (" + tools[i].serialNumber + ")";
		newOption.value = tools[i].serialNumber;
		dropdown.append(newOption);
	}
}

//REQUESTS
  ////////
function Request(options) {
	this.requestor = options.requestor || '000000000';
	this.date = options.date || new Date().toJSON().slice(0,10);
	this.location = options.location || "Dallas, TX";
	this.priority = options.priority || "Low";
	this.customer = options.customer || "GE Internal Customer";
	this.tool = options.tool || getRandomToolFromTools();
	this.id = requestId++;
	this.status = options.status || "Processing";
}

function RequestFactory() {
	RequestFactory.prototype.createRequest = function createNewRequest(options) {
		return new Request(options);
	}
}

function getUserRequests(sso) {
	console.log("Searching for requests from " + sso);
	return requests.filter(function(option){return option.requestor == sso;});
}

function buildUserRequestList(userRequests) {
	var resultList = $('#results');
	resultList.html('<h3>Requests for ' + userRequests[0].requestor);
	for (var i = 0; i < userRequests.length; i++) {
		resultList.append('<div class="bordered-element"><b>Request: </b>' + userRequests[i].id + "</br>"
			+ '<b>Status: </b>' + userRequests[i].status + '</br>'
			+ '<b>Date: </b>' + userRequests[i].date + "</br>"
			+ '<b>Location: </b>' + userRequests[i].location + "</br>"
			+ '<b>Priority: </b>' + userRequests[i].priority + "</br>"
			+ '<b>Customer: </b>' + userRequests[i].customer + "</br>"
			+ '<b>Tool: </b> <div class="toolResult"><b>Name: </b>' + userRequests[i].tool.name + '</br>'
			+ '<b>Serial Number: </b>' + userRequests[i].tool.serialNumber + '</br>'
			+ '<b>Value: </b>' + userRequests[i].tool.value + '</br></div>'
			+ '');
	}
}

//UTILITY
  ///////
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}