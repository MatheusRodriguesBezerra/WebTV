import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'firebase/compat/firestore';
import firebase from '../db';

export function VideoPage() {
    const [data, setData] = useState([]);
    const { cardId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            const dataRef = db.collection('streams');
            const snapshot = await dataRef.get();
            const documents = snapshot.docs.map((doc) => doc.data());
            setData(documents);
        };
        
        fetchData();
    }, []);
    
    const item = data.find((card) => card.id === cardId);

    if (!item) {
        return <div>Card não encontrado</div>;
    }

    return(
        <div class="video-container">
            <div class="video-section">
                <h1>{ item.title }</h1>
                <video controls>
                    <source src="{ item.link }" type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                </video>
            </div>
        </div>
    );
}