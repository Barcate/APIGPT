import logo from './logo.jpg';
import './App.css';
import {useState} from 'react'

function App() {

  return (
    <div className="container">
      <section className="left">
        <img src={logo}></img>
      </section>
      <section className="right">
        
        <form className='input-group'>
          <h1>
            Bem-vindo!
          </h1>
          <h2>
            texto-para-voz
          </h2>
          <input type="text" name="nomeUsuario" placeholder="Digite o texto" />

          <button id='BT-Gerar'>
            Gerar
          </button>
        </form>
        <button id='BT-Download'>
          Baixar Audio
        </button>
      </section>
    </div>
  );
}

export default App;
