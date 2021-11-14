import React, { useState } from "react";

import firebase from "./connections/firebaseConnection";

function App() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  function handleAdd() {
    alert('CLICOU');
  };

  return (
    <div>
      <h1>ReactJS + Firebase</h1>
      <br />

      <label>Titulo: </label>
      <textarea type="text" value={title} onChange={(event) => setTitle(event.target.value)} />

      <label>Autor: </label>
      <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />

      <button onClick={handleAdd} >Cadastrar</button>

    </div>
  );
};

export default App;