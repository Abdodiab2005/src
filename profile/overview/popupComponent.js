const popupOrder = {
  popup: `<!-- popup structure -->

 
`,
};
function loadPage(page) {
  const content =
    popup[page] ||
    "<div><h1>Error</h1><p>The page you are looking for does not exist.</p></div>";
  document.getElementById("popup").innerHTML = DOMPurify.sanitize(content);
}
loadPage("popup");
