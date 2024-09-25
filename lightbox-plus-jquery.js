document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelectorAll('.gallery a');
    let currentImageIndex = 0;

    gallery.forEach((item, index) => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            currentImageIndex = index;
            const imageSrc = this.href;
            const title = this.getAttribute('data-title');
            openLightbox(imageSrc, title);
        });
    });

    function openLightbox(imageSrc, title) {
       
        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.classList.add('lightboxOverlay');
        document.body.appendChild(lightboxOverlay);

       
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
            <img src="${imageSrc}" class="lb-image">
            <div class="lb-caption">${title}</div>
            <button class="lb-close">✕</button>
            <button class="lb-prev">❮</button>
            <button class="lb-next">❯</button>
        `;
        document.body.appendChild(lightbox);

        lightbox.querySelector('.lb-close').addEventListener('click', function () {
            closeLightbox(lightbox, lightboxOverlay);
        });

        lightbox.querySelector('.lb-next').addEventListener('click', function () {
            navigateImage(1);
        });
        lightbox.querySelector('.lb-prev').addEventListener('click', function () {
            navigateImage(-1);
        });

        lightboxOverlay.addEventListener('click', function () {
            closeLightbox(lightbox, lightboxOverlay);
        });


        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeLightbox(lightbox, lightboxOverlay);
            }
        });
    }

    function closeLightbox(lightbox, lightboxOverlay) {
        document.body.removeChild(lightbox);
        document.body.removeChild(lightboxOverlay);
    }

    function navigateImage(direction) {
        currentImageIndex = (currentImageIndex + direction + gallery.length) % gallery.length;
        const newImageSrc = gallery[currentImageIndex].href;
        const newTitle = gallery[currentImageIndex].getAttribute('data-title');
        const lightboxImage = document.querySelector('.lightbox .lb-image');
        const lightboxCaption = document.querySelector('.lightbox .lb-caption');

        lightboxImage.src = newImageSrc;
        lightboxCaption.textContent = newTitle;
    }
});
