import { renderTemplate } from "./app.js";
import routes from "./routes.js";

export default function initRouter() {
  document.addEventListener("DOMContentLoaded", handleUrlChange);
  window.addEventListener("hashchange", handleUrlChange);
}

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
    // Save an array of multiple routes (args = additional info)
    // except the first main route
    routes[routeIndex].args = pathArray.slice(1);
    route = routes[routeIndex];
  }

  renderTemplate(route);
}

export function redirect(modifier, args) {
  const path = window.location.hash.slice(1);
  const pathArray = path.split("/");

  const modifyPath = {
    openTask: () => {
      pathArray.push("task");
      pathArray.push(args.taskId);
    },
    closeTask: () => {
      pathArray.splice(pathArray.indexOf("task"), 2);
    },
    closeTaskModifyFail: () => {
      pathArray.splice(pathArray.indexOf("task"), 3);
    },
    closeTaskModify: () => {
      pathArray.splice(pathArray.indexOf("modify"), 1);
    },
    openModifyTask: () => {
      pathArray.push("modify");
    },
    sort: () => {
      const isSorted = pathArray.includes("sort");
      if (isSorted) {
        pathArray.splice(pathArray.indexOf("sort") + 1, 1, args.sortCriteria);
      } else {
        pathArray.push("sort");
        pathArray.push(args.sortCriteria);
      }
      modifyPath.page();
    },
    filterAssignees: () => {
      const isFiltered = pathArray.includes("filterAssignees");
      if (isFiltered) {
        pathArray.splice(
          pathArray.indexOf("filterAssignees") + 1,
          1,
          args.filterCriteria
        );
      } else {
        pathArray.push("filterAssignees");
        pathArray.push(args.filterCriteria);
      }
      modifyPath.page();
    },
    filterPriority: () => {
      const isFiltered = pathArray.includes("filterPriority");
      if (isFiltered) {
        pathArray.splice(
          pathArray.indexOf("filterPriority") + 1,
          1,
          args.filterCriteria
        );
      } else {
        pathArray.push("filterPriority");
        pathArray.push(args.filterCriteria);
      }
      modifyPath.page();
    },
    search: () => {
      const isFiltered = pathArray.includes("search");
      if (isFiltered) {
        pathArray.splice(pathArray.indexOf("search") + 1, 1, args.searchText);
      } else {
        pathArray.push("search");
        pathArray.push(args.searchText);
      }
      modifyPath.page();
    },
    page: () => {
      const hasPagination = pathArray.includes("page");
      if (hasPagination) {
        pathArray.splice(pathArray.indexOf("page") + 1, 1, args.pageNumber);
      } else {
        pathArray.push("page");
        pathArray.push(args.pageNumber);
      }
    }
  };

  modifyPath[modifier]();

  const newPath = pathArray.join("/");
  window.location.hash = newPath;
}
