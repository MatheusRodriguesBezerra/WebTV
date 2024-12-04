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
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.map((item) => (
                    <Link 
                        className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden" 
                        to={`/stream/${item.id}`} 
                        key={item.id}
                    >
                        <div className="h-48 overflow-hidden flex items-center justify-center">
                            <img 
                                src={item.img} 
                                alt={item.alt} 
                                className="w-[90%] h-[90%] object-contain transform hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
                                {item.title}
                            </h2>
                            <p className="text-gray-600 text-sm line-clamp-4">
                                {item.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}