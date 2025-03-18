let previewBtn = document.querySelector(".btn-preview");
let selectQuestionType = document.querySelector("#question-type");

let reqInput = document.querySelector("#req"); 

let rangeValdns = document.querySelector(".range-validn");
let numValdn = document.querySelector(".num-valdn");
let dateValdn = document.querySelector(".date-valdn");
let lengthValdn = document.querySelector(".length-valdn");

let optionsContainer = document.querySelector(".options-container");

let questionForm = document.forms.questionForm;

let addQsnBtn = document.querySelector("#add-qn");
let addOptionBtn = document.querySelector(".add-option");

let createNewQn = document.querySelector(".create-new-qn");

let questionsList = document.querySelector(".questions-list");

questionForm.style.display="none";

createNewQn.addEventListener("click",function(event){
    questionForm.style.display="block";
})

function showRelValidations(event){
    // let curOperation = event && event.detail && event.detail.operation ? event.detail.operation : "add";

    let curOperation = event?.detail?.operation ? "update" : "add";
    console.log(curOperation);

    rangeValdns.querySelectorAll(".valdn").forEach((valdn) => {
        valdn.style.display = "none";
        valdn.querySelectorAll("input").forEach(input => {
            input.removeAttribute("required");
        });
    });
    
    optionsContainer.querySelectorAll("input").forEach((option) => {
            option.removeAttribute("required");
    });

    
    optionsContainer.style.display="none";

    let questionType = selectQuestionType.value;

    switch(questionType){
        case "text":
            lengthValdn.style.display="block";
            if(curOperation !== "update"){
                lengthValdn.querySelectorAll("input").forEach(input => {
                    input.value="";
                    input.setAttribute("required", "required");
                });
            }
            
            break;
        case "number":
            numValdn.style.display="block";
            if(curOperation !== "update"){
                numValdn.querySelectorAll("input").forEach(input => {
                    input.value="";
                    input.setAttribute("required", "required");
                });
            }
            break;
        case "date":
            dateValdn.style.display="block";
            if(curOperation !== "update"){
                dateValdn.querySelectorAll("input").forEach(input => {
                    input.value="";
                    input.setAttribute("required", "required");
                });
            }
            break;
        case "document":

            break;
        case "dropdown-single":
            optionsContainer.style.display="block";
            if(curOperation !== "update"){
                optionsContainer.querySelector(".options").innerHTML="";
            }
            break;
        case "dropdown-multi":
            optionsContainer.style.display="block";
            if(curOperation !== "update"){
                optionsContainer.querySelector(".options").innerHTML="";
            }
            break;
}
}
selectQuestionType.addEventListener('change',function(event){
    //update validations shown
    showRelValidations(event);
    }
);

addQsnBtn.addEventListener("click",function(event){
    if(addQsnBtn.textContent === "Update Question"){
        addOrUpdateQuestion(event,"update",addQsnBtn.getAttribute("qn-id"));
        addQsnBtn.textContent = "Add Question";
        addQsnBtn.removeAttribute("qn-id");
    }
    else{
        addOrUpdateQuestion(event,"add");
    }
    
});


function addOrUpdateQuestion(event,operation,currentQuestionId) {
    event.preventDefault(); // Prevent the default form submission
   
    // operation= add or update


    // Check if the form is valid
    if (questionForm.checkValidity()) {
        let questionId = currentQuestionId || Date.now();
        // let questionId = Date.now();

        // console.log("Added question successfully");

        let questionType = selectQuestionType.value;
        let isReq = reqInput.checked;
        let inputField;

        
        let questionDiv = document.getElementById(`qn-${questionId}`) || document.createElement("div");
        // let questionDiv = document.createElement("div");
        if(operation === "update"){
            //update ->operation !== "add"
            document.getElementById(`qn-${questionId}`).innerHTML="";
        }
        else{
            questionDiv.classList.add("question-item");
             questionDiv.setAttribute("id",`qn-${questionId}`);
        }
        

        let question = document.createElement("div");
        question.innerText= document.querySelector("#question").value;

        if(questionType !== "dropdown-single" && questionType !== "dropdown-multi"){

        
             inputField = document.createElement("input");
            inputField.setAttribute("type",`${questionType}`);
            if(isReq){
                inputField.setAttribute("required","required");
            }

            switch(questionType){
                case "text":
                    inputField.setAttribute("minlength", `${questionForm.elements['min-len'].value}`);
                    inputField.setAttribute("maxlength", `${questionForm.elements['max-len'].value}`);
                    break;
                case "number":
                    inputField.setAttribute("min", `${questionForm.elements['min-num'].value}`);
                    inputField.setAttribute("max", `${questionForm.elements['max-num'].value}`);
                    break;
                case "date":
                    inputField.setAttribute("min", `${questionForm.elements['min-date'].value}`);
                    inputField.setAttribute("max", `${questionForm.elements['max-date'].value}`);
                    break;
                case "document":
                    break;
            }
            questionDiv.appendChild(question);
            questionDiv.appendChild(inputField);
            // questionsList.appendChild(questionDiv);

           
        }
        else{
            //dropdown
            let dropdown = document.createElement("select");
            dropdown.classList.add("qn-dropdown");

            let options = document.querySelector(".options");
            let optionsList = options.querySelectorAll("input");

            optionsList.forEach((optionItem) => {
                let option = document.createElement("option");
                option.value=`${optionItem.value}`;
                option.text = `${optionItem.value}`;

                dropdown.appendChild(option);
            });

            

            if(questionType === "dropdown-multi"){
                dropdown.setAttribute("multiple","multiple");
            }

            questionDiv.appendChild(question);
            questionDiv.appendChild(dropdown);

            options.innerHTML="";
            optionsContainer.style.display="none";
            // questionsList.appendChild(questionDiv);
        }


        let btns= document.createElement("div");
        btns.classList.add("flex-v","right-top");

        let editBtn= document.createElement("button");
        editBtn.classList.add("box-vsm");
        editBtn.style.backgroundColor="green";
        editBtn.style.color="white";
        editBtn.setAttribute("type","button");
        editBtn.textContent="Edit";
        btns.appendChild(editBtn);

        /*
        editBtn.addEventListener("click",function(event){
            //update question mgmt form with this question,
            //make button text of form as update question,
            // on click on update question button, replace this qn details in place of prev one in questionslist


        });
        */

        editBtn.addEventListener("click", function (event) {
            
            // Populate the form with the current question details
            document.querySelector("#question").value = question.innerText;
            selectQuestionType.value = questionType; // Set the question type
            reqInput.checked = isReq; // Set the required checkbox
        
            // Populate validation fields based on question type
            switch (questionType) {
                case "text":
                    questionForm.elements['min-len'].value = inputField.getAttribute("minlength") || '';
                    questionForm.elements['max-len'].value = inputField.getAttribute("maxlength") || '';
                    break;
                case "number":
                    questionForm.elements['min-num'].value = inputField.getAttribute("min") || '';
                    questionForm.elements['max-num'].value = inputField.getAttribute("max") || '';
                    break;
                case "date":
                    questionForm.elements['min-date'].value = inputField.getAttribute("min") || '';
                    questionForm.elements['max-date'].value = inputField.getAttribute("max") || '';
                    break;
                case "dropdown-single":
                case "dropdown-multi":
                    // Populate options if it's a dropdown
                    options.innerHTML = ''; // Clear existing options
                    let dropdownOptions = dropdown.querySelectorAll("option");
                    dropdownOptions.forEach(option => {
                        let input = document.createElement("input");
                        input.setAttribute("type", "text");
                        input.setAttribute("placeholder", "Type option ");
                        input.setAttribute("value", option.value);
                        input.classList.add("box-md");
                        options.appendChild(input);
                    });
                    break;
            }
        
            // Show the appropriate validation fields based on the question type
            // selectQuestionType.dispatchEvent(new Event('change'));



            const customParams = { operation: "update" };

            // Create and dispatch the event
            const changeEvent = new CustomEvent("change", { detail: customParams });
            selectQuestionType.dispatchEvent(changeEvent);
        


            // Set the current question ID for editing
            currentQuestionId = questionId;
        
            // Change the button text to "Update Question"
            addQsnBtn.textContent = "Update Question";
            addQsnBtn.setAttribute("qn-id",currentQuestionId);
        
            // Show the form
            questionForm.style.display = "block";
        });


        let deleteBtn= document.createElement("button");
        deleteBtn.classList.add("box-vsm");
        deleteBtn.style.backgroundColor="red";
        deleteBtn.style.color="white";
        deleteBtn.setAttribute("type","button");
        deleteBtn.textContent="Delete";
        btns.appendChild(deleteBtn);


        questionDiv.appendChild(btns);

        if(operation === "add"){
            // operation !== "update"
            questionsList.appendChild(questionDiv);
        }

        deleteBtn.addEventListener("click",function(event){
            questionDiv.remove();
        });
        questionForm.reset();

        
        if(operation === "update"){
            selectQuestionType.dispatchEvent(new Event('change')); // reset to text-> bcz doesn't trigger auto...
           
        }
        questionForm.style.display="none";
        enableDragAndDrop();
    } else {
        
        questionForm.reportValidity(); // This will show the validation messages
    }
}



addOptionBtn.addEventListener("click" , function(event){
    
    let option = document.createElement("input");
    option.setAttribute("type" , "text");
    option.setAttribute("placeholder" , "type option");
    option.setAttribute("required", "required");
    option.classList.add("box-md");

    optionsContainer.querySelector(".options").appendChild(option);

    
});








function enableDragAndDrop() {
    let questions = document.querySelectorAll(".question-item");

    questions.forEach((question) => {
        question.setAttribute("draggable", "true");

        question.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", event.target.id);
            event.target.classList.add("dragging");
        });

        question.addEventListener("dragover", (event) => {
            event.preventDefault();
            let draggingItem = document.querySelector(".dragging");
            let currentItem = event.target.closest(".question-item");
            if (currentItem && draggingItem !== currentItem) {
                let list = questionsList;
                let children = [...list.children];
                let draggingIndex = children.indexOf(draggingItem);
                let currentIndex = children.indexOf(currentItem);

                if (draggingIndex < currentIndex) {
                    list.insertBefore(draggingItem, currentItem.nextSibling);
                } else {
                    list.insertBefore(draggingItem, currentItem);
                }
            }
        });

        question.addEventListener("dragend", (event) => {
            event.target.classList.remove("dragging");
        });
    });
}

enableDragAndDrop();


document.addEventListener("DOMContentLoaded", function () {
    const previewBtn = document.querySelector(".btn-preview");
    const mgmtTab = document.getElementById("mgmt-tab");
    const prvTab = document.getElementById("prv-tab");
    const managementPage = document.getElementById("management");
    const previewPage = document.getElementById("preview");
    const previewContainer = previewPage; // Assuming the preview page acts as a container

    // Function to switch tabs
    function switchTab(activeTab, activePage) {
        // Remove active class from both tabs
        document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
        // Hide both pages
        document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));

        // Set active tab and active page
        activeTab.classList.add("active");
        activePage.classList.add("active");
    }

    // Click event for "Question Management" tab
    mgmtTab.addEventListener("click", function () {
        switchTab(mgmtTab, managementPage);
    });

    // Click event for "Question Preview" tab
    prvTab.addEventListener("click", function () {
        switchTab(prvTab, previewPage);
    });

    // Click event for "Get Preview" button
    previewBtn.addEventListener("click", function (event) {
        event.preventDefault();
    
        // Clone the questions list (assuming it has a class like "questions-list")
        let questionsList = document.querySelector(".questions-list");
        if (!questionsList) return;
    
        preview.innerHTML = ""; // Clear previous preview
    
        let clonedQuestions = questionsList.cloneNode(true);
        clonedQuestions.querySelectorAll(".flex-v").forEach(btns => btns.remove()); // Remove edit/delete buttons
    
        preview.appendChild(clonedQuestions);
    
        // Switch to the preview tab
        switchTab(prvTab, previewPage);
    });
    
    // Form validation on submit
    let previewForm = document.querySelector("#previewForm");
    previewForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (previewForm.checkValidity()) {
           
            alert("Preview submitted successfully");
        }
        else{
            previewForm.reportValidity();
            alert("Please fill in all required fields correctly.");
        }
    });
    
});




