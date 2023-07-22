import { useEffect, useState } from 'react';
import 'firebase/compat/firestore';
import firebase from '../db';

export function VideoPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Exemplo de leitura de dados do Firestore
        const fetchData = async () => {
            const db = firebase.firestore();
            const dataRef = db.collection('streams'); // Substitua 'nomeDaColecao' pelo nome real da coleção no Firestore
            const snapshot = await dataRef.get();
            const documents = snapshot.docs.map((doc) => doc.data());
            setData(documents);
        };

        fetchData();
    }, []);

    return(
        <div class="video-container">
            {data.map((item) => (
                <div class="video-section">
                    <h1>{ item.Title }</h1>
                    <video controls>
                        <source src="{ item.link }" type="video/mp4" />
                        Seu navegador não suporta o elemento de vídeo.
                    </video>
                </div>
            ))}
        </div>
    );
}