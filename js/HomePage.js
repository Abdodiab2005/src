new Swiper(".swiper", {
  speed: 400,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  grabCursor: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 3000,
  },
});

const imgs = document.querySelectorAll("img");
imgs.forEach((img) => {
  img.setAttribute("loading", "lazy");
});
