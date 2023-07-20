export function MainGrid() {
    return(
        <main>
            <div class="grid-container">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </main>
    );
}

export function Card() {
    return(
        <div class="card">
            <img src="caminho/para/imagem1.jpg" alt="Imagem do Card 1"/>
            <h2>Card 1</h2>
            <p>Breve descrição do Card 1...</p>
        </div>
    );
}