import { useEffect, useState } from 'react';
import 'firebase/compat/firestore';
import firebase from '../db';

export function MainGrid() {
    const [data, setData] = useState([]);

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

    return(
        <main>
            <div class="grid-container">
            {data.map((item) => (
                <div class="card">
                    <img src={ item.img } alt={ item.alt }/>
                    <h2>{ item.Title }</h2>
                    <p>{ item.Description }</p>
                </div>
            ))}
            </div>
        </main>
    );
}