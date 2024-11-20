import { useState, useEffect } from 'react';

export function ChannelForm({ onSubmit, initialData = null }) {
    const [formData, setFormData] = useState({
        id: null,  // Adicionado campo id
        title: '',
        description: '',
        img: '',
        alt: '',
        type: '',
        options: []
    });

    const [currentOption, setCurrentOption] = useState({
        title: '',
        link: ''
    });

    // Efeito para carregar dados iniciais quando estiver editando
    useEffect(() => {
        if (initialData) {
            setFormData({
                id: initialData.id,  // Garantindo que o ID seja mantido
                title: initialData.title || '',
                description: initialData.description || '',
                img: initialData.img || '',
                alt: initialData.alt || '',
                type: initialData.type || '',
                options: Array.isArray(initialData.options) 
                    ? initialData.options.map(opt => ({
                        title: opt.title || '',
                        link: opt.link || ''
                    }))
                    : []
            });
        }
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOptionChange = (e) => {
        const { name, value } = e.target;
        setCurrentOption(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addOption = () => {
        if (currentOption.title && currentOption.link) {
            setFormData(prev => ({
                ...prev,
                options: [...prev.options, { ...currentOption }]
            }));
            setCurrentOption({ title: '', link: '' });
        }
    };

    const removeOption = (index) => {
        setFormData(prev => ({
            ...prev,
            options: prev.options.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Passa o ID junto com os dados se estiver editando
        onSubmit(formData);
    };

    const resetForm = () => {
        if (initialData) {
            // Se estiver editando, volta aos dados iniciais
            setFormData({
                id: initialData.id,
                title: initialData.title || '',
                description: initialData.description || '',
                img: initialData.img || '',
                alt: initialData.alt || '',
                type: initialData.type || '',
                options: Array.isArray(initialData.options) 
                    ? [...initialData.options]
                    : []
            });
        } else {
            // Se estiver criando, limpa o formulário
            setFormData({
                id: null,
                title: '',
                description: '',
                img: '',
                alt: '',
                type: '',
                options: []
            });
        }
        setCurrentOption({ title: '', link: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="space-y-6">
                {/* Título do formulário */}
                <h2 className="text-xl font-bold text-gray-900">
                    {initialData ? 'Editar Canal' : 'Adicionar Novo Canal'}
                </h2>

                {/* Campos principais */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Título</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descrição</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            rows="3"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">URL da Imagem</label>
                        <input
                            type="url"
                            name="img"
                            value={formData.img}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Texto Alternativo</label>
                        <input
                            type="text"
                            name="alt"
                            value={formData.alt}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo</label>
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                {/* Seção de Opções */}
                <div className="border-t pt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Adicionar Opções</h3>
                    <div className="flex gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Título da opção"
                            value={currentOption.title}
                            onChange={handleOptionChange}
                            name="title"
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <input
                            type="url"
                            placeholder="Link da opção"
                            value={currentOption.link}
                            onChange={handleOptionChange}
                            name="link"
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={addOption}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Adicionar
                        </button>
                    </div>

                    {/* Lista de opções */}
                    <div className="space-y-2">
                        {formData.options.map((option, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                <span>{option.title} - {option.link}</span>
                                <button
                                    type="button"
                                    onClick={() => removeOption(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remover
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botões de ação */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                    >
                        {initialData ? 'Atualizar Canal' : 'Salvar Canal'}
                    </button>
                    <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    >
                        {initialData ? 'Restaurar Dados' : 'Limpar Formulário'}
                    </button>
                </div>
            </div>
        </form>
    );
}