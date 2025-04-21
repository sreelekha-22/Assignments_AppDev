import { useState } from "react";
import QuestionManagement from "../QuestionManagement/QuestionManagement";
import Tabs from "../Tabs/Tabs";
import './HomePage.css';

export default function HomePage(){
    const [showForm, setShowForm ] =useState(false);

    function handleAddQButtonClick(){
        setShowForm(prev => !prev);
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
                showForm && <QuestionManagement setShowForm={setShowForm} />
             }
        </div>
      
    );
};