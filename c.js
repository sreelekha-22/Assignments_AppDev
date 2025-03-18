let editMode=false;

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
            if(!editMode){
                lengthValdn.querySelectorAll("input").forEach(input => {
                    input.value="";
                    input.setAttribute("required", "required");
                });
            }
            
            break;
        case "number":
            numValdn.style.display="block";
            if(!editMode){
                numValdn.querySelectorAll("input").forEach(input => {
                    input.value="";
                    input.setAttribute("required", "required");
                });
            }
            break;
        case "date":
            dateValdn.style.display="block";
            if(!editMode){
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
            if(!editMode){
            optionsContainer.querySelector(".options").innerHTML="";
            }
            break;
        case "dropdown-multi":
            optionsContainer.style.display="block";
            if(!editMode){
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




function addOrUpdateQuestion(event,operation,currentQuestionId) {
    event.preventDefault(); // Prevent the default form submission

    // operation= add or update


    // Check if the form is valid
    if (questionForm.checkValidity()) {
        let questionId = currentQuestionId || Date.now();
        // let questionId = Date.now();

        alert("Added question successfully");
        let questionType = selectQuestionType.value;
        let isReq = reqInput.checked;
        let inputField;

        
        let questionDiv = document.getElementById(`qn-${questionId}`) || document.createElement("div");
        // let questionDiv = document.createElement("div");
        if(operation === "update"){
            editMode=false;
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
        editBtn.text="Edit";
        btns.appendChild(editBtn);

        /*
        editBtn.addEventListener("click",function(event){
            //update question mgmt form with this question,
            //make button text of form as update question,
            // on click on update question button, replace this qn details in place of prev one in questionslist


        });
        */

        editBtn.addEventListener("click", function (event) {
            editMode=true;
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
            selectQuestionType.dispatchEvent(new Event('change'));
        
            // Set the current question ID for editing
            currentQuestionId = questionId;
        
            // Change the button text to "Update Question"
            addQsnBtn.textContent = "Update Question";
        
            // Show the form
            questionForm.style.display = "block";
        });


        let deleteBtn= document.createElement("button");
        deleteBtn.classList.add("box-vsm");
        deleteBtn.style.backgroundColor="red";
        deleteBtn.style.color="white";
        deleteBtn.setAttribute("type","button");
        deleteBtn.text="Delete";
        btns.appendChild(deleteBtn);

      








        questionDiv.appendChild(btns);

        if(operation !== "update"){
            questionsList.appendChild(questionDiv);
        }

        deleteBtn.addEventListener("click",function(event){
            questionDiv.remove();
        });
        questionForm.reset();

        
        
        questionForm.style.display="none";
     
    } else {
        
        questionForm.reportValidity(); // This will show the validation messages
    }
}

addQsnBtn.addEventListener("click",function(event){
    addOrUpdateQuestion(event,"add");
});

addOptionBtn.addEventListener("click" , function(event){
    
    let option = document.createElement("input");
    option.setAttribute("type" , "text");
    option.setAttribute("placeholder" , "type option");
    option.setAttribute("required", "required");
    option.classList.add("box-md");

    optionsContainer.querySelector(".options").appendChild(option);

    
});
