import { useEffect, useState } from "react";
import QuestionManagement from "../QuestionManagement/QuestionManagement";
import Tabs from "../Tabs/Tabs";
import './HomePage.css';
import Questions from "../Questions/Questions";
import Question from "../Question/Question";

export default function HomePage(){
    const [showForm, setShowForm ] =useState(false);
    const [questions ,setQuestions ] = useState<Question[]>([]);
    const [currentQuestion ,setCurrentQuestion ] = useState<Question>(
        { 
        id: "",
        text: "",
        type: "",
        required: false,
       });

       useEffect(() => {
            console.log("Questions list changed", questions);
        }, [questions]);


    function handleAddQButtonClick(){
        setShowForm(prev => !prev);
        
    }

    function onAddOrUpdate(questionToBeAddOrUpdate : Question ){
        console.log(" Adding func. called for qn" , questionToBeAddOrUpdate);
        if(questionToBeAddOrUpdate.id){
            setQuestions(prevQuestions => ( prevQuestions.map(question => (question.id===questionToBeAddOrUpdate.id ? questionToBeAddOrUpdate : question) ) ));
        }
        else{
            
            setQuestions(prevQuestions => ([...prevQuestions,questionToBeAddOrUpdate]));
        }
        setShowForm(false);
        setCurrentQuestion({ 
            id: "",
            text: "",
            type: "",
            required: false,
           });
    }

    function onDelete(questionToBeDeleted : Question){
        setQuestions(prevQuestions => ( prevQuestions.filter(question => question.id !== questionToBeDeleted.id ) ));
    }
    
    return (
        <div className="container">
             <button type="button" className="box-sm btn-preview">Get Preview</button>
             <Tabs/>
             <div className="title">
                <h3>Question Management Form</h3>
            </div>
            <div>
                <button type="button" className="create-new-qn box-sm" onClick={handleAddQButtonClick} >+ New question</button>
            </div> 
            
             {
                showForm && <QuestionManagement currentQuestion={currentQuestion} setShowForm={setShowForm} onAddOrUpdate={onAddOrUpdate}/>
             }

             <Questions questions={questions} onEdit={onAddOrUpdate} onDelete={onDelete}/>

        </div>
      
    );
};
