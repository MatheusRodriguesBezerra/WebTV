import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageNotFound } from './page404';
import { API_URL } from '../utils/constants';

export function Main() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { term } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const url = term ? (API_URL + '/get-channels-search/' + term) : (API_URL + '/get-channels');
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error('Erro ao carregar dados');
                }

                const result = await response.json();
                setData(result);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [term]);

    if (loading) {
        return (
            <div className="m-[4%_4%_0_4%] flex justify-center items-center">
                <div>Carregando...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="m-[4%_4%_0_4%] flex justify-center items-center">
                <div>Erro: {error}</div>
            </div>
        );
    }

    if (term && data.length === 0) {
        return <PageNotFound />;
    }

    return (
        <div className="m-[4%_4%_0_4%]">
            <div className="grid grid-cols-4 gap-5">
                {data.map((item) => (
                    <Link 
                        className="border border-[#ccc] rounded-md p-5 bg-[#f9f9f9] justify-items-center" 
                        to={`/stream/${item.id}`} 
                        key={item.id}
                    >
                        <img 
                            src={item.img} 
                            alt={item.alt} 
                            className="w-full max-h-[200px] max-w-[200px] object-cover rounded-md mb-2.5"
                        />
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}