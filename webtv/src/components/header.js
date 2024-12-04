import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(searchTerm);
        if (searchTerm.trim()) {
            try {
                navigate(`/search/${encodeURIComponent(searchTerm)}`);
            } catch (error) {
                console.error('Erro na pesquisa:', error);
            }
        }
    };

    return(
        <header className="bg-[#333]">
            <div className="text-center flex justify-between items-center p-5">
                <img 
                    src="https://i.ibb.co/r5hZ7mN/logo.png" 
                    alt="64673" 
                    className="h-[15vh] brightness-0 invert"
                />
                <form 
                    onSubmit={handleSearch}
                    className="flex items-center justify-center"
                >
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2.5 w-[25vw] border-2 border-[#ccc] rounded-md outline-none"
                        placeholder="What are you looking for?"
                    />
                    <button 
                        type="submit" 
                        className="flex items-center justify-center p-2.5 bg-[#007bff] border-none rounded-md ml-1.5 hover:bg-[#0056b3] cursor-pointer"
                    >
                        <img 
                            src="https://i.ibb.co/y5KdKPy/64673.png" 
                            alt="64673" 
                            className="w-5 h-auto"
                        />
                    </button>
                </form>
            </div>
            <div className="w-full pb-[2%]">
                <ul className="flex justify-between list-none mx-[8%] mb-0 p-0">
                    <li className="inline-block mr-2.5 cursor-pointer">
                        <Link to="/" className="no-underline font-bold text-white text-base hover:underline">Home</Link>
                    </li>
                    <li className="inline-block mr-2.5 cursor-pointer">
                        <Link to="/desenhos" className="no-underline font-bold text-white text-base hover:underline">Desenhos</Link>
                    </li>
                    <li className="inline-block mr-2.5 cursor-pointer">
                        <Link to="/esportes" className="no-underline font-bold text-white text-base hover:underline">Esportes</Link>
                    </li>
                    <li className="inline-block mr-2.5 cursor-pointer">
                        <Link to="/filmes" className="no-underline font-bold text-white text-base hover:underline">Filmes</Link>
                    </li>
                    <li className="inline-block mr-2.5 cursor-pointer">
                        <Link to="/jornalismo" className="no-underline font-bold text-white text-base hover:underline">Jornalismo</Link>
                    </li>
                    <li className="inline-block mr-2.5 cursor-pointer">
                        <Link to="/religioso" className="no-underline font-bold text-white text-base hover:underline">Religioso</Link>
                    </li>
                    <li className="inline-block cursor-pointer">
                        <Link to="/tvaberta" className="no-underline font-bold text-white text-base hover:underline">TV aberta</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}