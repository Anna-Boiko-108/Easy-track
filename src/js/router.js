import { renderTemplate } from "./main.js";
import routes from "./routes.js";

document.addEventListener("DOMContentLoaded", handleUrlChange);
window.addEventListener("hashchange", handleUrlChange);

function handleUrlChange() {
  const path = window.location.hash.slice(1);

  const pathArray = path.split("/");

  let route;

  // Find apropriate route in routes
  if (pathArray.length == 0) {
    route = routes.find(route => {
      return route.href == path;
    });
  } else {
    // Find multiple routes
    let routeIndex = routes.findIndex(route => {
      return route.href == pathArray[0];
    });
    // Save an array of multiple routes except the first main route
    routes[routeIndex].args = pathArray.slice(1);
    route = routes[routeIndex];
  }

  renderTemplate(route);
}
