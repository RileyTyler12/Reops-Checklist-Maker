//Written by Riley Tyler
//JS for adding, saving, and loading the checklist.
"use strict";

//Create Reference to addButton
let addButton = document.getElementById("addButton");

//Create Event Listener for the Button
addButton.addEventListener("click", validateTextArea);

//Validate TextArea Function
function validateTextArea() { //check if textArea is empty, if not add content to checklist
    let textArea = document.getElementById("textArea");
    if (textArea.value.length > 0) {
        addNewItem();
        console.log("textArea validated");
    }
    else {
        console.log("textArea is empty");
    }
}

//Add New List Item Function
function addNewItem() {
    let checklist = document.getElementById("checklist");
    let listElement = document.createElement("li");
    listElement.innerHTML = textArea.value;
    checklist.appendChild(listElement);
}
