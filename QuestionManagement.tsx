import React, { useState } from "react";
import '../Home/HomePage.css';


interface QuestionManagementProps {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionManagement: React.FC<QuestionManagementProps> = ({ setShowForm }) => {    const [questionType, setQuestionType] = useState("number");
    const [isRequired, setIsRequired] = useState(false);
console.log("Question Form rendered");
    const handleQuestionTypeChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        setQuestionType(event.target.value);
        console.log(typeof event.target.value);
    };

    const handleRequiredChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setIsRequired(event.target.checked);
    };

    return (
        <div className="page active" id="management">
            {/* <div className="title">
                <h3>Question Management Form</h3>
            </div>
            <div>
                <button type="button" className="create-new-qn box-sm">+ New question</button>
            </div> */}
            <form name="questionForm">
                <div className="form-group">
                    <label htmlFor="question">Question</label>
                    <input type="text" id="question" className="box-lg" placeholder="Type question" required />
                </div>

                <div className="form-group">
                    <label htmlFor="question-type">Select Question Type</label>
                    <select id="question-type" className="box-lg" value={questionType} onChange={handleQuestionTypeChange}>
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
                            <input type="checkbox" id="req" checked={isRequired} onChange={handleRequiredChange} />
                            Required
                        </label>
                    </div>

                   
                        {questionType === "number" && (
                            <div className="valdn num-valdn">
                                <div className="form-group">
                                    <label>Min Number</label>
                                    <input type="number" name="min-num" className="min" required />
                                </div>
                                <div className="form-group">
                                    <label>Max Number</label>
                                    <input type="number" name="max-num" className="max" required />
                                </div>
                            </div>
                        )}

                        {questionType === "date" && (
                            <div className="valdn date-valdn">
                                <div className="form-group">
                                    <label>Min Date</label>
                                    <input type="date" name="min-date" className="min" required/>
                                </div>
                                <div className="form-group">
                                    <label>Max Date</label>
                                    <input type="date" name="max-date" className="max" required/>
                                </div>
                            </div>
                        )}

                        {questionType === "text" && (
                            <div className="valdn length-valdn">
                                <div className="form-group">
                                    <label>Min Length</label>
                                    <input type="number" name="min-len" className="min" required />
                                </div>
                                <div className="form-group">
                                    <label>Max Length</label>
                                    <input type="number" name="max-len" className="max" required />
                                </div>
                            </div>
                        )}


                <div className="options-container form-group">
                    <label>Options:</label>
                    <div className="options" style={{ width: "300px" }}></div>
                    <button type="button" className="add-option box-sm">Add Option</button>
                </div>
                        {(questionType === "dropdown-single" || questionType === "dropdown-multi") && (
                            <div className="valdn options-valdn">
                                <div className="form-group">
                                    <label>Options</label>
                                    <input type="text" placeholder="Type option " />
                                </div>
                            </div>
                        )}
                    
                </div>

                <button type="submit" className="box-sm" id="add-qn">Add Question</button>
            </form>
        </div>
    );
}

export default QuestionManagement;