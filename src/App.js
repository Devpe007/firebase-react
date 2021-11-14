import React, { useState } from "react";

import './styles.css';

import firebase from "./connections/firebaseConnection";

function App() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  async function handleAdd() {
    await firebase.firestore().collection('posts')
     .doc('12345')
     .set({
      titulo: title,
      autor: author,
     })
     .then(() => {
      console.log('DADOS CADASTRADOS COM SUCESSO!')
     })
     .catch((error) => {
      console.log('GEROU ALGUM ERRO: ', error);
     });
  };

  return (
    <div className="app" >
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