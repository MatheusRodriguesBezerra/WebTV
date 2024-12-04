export function Footer() {
    return(
        <footer className="mt-[5%] bg-[#333] p-5 text-center">
            <div className="logo">
                <img 
                    src="https://i.ibb.co/Lntzz4b/logo.png" 
                    alt="Logo do seu site"
                    className="max-w-[100px]"
                />
            </div>

            <nav className="mt-2.5">
                <ul className="list-none p-0">
                    <li className="inline-block mr-2.5">
                        <a 
                            href="/" 
                            className="no-underline text-[#f9f9f9] hover:text-black"
                        >
                            Link 1
                        </a>
                    </li>
                    <li className="inline-block mr-2.5">
                        <a 
                            href="/" 
                            className="no-underline text-[#f9f9f9] hover:text-black"
                        >
                            Link 2
                        </a>
                    </li>
                    <li className="inline-block mr-2.5">
                        <a 
                            href="/" 
                            className="no-underline text-[#f9f9f9] hover:text-black"
                        >
                            Link 3
                        </a>
                    </li>
                </ul>
            </nav>
        </footer>
    );
}