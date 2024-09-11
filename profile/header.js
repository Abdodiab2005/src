function loadHeader(path) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", path, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      document
        .querySelector("body")
        .insertAdjacentHTML("afterbegin", xhr.responseText);
    }
  };
  xhr.send();
}

// Preload header before DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  loadHeader("../components/header_footer.html");
  loadHeader("../components/aside.html");
});
