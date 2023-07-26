export function Header() {
    return(
        <header>
            <div class="upside">
                <h1>WebTV</h1>
                <div class="search">
                    <input type="text" class="searchTerm" placeholder="What are you looking for?"/>
                    <button type="submit" class="searchButton">
                        <img src="https://i.ibb.co/y5KdKPy/64673.png" alt="64673" border="0" class="bloom" />
                    </button>
                </div>
            </div>
            <div class="options">
                <ul>
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/desenhos">Desenhos</a></li>
                    <li><a href="/esportes">Esportes</a></li>
                    <li><a href="/filmes">Filmes</a></li>
                    <li><a href="/jornalismo">Jornalismo</a></li>
                    <li><a href="/religioso">Religioso</a></li>
                    <li><a href="/tvaberta">TV aberta</a></li>
                </ul>
            </div>
        </header>
    );
}