import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'firebase/compat/firestore';
import firebase from '../db';
import { PageNotFound } from './page404';
import './main.css';

export function MainGrid() {
    const [data, setData] = useState([]);
    const { type } = useParams();

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

    let filtred = data; 

    if(type){
        if(data.filter((card) => card.type === type).length > 0){
            filtred = data.filter((card) => card.type === type);
        }else{
            return <PageNotFound />;
        }
    }

    return(
        <main>
            <div class="grid-container">
            {filtred.map((item) => (
                <Link class="card" to={`/streams/${item.id}`}>
                    <img src={ item.img } alt={ item.alt }/>
                    <h2>{ item.title }</h2>
                    <p>{ item.description }</p>
                </Link>
            ))}
            </div>
        </main>
    );
}