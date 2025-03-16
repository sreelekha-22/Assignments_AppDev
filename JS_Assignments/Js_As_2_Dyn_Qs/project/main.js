// Store questions in localStorage
let questions = JSON.parse(localStorage.getItem('questions')) || [];
let editingQuestionId = null;

// DOM Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const questionForm = document.getElementById('questionForm');
const questionsList = document.getElementById('questionsList');
const previewQuestions = document.getElementById('previewQuestions');
const questionType = document.getElementById('questionType');
const optionsContainer = document.getElementById('optionsContainer');
const optionsList = document.getElementById('optionsList');
const addOptionBtn = document.getElementById('addOption');
const previewForm = document.getElementById('previewForm');

// Tab Switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
        if (btn.dataset.tab === 'preview') {
            renderPreview();
        }
    });
});

// Show/Hide Options based on question type
questionType.addEventListener('change', () => {
    const type = questionType.value;
    optionsContainer.style.display = 
        (type === 'dropdown' || type === 'multiselect') ? 'block' : 'none';
    
    // Show/Hide validation fields based on type
    document.getElementById('rangeValidation').style.display = 
        (type === 'number' || type === 'date') ? 'block' : 'none';
    document.getElementById('lengthValidation').style.display = 
        (type === 'text') ? 'block' : 'none';
});

// Add Option Field
addOptionBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'option-input';
    input.placeholder = `Option ${optionsList.children.length + 1}`;
    optionsList.appendChild(input);
});

// Load question data into form for editing
function loadQuestionForEdit(id) {
    const question = questions.find(q => q.id === id);
    if (!question) return;

    editingQuestionId = id;
    document.getElementById('questionText').value = question.text;
    document.getElementById('questionType').value = question.type;
    document.getElementById('required').checked = question.required;
    
    // Load validations
    document.getElementById('minValue').value = question.validations.minValue;
    document.getElementById('maxValue').value = question.validations.maxValue;
    document.getElementById('maxLength').value = question.validations.maxLength;

    // Handle options for dropdown/multiselect
    if (question.type === 'dropdown' || question.type === 'multiselect') {
        optionsContainer.style.display = 'block';
        optionsList.innerHTML = '';
        question.options.forEach(opt => {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'option-input';
            input.value = opt;
            optionsList.appendChild(input);
        });
    } else {
        optionsContainer.style.display = 'none';
    }

    // Update button text
    const submitButton = questionForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Update Question';
}

// Add/Edit Question
questionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const question = {
        id: editingQuestionId || Date.now(),
        text: document.getElementById('questionText').value,
        type: questionType.value,
        required: document.getElementById('required').checked,
        validations: {
            minValue: document.getElementById('minValue').value,
            maxValue: document.getElementById('maxValue').value,
            maxLength: document.getElementById('maxLength').value
        }
    };

    if (question.type === 'dropdown' || question.type === 'multiselect') {
        question.options = Array.from(optionsList.children)
            .map(input => input.value)
            .filter(value => value.trim() !== '');
    }

    if (editingQuestionId) {
        // Update existing question
        const index = questions.findIndex(q => q.id === editingQuestionId);
        if (index !== -1) {
            questions[index] = question;
        }
        editingQuestionId = null;
        const submitButton = questionForm.querySelector('button[type="submit"]');
        submitButton.textContent = 'Add Question';
    } else {
        // Add new question
        questions.push(question);
    }

    localStorage.setItem('questions', JSON.stringify(questions));
    renderQuestions();
    questionForm.reset();
    optionsList.innerHTML = '<input type="text" class="option-input" placeholder="Option 1">';
});

// Render Questions List
function renderQuestions() {
    questionsList.innerHTML = '';
    questions.forEach((question, index) => {
        const div = document.createElement('div');
        div.className = 'question-item';
        div.draggable = true;
        div.innerHTML = `
            <h3>${question.text}</h3>
            <p>Type: ${question.type}</p>
            ${question.required ? '<p>Required</p>' : ''}
            <div class="question-actions">
                <button class="edit-btn" data-id="${question.id}">Edit</button>
                <button class="delete-btn" data-id="${question.id}">Delete</button>
            </div>
        `;
        
        // Drag and Drop
        div.addEventListener('dragstart', () => {
            div.classList.add('dragging');
        });
        
        div.addEventListener('dragend', () => {
            div.classList.remove('dragging');
        });
        
        questionsList.appendChild(div);
    });

    // Edit Question
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            loadQuestionForEdit(id);
        });
    });

    // Delete Question
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            questions = questions.filter(q => q.id !== id);
            localStorage.setItem('questions', JSON.stringify(questions));
            renderQuestions();
        });
    });
}

// Drag and Drop Functionality
questionsList.addEventListener('dragover', e => {
    e.preventDefault();
    const draggingItem = document.querySelector('.dragging');
    const siblings = [...questionsList.querySelectorAll('.question-item:not(.dragging)')];
    const nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });
    
    questionsList.insertBefore(draggingItem, nextSibling);
});

questionsList.addEventListener('dragend', () => {
    const newOrder = Array.from(questionsList.children).map(item => {
        return questions.find(q => q.id === parseInt(item.querySelector('.delete-btn').dataset.id));
    });
    questions = newOrder;
    localStorage.setItem('questions', JSON.stringify(questions));
});

// Render Preview
function renderPreview() {
    previewQuestions.innerHTML = '';
    questions.forEach(question => {
        const div = document.createElement('div');
        div.className = 'form-group';
        
        let input = '';
        switch(question.type) {
            case 'text':
                input = `<input type="text" ${question.required ? 'required' : ''} 
                    ${question.validations.maxLength ? `maxlength="${question.validations.maxLength}"` : ''}>`;
                break;
            case 'number':
                input = `<input type="number" ${question.required ? 'required' : ''}
                    ${question.validations.minValue ? `min="${question.validations.minValue}"` : ''}
                    ${question.validations.maxValue ? `max="${question.validations.maxValue}"` : ''}>`;
                break;
            case 'date':
                input = `<input type="date" ${question.required ? 'required' : ''}
                    ${question.validations.minValue ? `min="${question.validations.minValue}"` : ''}
                    ${question.validations.maxValue ? `max="${question.validations.maxValue}"` : ''}>`;
                break;
            case 'document':
                input = `<input type="file" ${question.required ? 'required' : ''}>`;
                break;
            case 'dropdown':
                input = `<select ${question.required ? 'required' : ''}>
                    <option value="">Select an option</option>
                    ${question.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                </select>`;
                break;
            case 'multiselect':
                input = `<select multiple ${question.required ? 'required' : ''}>
                    ${question.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                </select>`;
                break;
        }
        
        div.innerHTML = `
            <label>${question.text}${question.required ? ' *' : ''}</label>
            ${input}
        `;
        previewQuestions.appendChild(div);
    });
}

// Handle Preview Form Submission
previewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (previewForm.checkValidity()) {
        alert('Form submitted successfully!');
    } else {
        alert('Please fill in all required fields correctly.');
    }
});

// Initial render
renderQuestions();