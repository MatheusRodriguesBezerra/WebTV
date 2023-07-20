export function VideoPage() {
    return(
        <div class="video-container">
            <h1>Transmissão ao Vivo</h1>
            <div class="video-section">
                <video controls>
                    <source src="caminho/para/seu_video.mp4" type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                </video>
            </div>
        </div>
    );
}