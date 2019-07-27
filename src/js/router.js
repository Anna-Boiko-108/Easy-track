import { renderTemplate } from "./main.js";
import routes from "./routes.js";

document.addEventListener("DOMContentLoaded", handleUrlChange);
window.addEventListener("hashchange", handleUrlChange);

function handleUrlChange() {
  const path = window.location.hash.slice(1);
  const route = routes.find(route => {
    return route.href == path;
  });

  renderTemplate(route.name);
}
