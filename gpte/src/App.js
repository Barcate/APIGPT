import React, { useState } from 'react';
import logo from './logo.jpg';
import './App.css';

function App() {
  const [mensagens, setMensagens] = useState([]);
  const [mensagemAtual, setMensagemAtual] = useState("");
  const [audioUrls, setAudioUrls] = useState([]);
  const [erro, setErro] = useState("");

  const enviarMensagem = async (e) => {
    e.preventDefault();
    if (mensagemAtual.trim() === '') {
      setErro("Por favor, digite uma mensagem antes de enviar.");
      return;
    }

    setMensagens([...mensagens, mensagemAtual]);
    setErro("");

    try {
      const response = await fetch('http://localhost:3001/generate-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto: mensagemAtual }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const { url } = await response.json();
      setAudioUrls(prevUrls => [...prevUrls, url]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setErro("Erro ao enviar mensagem. Por favor, tente novamente.");
    }

    setMensagemAtual("");
  };

  return (
    <div className="container">
      <section className="left">
        <img src={logo} alt="Logo" />
      </section>
      <section className="right">
        <h1>Bem-Vindo</h1>
        <h5>Texto-para-audio</h5>
        <div className="chat-container">
          
          {mensagens.map((msg, index) => (
            <div key={index} className="message-audio-container">
              <div className="mensagem">{msg}</div>
              {audioUrls[index] && (
                <div className="audio-container">
                  <audio controls src={audioUrls[index]}>
                    Seu navegador não suporta o elemento de áudio.
                  </audio>
                </div>
              )}
            </div>
          ))}

          {erro && <div className="error">{erro}</div>}

          <form onSubmit={enviarMensagem} className="form-mensagem">
            <input
              type="text"
              value={mensagemAtual}
              onChange={(e) => setMensagemAtual(e.target.value)}
              placeholder="Digite sua mensagem"
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
