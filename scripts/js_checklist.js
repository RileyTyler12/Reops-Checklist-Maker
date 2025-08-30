//Written by Riley Tyler
//JS for handling the functionality of the checklist.
"use strict";

//Check for savedChecklist, if so populate listArray with saved list and add list to html with with addListItem()
let listArray;
let listCount = 0;
let checkedItemsArray;
if (localStorage.getItem("savedChecklist") !== null) {
    listArray = JSON.parse(localStorage.getItem("savedChecklist"));

    //Check for saved checkedItems associative array. (if there is a savedChecklist, there must be a checkItems)
    if (localStorage.getItem("checkedItems") !== null) {
        checkedItemsArray = JSON.parse(localStorage.getItem("checkedItems"));
    }

    listArray.forEach(element => {
        addListItem(element, false);
    });
    //sort list on page
    sortList();
}
else {
    listArray = new Array();
    checkedItemsArray = new Array(listArray.length);
}

//Create References and eventListeners for html buttons
let addButton = document.getElementById("addButton");
let clearListButton = document.getElementById("clearListButton");
addButton.addEventListener("click", validateTextArea);
clearListButton.addEventListener("click", clearList);


//Functions

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
    checkboxElement.id = listCount;
    checkboxElement.addEventListener("click", function(event) { //checkbox event listener and function to handle checked status
        if (event.target.checked) {
            checkedItemsArray[parseInt(event.target.id)] = true;
            saveList(); //call save list
            console.log("item " + event.target.id + " checked");
        }
        else {
            checkedItemsArray[parseInt(event.target.id)] = false;
            saveList(); //call save list
            console.log("item " + event.target.id + " unchecked")
        }
        //sort list on page
        sortList();
    });
    checkboxElement.value = text;
    checkboxText.innerHTML = text;
    if (checkedItemsArray[parseInt(checkboxElement.id)] === true) { //check checkedItems associative array for checked status
        checkboxElement.checked = true;
    }

    listElement.className = "emerald"; //apply css class to list element
    listElement.id = "listElement" + listCount;
    listElement.appendChild(checkboxElement);
    listElement.appendChild(checkboxText);

    checklist.appendChild(listElement);
    if (shouldSave) {
        listArray.push(text);
        //save list
        saveList();
    }
    listCount++;
}

    //Sort Entire List to Checked and Unchecked Function
function sortList() {
    for (let i = 0; i <= listCount; i++) {
        let uncheckedList = document.getElementById("checklist");
        let checkedList = document.getElementById("checklist-checked");
        let listElement = document.getElementById("listElement" + i);
        let checkboxElement = document.getElementById(i);
        if (checkboxElement && checkboxElement.checked) {
            checkedList.appendChild(listElement);
        }
        else if (checkboxElement) {
            uncheckedList.appendChild(listElement);
        }
    }
    console.log("list sorted");
}

    //Save list to localStorage function
function saveList() {
    localStorage.setItem("savedChecklist", JSON.stringify(listArray));
    localStorage.setItem("checkedItems", JSON.stringify(checkedItemsArray));
}

    //Clear List Function
function clearList() {
    localStorage.removeItem("savedChecklist");
    localStorage.removeItem("checkedItems");
    window.location.reload();
}