document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("carousel");
    const btnLeft = document.getElementById("btn-left");
    const btnRight = document.getElementById("btn-right");
  
    const visibleCards = 3;
    const totalCards = carousel.children.length;
    let currentIndex = 0;
  
    function updateCarousel() {
      const cardWidth = carousel.children[0].getBoundingClientRect().width;
      const offset = currentIndex * cardWidth;
      carousel.style.transform = `translateX(-${offset}px)`;
    }
  
    btnRight.addEventListener("click", () => {
      if (currentIndex + visibleCards < totalCards) {
        currentIndex += visibleCards;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    });
  
    btnLeft.addEventListener("click", () => {
      if (currentIndex - visibleCards >= 0) {
        currentIndex -= visibleCards;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    });
  
    // Atualiza se redimensionar a tela
    window.addEventListener("resize", updateCarousel);
  });
  