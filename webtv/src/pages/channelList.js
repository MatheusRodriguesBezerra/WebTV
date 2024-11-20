import { useState } from 'react';

export function ChannelList({ channels, onDelete, onEdit }) {
    const [expandedChannel, setExpandedChannel] = useState(null);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Canais Disponíveis</h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {channels.map((channel) => (
                    <div 
                        key={channel.id} 
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        {/* Cabeçalho do Card */}
                        <div className="relative h-48 overflow-hidden">
                            <img 
                                src={channel.img} 
                                alt={channel.alt}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-0 right-0 p-2 space-x-2">
                                <button 
                                    onClick={() => onEdit(channel)}
                                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </button>
                                <button 
                                    onClick={() => onDelete(channel.id)}
                                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Conteúdo do Card */}
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{channel.title}</h3>
                            <p className="text-gray-600 mb-2">{channel.description}</p>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                {channel.type}
                            </span>

                            {/* Botão para expandir/recolher opções */}
                            <button 
                                onClick={() => setExpandedChannel(
                                    expandedChannel === channel.id ? null : channel.id
                                )}
                                className="mt-4 text-blue-500 hover:text-blue-700"
                            >
                                {expandedChannel === channel.id ? 'Ocultar opções' : 'Ver opções'}
                            </button>

                            {/* Lista de opções expandível */}
                            {expandedChannel === channel.id && (
                                <div className="mt-4 space-y-2">
                                    {channel.options.map((option, index) => (
                                        <div 
                                            key={index}
                                            className="bg-gray-50 p-2 rounded-md"
                                        >
                                            <p className="font-medium">{option.title}</p>
                                            <a 
                                                href={option.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-500 hover:text-blue-700"
                                            >
                                                {option.link}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}