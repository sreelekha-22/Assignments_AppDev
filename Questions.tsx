import React from "react";
import QuestionItem from "../QuestionItem/QuestionItem";
import Question from "../Question/Question";


interface QuestionsProps {
  questions: Question[];
  onEdit: (question: Question) => void;
  onDelete:(question: Question) => void;
}

const Questions: React.FC<QuestionsProps> = ({ questions, onEdit, onDelete }) => {
  console.log("Questions Rendered");
  console.log(questions);
  return (
    <div>
      <h3 className="title">Your Questions</h3>
      <div className="questions-list">
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            currentQuestion={question}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        
        ))}
      </div>
    </div>
  );
};

export default Questions;
