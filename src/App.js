import React, { useState } from "react";

import './styles.css';

import firebase from "./connections/firebaseConnection";

function App() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [posts, setPosts] = useState([]);

  async function handleAdd() {
    await firebase.firestore().collection('posts')
     .add({
      titulo: title,
      autor: author,
     })
     .then(() => {
      console.log('DADOS CADASTRADOS COM SUCESSO!')
      setTitle('');
      setAuthor('');
     })
     .catch((error) => {
      console.log('GEROU ALGUM ERRO: ', error);
     });
  };

  async function getPost() {
    await firebase.firestore().collection('posts')
     .get()
     .then((snapshot) => {
      let list = [];

      snapshot.forEach((document) => {
        list.push({
          id: document.id,
          title: document.data().titulo,
          author: document.data().autor, 
        });
      });

      setPosts(list);
     })
     .catch((error) => {
      console.log('DEU ALGUM ERRO: ', error);
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
      <button onClick={getPost} >Buscar Post</button>
      <br/>

      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id} >
              <span>Titulo: {post.title}</span>
              <br />

              <span>Autor: {post.author}</span>
              <br />
              <br />
            </li>
          );
        })}
      </ul>

    </div>
  );
};

export default App;