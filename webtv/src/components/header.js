export function Header() {
    return(
        <header>
            <div class="upside">
                <h1>WebTV</h1>
                <div class="search">
                    <input type="text" class="searchTerm" placeholder="What are you looking for?"/>
                    <button type="submit" class="searchButton">
                    <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <div class="options">
                <ul>
                    <li>Inicio</li>
                    <li>Desenhos</li>
                    <li>Esportes</li>
                    <li>Filmes</li>
                    <li>Jornalismo</li>
                    <li>Religioso</li>
                    <li>TV aberta</li>
                </ul>
            </div>
        </header>
    );
}