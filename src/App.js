import React, { useState, useEffect } from "react";

import './styles.css';

import firebase from "./connections/firebaseConnection";

function App() {
  const [idPost, setIdPost] = useState('')
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [posts, setPosts] = useState([]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  async function deletePost(id) {
    await firebase.firestore().collection('posts')
     .doc(id)
     .delete()
     .then(() => {
      alert('ESSE POST FOI EXCLUIDO!')
     })
     .catch((error) => {
      console.log('ERRO AO EXCLUIR', error);
     });
  };

  async function registerUser() {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
     .then((value) => {
      console.log('CADASTRADO COM SUCESSO!', value);
     })
     .catch((error) => {
      console.log('error', error);
     });
  };

  return (
    <div className="app" >
      <h1>ReactJS + Firebase</h1>
      <br />

      <div>
        <label>Email</label>
        <br />
        <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
        <br />

        <label>Password</label>
        <br />
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br />

        <button onClick={registerUser} >Cadastrar</button>
      </div>

      <hr />

      <h2>Banco de Dados</h2>
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
              
              <button onClick={() => deletePost(post.id)} >Excluir Post</button>
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