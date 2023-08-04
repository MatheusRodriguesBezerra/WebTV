import './footer.css';

export function Footer() {
    return(
        <footer>
            <div class="logo">
                <img src="caminho/para/sua_logo.png" alt="Logo do seu site"/>
            </div>

            <nav class="links">
                <ul>
                    <li><a href="/">Link 1</a></li>
                    <li><a href="/">Link 2</a></li>
                    <li><a href="/">Link 3</a></li>
                </ul>
            </nav>
        </footer>
    );
}