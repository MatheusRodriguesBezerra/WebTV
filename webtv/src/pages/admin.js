import { useState, useEffect } from 'react';
import { ChannelForm } from './channelForm';
import { ChannelList } from './channelList';
import { API_URL } from '../utils/constants';

export function AdmPage() {
    const [channels, setChannels] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingChannel, setEditingChannel] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchChannels();
    }, []);

    const fetchChannels = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(API_URL + '/get-channels');
			
			if (!response.ok) {
				throw new Error('Erro ao carregar canais');
			}

            const data = await response.json();
            
            const formattedData = data.map(channel => ({
                ...channel,
                options: channel.options || []
            }));
            
            setChannels(formattedData);
        } catch (err) {
            setError('Erro ao carregar canais');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddChannel = async (channelData) => {
        try {
    
            const response = await fetch(API_URL + '/add-channel', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Adicione o token
                },
                body: JSON.stringify(channelData)
            });
    
            if (!response.ok) {
                throw new Error('Erro ao adicionar canal');
            }
    
            await fetchChannels();
            setIsFormVisible(false);
        } catch (error) {
            setError('Erro ao adicionar canal: ' + error.message);
        }
    };

    const handleEditChannel = async (channelData) => {
        try {
            const response = await fetch(API_URL + '/edit-channel', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(channelData)
            });
            
            if (!response.ok) {
                throw new Error('Erro ao atualizar canal');
            }

            await fetchChannels();
            setEditingChannel(null);
            setIsFormVisible(false);
        } catch (error) {
            setError('Erro ao atualizar canal: ' + error.message);
        }
    };

    const handleDelete = async (channelId) => {
        try {
            const response = await fetch(API_URL + '/delete-channel', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
					id: channelId
				})
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar canal');
            }

            await fetchChannels();
        } catch (error) {
            setError('Erro ao deletar canal: ' + error.message);
        }
    };

    const handleEdit = (channel) => {
        setEditingChannel(channel);
        setIsFormVisible(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Gerenciamento de Canais
                    </h1>
                    <button
                        onClick={() => {
                            setEditingChannel(null);
                            setIsFormVisible(!isFormVisible);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        {isFormVisible ? 'Voltar para Lista' : 'Adicionar Canal'}
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                        <strong className="font-bold">Erro! </strong>
                        <span className="block sm:inline">{error}</span>
                        <button
                            className="absolute top-0 bottom-0 right-0 px-4"
                            onClick={() => setError(null)}
                        >
                            ×
                        </button>
                    </div>
                )}

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {isFormVisible ? (
                            <ChannelForm
                                onSubmit={editingChannel ? handleEditChannel : handleAddChannel}
                                initialData={editingChannel}
                            />
                        ) : (
                            <ChannelList
                                channels={channels}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}