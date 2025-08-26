//Written by Riley Tyler
//JS for handling the functionality of the checklist.
"use strict";

//Check for saved list, if so populate listArray with saved list and html list
let listArray;
if (localStorage.getItem("savedChecklist") !== null) {
    listArray = JSON.parse(localStorage.getItem("savedChecklist"));
    listArray.forEach(element => {
        addListItem(element, false);
    });
}
else {
    listArray = new Array();
}

//Create Reference to addButton
let addButton = document.getElementById("addButton");

//Create Event Listener for the Button
addButton.addEventListener("click", validateTextArea);

//Validate TextArea Function
function validateTextArea() { //check if textArea is empty, if not add content to checklist
    let textArea = document.getElementById("textArea");
    if (textArea.value.length > 0) {
        addListItem(textArea.value, true);
        console.log("textArea validated");
    }
    else {
        console.log("textArea is empty");
    }
}

//Add New List Item Function
function addListItem(text, shouldSave) {
    let checklist = document.getElementById("checklist");
    let listElement = document.createElement("li");
    let checkboxElement = document.createElement("input");
    let checkboxText = document.createElement("p");
    checkboxElement.type = "checkbox";
    checkboxElement.value = text;
    checkboxText.innerHTML = text;
    listElement.className = "emerald"; //apply css class to list element
    listElement.appendChild(checkboxElement);
    listElement.appendChild(checkboxText);
    checklist.appendChild(listElement);
    if (shouldSave) {
        listArray.push(text);
        //call save list
        saveList();
    }
}

//Save list to localStorage function
function saveList() {
    localStorage.setItem("savedChecklist", JSON.stringify(listArray));
}
