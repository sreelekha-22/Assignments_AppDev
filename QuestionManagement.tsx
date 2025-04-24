import React, { useState,useEffect } from "react";
import '../Home/HomePage.css';
import Question from "../Question/Question";


interface QuestionManagementProps {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    currentQuestion : Question;
    onAddOrUpdate: (question: Question) => void; 
  
}

const QuestionManagement: React.FC<QuestionManagementProps> = ({ setShowForm ,currentQuestion, onAddOrUpdate}) => {    
    const [questionText, setQuestionText] = useState(currentQuestion.text || '');
    const [questionType, setQuestionType] = useState(currentQuestion.type || "text");
    const [isRequired, setIsRequired] = useState(currentQuestion.required || false);
    const [minValue, setMinValue] = useState(currentQuestion.min || '');
    const [maxValue, setMaxValue] = useState(currentQuestion.max || '');
    const [optionsList, setOptionsList] = useState(currentQuestion.optionsList || ['']);
   
    useEffect(() => {
        setQuestionText(currentQuestion.text || '');
        setQuestionType(currentQuestion.type || "text");
        setIsRequired(currentQuestion.required || false);
        setMinValue(currentQuestion.min || '');
        setMaxValue(currentQuestion.max || '');
        setOptionsList(currentQuestion.optionsList || ['']);
    }, [currentQuestion]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

       
        const newQuestion = {
            id: currentQuestion.id || Date.now().toString(), // Generate a new ID if adding
            text: questionText,
            type: questionType,
            required: isRequired,
            min: minValue,
            max: maxValue,
            optionsList: optionsList.filter(option => option) // remove empty options
        };
        console.log("Added New Question" ,newQuestion);
        onAddOrUpdate(newQuestion); 
        setShowForm(false); 
    };

    const handleOptionChange = (index: number, value: string) => {
        const updatedOptions = [...optionsList];
        updatedOptions[index] = value;
        setOptionsList(updatedOptions);
    };

    const addOption = () => {
        setOptionsList([...optionsList, '']); 
    };

    // console.log("Question Form rendered");
    
    return (
        <div className="page active" id="management">
            <form name="questionForm" onSubmit={handleSubmit} >
                <div className="form-group">
                    <label htmlFor="question">Question</label>
                    <input type="text" id="question" className="box-lg" placeholder="Type question" required value={questionText} onChange={(e) => setQuestionText(e.target.value)}  />
                </div>

                <div className="form-group">
                    <label htmlFor="question-type">Select Question Type</label>
                    <select id="question-type" className="box-lg" onChange={(e) => setQuestionType(e.target.value)} value={questionType} >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                        <option value="file">Document</option>
                        <option value="dropdown-single">Dropdown - Single Select</option>
                        <option value="dropdown-multi">Dropdown - Multi Select</option>
                    </select>
                </div>

                

                <label>Add Validations</label>
                <div className="form-group validations">
                    <div className="form-group req-valdn">
                        <label htmlFor="req">
                            <input type="checkbox" id="req" checked={isRequired} onChange={(e) => setIsRequired(e.target.checked)}  />
                            Required
                        </label>
                    </div>

                   
                        {questionType === "number" && (
                            <div className="valdn num-valdn">
                                <div className="form-group">
                                    <label>Min Number</label>
                                    <input type="number" name="min-num" className="min" required value={minValue} onChange={(e) => setMinValue(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Max Number</label>
                                    <input type="number" name="max-num" className="max" required value={maxValue} onChange={(e) => setMaxValue(e.target.value)}  />
                                </div>
                            </div>
                        )}

                        {questionType === "date" && (
                            <div className="valdn date-valdn">
                                <div className="form-group">
                                    <label>Min Date</label>
                                    <input type="date" name="min-date" className="min" required  value={minValue} onChange={(e) => setMinValue(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Max Date</label>
                                    <input type="date" name="max-date" className="max" required value={maxValue} onChange={(e) => setMaxValue(e.target.value)} />
                                </div>
                            </div>
                        )}

                        {questionType === "text" && (
                            <div className="valdn length-valdn">
                                <div className="form-group">
                                    <label>Min Length</label>
                                    <input type="number" name="min-len" className="min" required  value={minValue} onChange={(e) => setMinValue(e.target.value)}  />
                                </div>
                                <div className="form-group">
                                    <label>Max Length</label>
                                    <input type="number" name="max-len" className="max" required value={maxValue} onChange={(e) => setMaxValue(e.target.value)} />
                                </div>
                            </div>
                        )}


              
                        {(questionType === "dropdown-single" || questionType === "dropdown-multi") && (
                            <div className="valdn options-valdn">
                                <div className="form-group">
                                    <label>Options</label>
                                    <div className="options" style={{ width: "300px" }}>
                                        {optionsList.map((option,index) => (
                                            <input type="text" placeholder="Type option " key={index} value={option} onChange={(e) => handleOptionChange(index, e.target.value)} />
                                        ))} 

                                    </div>
                                    <button type="button" className="add-option box-sm" onClick={addOption} >Add Option</button>
                                    
                                </div>
                            </div>
                        )}
                    
                </div>

                <button type="submit" className="box-sm" id="add-qn">
                    {currentQuestion.id ? "Update Question" : "Add Question"}
                </button>
            </form>
        </div>
    );
}

export default QuestionManagement;
