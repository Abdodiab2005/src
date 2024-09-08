const pages = {
  overView: {
    html: ``,
    js: "./dist/bundledScript.js",
  },
  Orders: {
    html: ``,
    js: "./dist/ordersBundled.js",
  },
  wishList: ``,
  addresses: ``,
  accountSecurity: ``,
  settings: ``,
  support: ``,
};

// Initialize the first page load
document.addEventListener("DOMContentLoaded", function () {
  function loadPage(page) {
    console.log(`Loading page: ${page}`);
    const content =
      pages[page]?.html ||
      "<div><h1>Page not found</h1><p>The page you are looking for does not exist.</p></div>";
    const mainContainer = document.getElementById("main");

    if (mainContainer) {
      // Clear existing content
      mainContainer.innerHTML = "";

      // Insert new content
      mainContainer.innerHTML = DOMPurify.sanitize(content);

      // Dynamically load JavaScript file
      const scriptSrc = pages[page]?.js;
      if (scriptSrc) {
        loadScript(scriptSrc)
          .then(() => {
            console.log(`Script loaded for ${page}`);
          })
          .catch((err) => {
            console.error(err);
          });
      }

      console.log("Page loaded");
    } else {
      console.error("Main container not found.");
    }
  }

  function checkHashURL() {
    if (location.hash.split("#")[1] == "Orders") {
      loadPage("Orders");
    } else if (location.hash.split("#")[1] == "overView") {
      loadPage("overView");
    } else {
      console.log(location.hash);
    }
  }

  checkHashURL();

  const navLinks = document.querySelectorAll(".nav__link");
  navLinks.forEach((nav) => {
    nav.addEventListener("click", (event) => {
      checkHashURL();
      document.querySelectorAll(".nav__item").forEach((item) => {
        item.classList.remove("active");
      });
      nav.parentElement.classList.add("active");
      const hashURL = nav.getAttribute("href").split("#")[1];
      if (hashURL) {
        loadPage(hashURL);
        console.log(hashURL);
      } else {
        console.error("Invalid hashURL.");
      }
    });
  });
  loadScript("./modalCropStructure.js");
  loadScript("./popupComponent.js");
});
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}
