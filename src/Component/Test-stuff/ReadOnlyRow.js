import React from "react";

export default function ReadOnlyRow( question, handleEditClick, handleDeleteClick ) {
  return (

    <tr key={question.id}>
        <td>{question.value}</td>
        <td>insert here</td>
        <td>
        <button type="button" onClick={(event) => handleEditClick(event, question)}> Edit </button>
        <button type="button" onClick={() => handleDeleteClick(question.id)}> Delete </button>
        </td>
    </tr>
  );
};