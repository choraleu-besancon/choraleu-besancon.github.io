class ConcertGalleryManager {
    constructor() {
        this.galleries = [];
        this.viewers = new Map();
        this.fetchAndInitializeGalleries();
    }

    async fetchAndInitializeGalleries() {
        try {
            // Chemin vers galleries.json (adapte le chemin si besoin)
            // Méthode moderne avec l'objet URL
            const absoluteUrl = new URL('assets/galleries.json', window.location.href).href;
            console.log(absoluteUrl); // Affiche l'URL absolue sur le web

            const response = await fetch(absoluteUrl);
            if (!response.ok) throw new Error('Erreur lors du chargement de galleries.json');
            this.galleries = await response.json();
            this.renderGalleries();
            this.setupViewers();
        } catch (err) {
            console.error('Impossible de charger les galeries:', err);
        }
    }

    renderGalleries() {
        const container = document.getElementById('galleries-container');
        container.innerHTML = ''; // Nettoie le conteneur avant de rendre

        this.galleries.forEach(gallery => {
            const galleryHTML = this.createGalleryHTML(gallery);
            container.insertAdjacentHTML('beforeend', galleryHTML);
        });
    }

    createGalleryHTML(gallery) {
        const hiddenImagesHTML = gallery.images.map((img, index) =>
            `<img src="${img}" alt="${gallery.title} - Photo ${index + 1}">`
        ).join('');

        return `
            <div class="gallery-item" data-gallery="${gallery.id}">
                <img class="gallery-cover" 
                     src="${gallery.coverImage}" 
                     alt="${gallery.title}">
                
                <div class="gallery-overlay">
                    <h4>${gallery.title}</h4>
                    <p>📷 ${gallery.images.length} photos</p>
                </div>
                
                <div class="hidden-images">
                    ${hiddenImagesHTML}
                </div>
            </div>
        `;
    }

    setupViewers() {
        const galleryItems = document.querySelectorAll('.gallery-item');

        galleryItems.forEach(item => {
            const galleryId = item.dataset.gallery;
            const coverImage = item.querySelector('.gallery-cover');
            const hiddenImagesContainer = item.querySelector('.hidden-images');

            // Créer le viewer pour cette galerie
            const viewer = new Viewer(hiddenImagesContainer, {
                inline: false,
                backdrop: true,
                navbar: 2,
                title: 0,
                fullscreen: false,
                movable: false,
                zoomable: true,
                toolbar: {
                    oneToOne: true,
                    prev: true,
                    play: true,
                    next: true,
                },
                hidden: function () {
                    // Scroll vers la section #portfolio en douceur
                    const portfolio = document.getElementById('concert');
                    if (portfolio) {
                        portfolio.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                },
                title: [1, (image, imageData) => {
                    const gallery = this.galleries.find(g => g.id === galleryId);
                    return `${gallery.title} - ${imageData.alt}`;
                }],
                navbar: true,
                tooltip: true
            });

            // Stocker le viewer
            this.viewers.set(galleryId, viewer);

            // Ajouter l'événement click sur l'image de couverture
            coverImage.addEventListener('click', () => {
                viewer.show();
            });
        });
    }

    // Méthode pour nettoyer les viewers
    destroy() {
        this.viewers.forEach(viewer => viewer.destroy());
        this.viewers.clear();
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    new ConcertGalleryManager();
});
