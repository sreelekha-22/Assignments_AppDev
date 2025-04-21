import React from "react";
import QuestionItem from "../QuestionItem/QuestionItem";

interface Question {
  id: string;
  text: string;
  type: string;
  required: boolean;
  min?: string;
  max?: string;
  optionsList?: string[];
}

interface QuestionsProps {
  questions: Question[];
  onAddOrUpdate: (question: Question) => void;
  onEdit: (question: Question) => void;
  onDelete: (id: string) => void;
}

const Questions: React.FC<QuestionsProps> = ({ questions, onAddOrUpdate, onEdit, onDelete }) => {
  return (
    <div>
      <h3 className="title">Your Questions</h3>
      <div className="questions-list">
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            currentQuestion={question}
            onAddOrUpdate={onAddOrUpdate}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        
        ))}
      </div>
    </div>
  );
};

export default Questions;