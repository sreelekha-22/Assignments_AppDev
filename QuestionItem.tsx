import React from "react";

interface Question {
  id: string;
  text: string;
  type: string;
  required: boolean;
  min?: string;
  max?: string;
  optionsList?: string[];
}

interface QuestionItemProps {
  currentQuestion: Question;
  // onAddOrUpdate: (question: Question) => void;
  onUpdateQn: (question: Question) => void;
  onDelete: (question: Question) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  currentQuestion,
  onUpdateQn,
  onDelete,
}) => {
  const handleEdit = () => {
    // onEdit(currentQuestion);
    // onUpdateQn(currentQuestion);
    
    
  };

  const handleDelete = () => {
    onDelete(currentQuestion);
  };

  return (
    <div className="question-item" id={currentQuestion.id}>
      <div>
        <strong>{currentQuestion.text}</strong>
      </div>
      {currentQuestion.type !== "dropdown-single" && currentQuestion.type !== "dropdown-multi" ? (
        <input
          type={currentQuestion.type}
          required={currentQuestion.required}
          min={currentQuestion.type === "number" || currentQuestion.type === "date" ? currentQuestion.min : undefined}
          max={currentQuestion.type === "number" || currentQuestion.type === "date" ? currentQuestion.max : undefined}
          minLength={currentQuestion.type === "text" ? Number(currentQuestion.min) : undefined}
          maxLength={currentQuestion.type === "text" ? Number(currentQuestion.max) : undefined}
        />
      ) : (
        <select className="qn-dropdown" multiple={currentQuestion.type === "dropdown-multi"}>
          {currentQuestion.optionsList?.map((optionValue, index) => (
            <option key={index} value={optionValue}>
              {optionValue}
            </option>
          ))}
        </select>
      )}
      <div className="flex-v right-top">
        <button className="box-vsm" style={{ backgroundColor: "green", color: "white" }} onClick={handleEdit}>
          Edit
        </button>
        <button className="box-vsm" style={{ backgroundColor: "red", color: "white" }} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default QuestionItem;
