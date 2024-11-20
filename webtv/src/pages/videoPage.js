import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../utils/constants';

export function VideoPage() {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(API_URL + `/get-channel/${id}`);
                if (!response.ok) {
                    throw new Error('Canal não encontrado');
                }
                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (loading) {
        return <div className="text-center p-5">Carregando...</div>;
    }

    if (!item) {
        return <div className="text-center p-5">Canal não encontrado</div>;
    }

    return(
        <div className="max-w-[800px] mx-auto p-5">
            <div className="text-center">
                <h1 className="text-center mb-5 text-[#333]">
                    {item.title}
                </h1>
                <div className="relative w-full pb-[56.25%] overflow-hidden">
                    <iframe 
                        title={item.title} 
                        name="Player" 
                        src={item.options?.[selectedOption]?.link || ''} 
                        className="absolute top-0 left-0 w-full h-full border-none"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="mt-4 flex justify-center gap-2">
                    {item.options?.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedOption(index)}
                            className={`px-4 py-2 rounded-md transition-colors ${
                                selectedOption === index 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                            }`}
                        >
                            {option.title}
                        </button>
                    ))}
                </div>
                {item.description && (
                    <p className="mt-4 text-[#666]">{item.description}</p>
                )}
            </div>
        </div>
    );
}