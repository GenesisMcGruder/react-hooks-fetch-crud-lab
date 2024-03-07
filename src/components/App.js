import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions,setQuestions] = useState([])

  useEffect(()=>{
    fetch(" http://localhost:4000/questions")
      .then((res)=> res.json())
      .then((questions)=> setQuestions(questions))
  },[])

  function handleAddQuestion(newQuestion){
    setQuestions([...questions, newQuestion])
  } 

  function handleDelete(deletedquestion){
    const updatedQuestions = questions.filter((question)=> question.id !== deletedquestion.id);
    setQuestions(updatedQuestions)

  }
  function handleUpdateQuestion(updatedQuestion){
    const updatedQuestions = questions.map((question)=> {
      if(question.id === updatedQuestion.id){
        return updatedQuestion
      }else{
        return question
      }
    })
    setQuestions(updatedQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion}/> : <QuestionList questions={questions}
       onDeleteQuestion={handleDelete}
       onUpdateQuestion={handleUpdateQuestion}/>}
    </main>
  );
}

export default App;
