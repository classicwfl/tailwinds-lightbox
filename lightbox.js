function initializeLightbox() {
    const images = document.querySelectorAll(".markdownContainer p img"); //Change to whatever selector is needed for images

    // Create lightbox
    const lightboxOverlay = document.createElement("div");
    lightboxOverlay.id = "lightbox-overlay";
    lightboxOverlay.className =
        "fixed inset-0 bg-black bg-opacity-90 z-50 hidden items-center justify-center p-8 pt-16"; // Adjust pt-16 as-needed for a sticky header

    const lightboxContent = document.createElement("div");
    lightboxContent.className =
        "relative max-w-full max-h-full flex items-center justify-center";

    const lightboxImage = document.createElement("img");
    lightboxImage.id = "lightbox-image";
    lightboxImage.className =
        "max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"; // Adjust max-h as-needed
    
     // Depending on typography settings you may need to adjust the TW classes on the innerHTML; those are marked with a comment that reads "Typography-adjustable".

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "<span class='leading-none mt-[-10%]'>×</span>"; //Typography-adjustable
    closeButton.className =
        "absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer";
    closeButton.setAttribute("aria-label", "Close lightbox");

    const prevButton = document.createElement("button");
    prevButton.innerHTML = "<span class='leading-none mt-[-10%]'>‹</span>"; //Typography-adjustable
    prevButton.className =
        "absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-light hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer";
    prevButton.setAttribute("aria-label", "Previous image");

    const nextButton = document.createElement("button");
    nextButton.innerHTML = "<span class='leading-none mt-[-10%]'>›</span>"; //Typography-adjustable
    nextButton.className =
        "absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-light hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer";
    nextButton.setAttribute("aria-label", "Next image");

    //Put all the shit together
    lightboxContent.appendChild(lightboxImage);
    lightboxContent.appendChild(closeButton);
    lightboxContent.appendChild(prevButton);
    lightboxContent.appendChild(nextButton);
    lightboxOverlay.appendChild(lightboxContent);
    document.body.appendChild(lightboxOverlay);

    let currentImageIndex = 0;
    const imageArray = Array.from(images);

    //Functions to open/close etc LB
    function openLightbox(index) {
        currentImageIndex = index;
        const img = imageArray[currentImageIndex];
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt || "An image inside a lightbox";
        lightboxOverlay.classList.remove("hidden");
        lightboxOverlay.classList.add("flex");
        document.body.style.overflow = "hidden";

        // Show/hide navigation buttons based on position in index
        prevButton.style.display = currentImageIndex === 0 ? "none" : "flex";
        nextButton.style.display =
            currentImageIndex === imageArray.length - 1 ? "none" : "flex";
    }

    function closeLightbox() {
        lightboxOverlay.classList.add("hidden");
        lightboxOverlay.classList.remove("flex");
        document.body.style.overflow = "auto";
    }

    function prevImage() {
        if (currentImageIndex > 0) {
            openLightbox(currentImageIndex - 1);
        }
    }

    function nextImage() {
        if (currentImageIndex < imageArray.length - 1) {
            openLightbox(currentImageIndex + 1);
        }
    }

    // Wrapping all images in triggers to open LB
    images.forEach((img, index) => {
        const anchor = document.createElement("a");
        anchor.href = "#";
        anchor.className =
            "inline-block cursor-pointer transition-opacity duration-200 hover:opacity-80";
        anchor.setAttribute(
            "aria-label",
            `Open image ${index + 1} in lightbox`
        );

        img.parentNode.insertBefore(anchor, img);
        anchor.appendChild(img);

        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });

    // Event listeners for LB controls
    closeButton.addEventListener("click", closeLightbox);
    prevButton.addEventListener("click", prevImage);
    nextButton.addEventListener("click", nextImage);

    lightboxOverlay.addEventListener("click", (e) => {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });

    // Keyboard navigation is a good thing
    document.addEventListener("keydown", (e) => {
        if (!lightboxOverlay.classList.contains("hidden")) {
            switch (e.key) {
                case "Escape":
                    closeLightbox();
                    break;
                case "ArrowLeft":
                    prevImage();
                    break;
                case "ArrowRight":
                    nextImage();
                    break;
            }
        }
    });
}

// init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLightbox);
    console.log('lightbox loaded');
} else {
    initializeLightbox();
}