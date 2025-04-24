import React from "react";
import QuestionItem from "../QuestionItem/QuestionItem";
import Question from "../Question/Question";


interface QuestionsProps {
  questions: Question[];
  onUpdateQn: (question: Question) => void;
  onDelete:(question: Question) => void;
  setCurrentQuestion :  React.Dispatch<React.SetStateAction<Question>>;
}

const Questions: React.FC<QuestionsProps> = ({ questions, onUpdateQn, onDelete ,setCurrentQuestion}) => {
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
            onUpdateQn={onUpdateQn}
            onDelete={onDelete}
          />
        
        ))}
      </div>
    </div>
  );
};

export default Questions;
