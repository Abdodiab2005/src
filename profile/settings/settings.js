console.log("settings");
addActiveElement("settings");

const icon = $(".btn__icon");
$(".toggle__theme__btn__container").on("click", () => {
  document.body.classList.toggle("darkmode");
  icon.addClass("animated");
  setLocStore("darkmode", document.body.classList.contains("darkmode"));
  if (document.body.classList.contains("darkmode")) {
    icon.removeClass("fa-sun");
    icon.addClass("fa-moon");
    toggleDarkMode();
  } else {
    icon.addClass("fa-sun");
    icon.removeClass("fa-moon");
    toggleDarkMode();
  }
  setTimeout(() => {
    icon.removeClass("animated");
  }, 500);
});

// const darkmode = getLocStore("darkmode");
// if (darkmode == "true") {
//   document.body.classList.add("darkmode");
//   icon.addClass("fa-moon");

//   setTimeout(() => {
//     document.querySelector(".active.nav__item").style.backgroundColor =
//       "var(--dark-color)";
//     document
//       .querySelectorAll(".header__link")
//       .forEach((item) => (item.style.color = "#fff"));
//     document.querySelector(".nav__header").style.backgroundColor =
//       "var(--dark-color)";
//     document.querySelector(".active.nav__item .nav__link").style.color = "#fff";
//   }, 500);
// } else if (darkmode == "false") {
//   document.body.classList.remove("darkmode");
//   icon.addClass("fa-sun");
//   document.querySelector(".active.nav__item").style.backgroundColor = "#fff";
//   document
//     .querySelectorAll(".header__link")
//     .forEach((item) => (item.style.color = "var(--Primary-color)"));
//   document.querySelector(".nav__header").style.backgroundColor = "#fff";
//   document.querySelector(".active.nav__item .nav__link").style.color = "#fff";
// } else {
//   setLocStore("darkmode", false);
//   icon.addClass("fa-sun");
// }
