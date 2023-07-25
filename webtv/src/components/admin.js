import { useEffect, useState } from 'react';
import 'firebase/compat/firestore';
import firebase from '../db';

export function AdmPage() {
  const [streams, setStreams] = useState([]);
  const [newStream, setNewStream] = useState({
    description: '',
    id: '',
    title: '',
    alt: '',
    img: '',
    link: '',
    type: '',
  });

  // Carregar dados das streams do Firebase Firestore
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const streamsRef = db.collection('streams');
      const snapshot = await streamsRef.get();

      const streamsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setStreams(streamsData);
    };

    fetchData();
  }, []);

  // Função para adicionar uma nova stream
  const addStream = () => {
    const db = firebase.firestore();
    db.collection('streams')
      .add(newStream)
      .then(() => {
        setNewStream({
          description: '',
          id: '',
          title: '',
          alt: '',
          img: '',
          link: '',
          type: '',
        });
        // Atualizar a lista de streams após a adição
        setStreams([...streams, newStream]);
      })
      .catch((error) => {
        console.error('Erro ao adicionar a stream:', error);
      });
  };

  // Função para remover uma stream pelo ID
  const removeStream = (id) => {
    const db = firebase.firestore();
    db.collection('streams')
      .doc(id)
      .delete()
      .then(() => {
        // Atualizar a lista de streams após a remoção
        setStreams(streams.filter((stream) => stream.id !== id));
      })
      .catch((error) => {
        console.error('Erro ao remover a stream:', error);
      });
  };

  return (
    <div class="admpg">
      <h1>Admin Page</h1>
      <div>
        <form>
            <h2>Adicionar Nova Stream</h2>
            <input
            type="text" placeholder="Title" value={newStream.title}
            onChange={(e) => setNewStream({ ...newStream, title: e.target.value })}
            />
            <input
            type="text" placeholder="Description" value={newStream.description}
            onChange={(e) => setNewStream({ ...newStream, description: e.target.value })}
            />
            <input
            type="text" placeholder="Alt" value={newStream.alt}
            onChange={(e) => setNewStream({ ...newStream, alt: e.target.value })}
            />
            <input
            type="text" placeholder="ID" value={newStream.id}
            onChange={(e) => setNewStream({ ...newStream, id: e.target.value })}
            />
            <input
            type="text" placeholder="Img" value={newStream.img}
            onChange={(e) => setNewStream({ ...newStream, img: e.target.value })}
            />
            <input
            type="text" placeholder="Link" value={newStream.link}
            onChange={(e) => setNewStream({ ...newStream, link: e.target.value })}
            />
            <input
            type="text" placeholder="type" value={newStream.type}
            onChange={(e) => setNewStream({ ...newStream, type: e.target.value })}
            />
            <button onClick={addStream}>Adicionar</button>
        </form>
      </div>
      <div>
        <h2>Streams Existentes</h2>
        <ul>
          {streams.map((stream) => (
            <li key={stream.id}>
              {stream.title} - {stream.description}{' '}
              <button onClick={() => removeStream(stream.id)}>Remover</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
