import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(){
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method:"DELETE",
    })
    .then((res)=> res.json())
    .then(()=> onDeleteQuestion(question))
  }

  function handleUpdate(){
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method:"PATCH",
      headers: {
        "Conetent-Type": "appplication/json"
      },
      body: JSON.stringify({
        correctIndex : question.correctIndex
      }
      )
    })
    .then((res)=> res.json())
    .then((updatedQuestion)=> onUpdateQuestion(updatedQuestion))
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onClick={handleUpdate} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
