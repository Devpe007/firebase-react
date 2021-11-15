import React, { useState, useEffect } from "react";

import './styles.css';

import firebase from "./connections/firebaseConnection";

function App() {
  const [idPost, setIdPost] = useState('')
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      await firebase.firestore().collection('posts')
       .onSnapshot((document) => {
        let myPosts = [];

        document.forEach((item) => {
          myPosts.push({
            id: item.id,
            title: item.data().titulo,
            author: item.data().autor,
          });
        });

        setPosts(myPosts);
       });
    };

    loadPosts();
  }, []);

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

  async function editPost() {
    await firebase.firestore().collection('posts')
     .doc(idPost)
     .update({
      titulo: title,
      autor: author,
     })
     .then(() => {
      console.log('DADOS ATUALIZADOS COM SUCESSO!');
      setIdPost('');
      setTitle('');
      setAuthor('');
     })
     .catch((error) => {
      console.log('ERRO AO ATUALIZAR', error);
     });
  };

  return (
    <div className="app" >
      <h1>ReactJS + Firebase</h1>
      <br />

      <label>ID: </label>
      <input type="text" value={idPost} onChange={(event) => setIdPost(event.target.value)} />

      <label>Titulo: </label>
      <textarea type="text" value={title} onChange={(event) => setTitle(event.target.value)} />

      <label>Autor: </label>
      <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />

      <button onClick={handleAdd} >Cadastrar</button>
      <button onClick={getPost} >Buscar Post</button>
      <button onClick={editPost} >Editar</button>
      <br/>

      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id} >
              <span>ID - {post.id}</span>
              <br />

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