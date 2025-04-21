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

questionForm.style.display = "none";

createNewQn.addEventListener("click", function(event) {
    questionForm.style.display = "block";
});

function createEmptyOption(){
    let initialOption = document.createElement("option");
    initialOption.value = "";
    initialOption.disabled = true;
    initialOption.selected = true;
    initialOption.text = "Select an option";
    return initialOption;
}

function showRelValidations(event) {
    let curOperation = event?.detail?.operation ? "update" : "add";
    // console.log(curOperation);

    rangeValdns.querySelectorAll(".valdn").forEach((valdn) => {
        valdn.style.display = "none";
        valdn.querySelectorAll("input").forEach(input => {
            input.removeAttribute("required");
        });
    });
    
    optionsContainer.querySelectorAll("input").forEach((option) => {
        option.removeAttribute("required");
    });

    optionsContainer.style.display = "none";

    let questionType = selectQuestionType.value;

    switch(questionType) {
        case "text":
            lengthValdn.style.display = "block";
            if(curOperation !== "update") {
                lengthValdn.querySelectorAll("input").forEach(input => {
                    input.value = "";
                    input.setAttribute("required", "required");
                });
            }
            break;
        case "number":
            numValdn.style.display = "block";
            if(curOperation !== "update") {
                numValdn.querySelectorAll("input").forEach(input => {
                    input.value = "";
                    input.setAttribute("required", "required");
                });
            }
            break;
        case "date":
            dateValdn.style.display = "block";
            if(curOperation !== "update") {
                dateValdn.querySelectorAll("input").forEach(input => {
                    input.value = "";
                    input.setAttribute("required", "required");
                });
            }
            break;
        case "document":
            break;
        case "dropdown-single":
        case "dropdown-multi":
            optionsContainer.style.display = "block";
            if(curOperation !== "update") {
                optionsContainer.querySelector(".options").innerHTML = "";
            }
            break;
    }
}

selectQuestionType.addEventListener('change', function(event) {
    showRelValidations(event);
});

addQsnBtn.addEventListener("click", function(event) {
    if(addQsnBtn.textContent === "Update Question") {
        addOrUpdateQuestion(event, "update", addQsnBtn.getAttribute("qn-id"));
        addQsnBtn.textContent = "Add Question";
        addQsnBtn.removeAttribute("qn-id");
    } else {
        addOrUpdateQuestion(event, "add");
    }
});

function addOrUpdateQuestion(event, operation, currentQuestionId) {
    event.preventDefault(); // Prevent the default form submission
    // console.log("currentQuestionId value: "+currentQuestionId);
    // currentQuestionId = qn-345(upd) or undefined(add)


    // Check if the form is valid
    if (questionForm.checkValidity()) {
        // qn-2336r   || 32478
      
        let dateNow = Date.now();
        let questionType = selectQuestionType.value;
        let isReq = reqInput.checked;
        let inputField;

        let questionDiv = document.getElementById(currentQuestionId) || document.createElement("div");
        if (operation === "update") {
            document.getElementById(currentQuestionId).innerHTML = "";
        } else {
            questionDiv.classList.add("question-item");
            questionDiv.setAttribute("id", `qn-${dateNow}`);
        }

        let questionId = questionDiv.getAttribute("id");
        let question = document.createElement("div");
        question.innerText = document.querySelector("#question").value;

        if (questionType !== "dropdown-single" && questionType !== "dropdown-multi") {
            inputField = document.createElement("input");
            inputField.setAttribute("type", `${questionType}`);
            if (isReq) {
                inputField.setAttribute("required", "required");
            }

            switch (questionType) {
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
        } else {
            let dropdown = document.createElement("select");
            dropdown.classList.add("qn-dropdown");
            dropdown.setAttribute("required","required");

            let options = document.querySelector(".options");
            let optionsList = options.querySelectorAll("input");

            let emptySelectOption = createEmptyOption();
            dropdown.appendChild(emptySelectOption);

            optionsList.forEach((optionItem) => {
                let option = document.createElement("option");
                option.value = `${optionItem.value}`;
                option.text = `${optionItem.value}`;
                dropdown.appendChild(option);
            });

            if (questionType === "dropdown-multi") {
                dropdown.setAttribute("multiple", "multiple");
            }

            questionDiv.appendChild(question);
            questionDiv.appendChild(dropdown);
            options.innerHTML = "";
            optionsContainer.style.display = "none";
        }

        let btns = document.createElement("div");
        btns.classList.add("flex-v", "right-top");

        let editBtn = document.createElement("button");
        editBtn.classList.add("box-vsm");
        editBtn.style.backgroundColor = "green";
        editBtn.style.color = "white";
        editBtn.setAttribute("type", "button");
        editBtn.textContent = "Edit";
        btns.appendChild(editBtn);

        editBtn.addEventListener("click", function(event) {
            document.querySelector("#question").value = question.innerText;
            selectQuestionType.value = questionType; // Set the question type
            reqInput.checked = isReq; // Set the required checkbox

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
                    let options = optionsContainer.querySelector(".options");
                    options.innerHTML = ''; // Clear existing options
                    let dropdown = questionDiv.querySelector("select");
                    let dropdownOptions = dropdown.querySelectorAll("option");
                    dropdownOptions.forEach(option => {
                        if(!option.value) return;
                        let input = document.createElement("input");
                        input.setAttribute("type", "text");
                        input.setAttribute("placeholder", "Type option ");
                        input.setAttribute("value", option.value);
                        input.classList.add("box-md");
                        options.appendChild(input);
                    });
                    break;
            }

            const customParams = { operation: "update" };
            const changeEvent = new CustomEvent("change", { detail: customParams });
            selectQuestionType.dispatchEvent(changeEvent);

            let currentQuestionIdToUpdate = questionDiv.getAttribute("id");
            addQsnBtn.textContent = "Update Question";
            // console.log("after text = Update Qn, curId : "+ currentQuestionIdToUpdate);
            addQsnBtn.setAttribute("qn-id", currentQuestionIdToUpdate);
            questionForm.style.display = "block";
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("box-vsm");
        deleteBtn.style.backgroundColor = "red";
        deleteBtn.style.color = "white";
        deleteBtn.setAttribute("type", "button");
        deleteBtn.textContent = "Delete";
        btns.appendChild(deleteBtn);

        questionDiv.appendChild(btns);

        if (operation === "add") {
            questionsList.appendChild(questionDiv);
        }

        deleteBtn.addEventListener("click", function(event) {
            questionDiv.remove();
            saveQuestionsToLocalStorage(); // Save after deletion
        });

        questionForm.reset();
        saveQuestionsToLocalStorage(); // Save after addition or update
        questionForm.style.display = "none";
        enableDragAndDrop();
    } else {
        questionForm.reportValidity(); // This will show the validation messages
    }
}

addOptionBtn.addEventListener("click", function(event) {
    let option = document.createElement("input");
    option.setAttribute("type", "text");
    option.setAttribute("placeholder", "type option");
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

function saveQuestionsToLocalStorage() {
    const questions = [];
    const questionItems = document.querySelectorAll(".question-item");
    questionItems.forEach(item => {
        const questionId = item.getAttribute("id");
        // console.log("while saving to local : id"+questionId);
        const questionText = item.querySelector("div").innerText;
        const inputField = item.querySelector("input") || item.querySelector("select");
        let questionType;
        if(inputField.hasAttribute("type")){
            questionType =  inputField.getAttribute("type"); 
        }
        else{
            //select
            if(inputField.hasAttribute("multiple")){
                questionType = "dropdown-multi";
            }
            else{
                questionType = "dropdown-single";
            }
            
        }
        const isRequired = inputField ? inputField.hasAttribute("required") : false;
        let minValue = null;
         if(inputField && inputField.hasAttribute("minlength")) {
            minValue = inputField.getAttribute("minlength") ;
         }
         else if(inputField && inputField.hasAttribute("min")){
            minValue = inputField.getAttribute("min") ;
         }

         let maxValue = null;
         if(inputField && inputField.hasAttribute("maxlength")) {
            maxValue = inputField.getAttribute("maxlength") ;
         }
         else if(inputField && inputField.hasAttribute("max")){
            maxValue = inputField.getAttribute("max") ;
         }


         
        let CuroptionsList = [];
        if (questionType === "dropdown-single" || questionType === "dropdown-multi") {
            const dropdownOptions = item.querySelectorAll("option");
            dropdownOptions.forEach(option => {
                CuroptionsList.push(option.value);
            });
        }

        questions.push({
            id: questionId,
            text: questionText,
            type: questionType,
            required: isRequired,
            min : minValue,
            max :maxValue,
            optionsList: CuroptionsList
        });
    });
    localStorage.setItem("questions", JSON.stringify(questions));
    console.log("saved to local: "+ JSON.stringify(questions));
}

function loadQuestionsFromLocalStorage() {
    const savedQuestions = localStorage.getItem("questions");
    if (savedQuestions) {
        const questions = JSON.parse(savedQuestions);
        console.log("loaded qs : "+questions);
        questions.forEach(question => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question-item");
            questionDiv.setAttribute("id", question.id);

            const questionText = document.createElement("div");
            questionText.innerText = question.text;
            let dropdown
            let inputField;
            if (question.type !== "dropdown-single" && question.type !== "dropdown-multi") {
                inputField = document.createElement("input");
                inputField.setAttribute("type", question.type);
                if (question.required) {
                    inputField.setAttribute("required", "required");
                }

                if(question.type === "text"){
                    inputField.setAttribute("minlength", question.min);
                    inputField.setAttribute("maxlength", question.max);
                }
                else if(question.type === "number" || question.type === "date"){
                    inputField.setAttribute("min", question.min);
                    inputField.setAttribute("max", question.max);
                }

                questionDiv.appendChild(questionText);
                questionDiv.appendChild(inputField);
            } else {
                 dropdown = document.createElement("select");
                dropdown.classList.add("qn-dropdown");

                question.optionsList.forEach(optionValue => {
                    let option = document.createElement("option");
                    option.value = optionValue;
                    option.text = optionValue;
                    dropdown.appendChild(option);
                });

                if (question.type === "dropdown-multi") {
                    dropdown.setAttribute("multiple", "multiple");
                }

                questionDiv.appendChild(questionText);
                questionDiv.appendChild(dropdown);
            }

            let btns = document.createElement("div");
            btns.classList.add("flex-v", "right-top");

            let editBtn = document.createElement("button");
            editBtn.classList.add("box-vsm");
            editBtn.style.backgroundColor = "green";
            editBtn.style.color = "white";
            editBtn.setAttribute("type", "button");
            editBtn.textContent = "Edit";
            btns.appendChild(editBtn);

            editBtn.addEventListener("click", function(event) {
                document.querySelector("#question").value = questionText.innerText;
                selectQuestionType.value = question.type; // Set the question type
                reqInput.checked = question.required; // Set the required checkbox

                switch (question.type) {
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
                        const options = document.querySelector(".options");
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
        

                const customParams = { operation: "update" };
                const changeEvent = new CustomEvent("change", { detail: customParams });
                selectQuestionType.dispatchEvent(changeEvent);

                addQsnBtn.textContent = "Update Question";
                addQsnBtn.setAttribute("qn-id", question.id);
                questionForm.style.display = "block";
            });

            let deleteBtn = document.createElement("button");
            deleteBtn.classList.add("box-vsm");
            deleteBtn.style.backgroundColor = "red";
            deleteBtn.style.color = "white";
            deleteBtn.setAttribute("type", "button");
            deleteBtn.textContent = "Delete";
            btns.appendChild(deleteBtn);

            questionDiv.appendChild(btns);
            questionsList.appendChild(questionDiv);
            enableDragAndDrop();
            deleteBtn.addEventListener("click", function(event) {
                questionDiv.remove();
                saveQuestionsToLocalStorage(); // Save after deletion
            });
        });
    }
}



document.addEventListener("DOMContentLoaded", function () {
    loadQuestionsFromLocalStorage();
    const previewBtn = document.querySelector(".btn-preview");
    const mgmtTab = document.getElementById("mgmt-tab");
    const prvTab = document.getElementById("prv-tab");
    const managementPage = document.getElementById("management");
    const previewPage = document.getElementById("preview-page");
    const previewContainer = document.getElementById("preview");
    // const previewContainer = previewPage; // Assuming the preview page acts as a container

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
    
        previewContainer.innerHTML = ""; // Clear previous preview
    
        let clonedQuestions = questionsList.cloneNode(true);
        clonedQuestions.querySelectorAll(".flex-v").forEach(btns => btns.remove()); // Remove edit/delete buttons
    
        clonedQuestions.querySelectorAll("select.qn-dropdown").forEach(dropdown => {
            const firstOption = dropdown.querySelector("option[disabled]");
            if (firstOption) {
                firstOption.selected = true; // Select the first disabled option
            }
        });

        previewContainer.appendChild(clonedQuestions);
    
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
