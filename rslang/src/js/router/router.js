import GetData from '../GetData';
import {
  setHeadDataToDom, setBodyDataToDom, renderLoadingIcon, setIsLoaded,
} from './router.utils';
import '../../assets/scss/iconLoading.scss';

export default class Router {
  constructor(routes) {
    this.routes = routes;
    this.loadInitialRoute();
  }

  async loadRoute(...urlSegments) {
    console.log(urlSegments);
    const matchedRoute = this.matchUrlToRoute(urlSegments);
    console.log(matchedRoute);
    const url = `/${urlSegments.join('/')}`;
    window.history.pushState({}, '', url);

    // Append the given template to the DOM inside the router outlet.
    // const routerOutletElement = document.querySelectorAll(
    //   '[data-router-outlet]',
    // )[0];
    // routerOutletElement.innerHTML = matchedRoute.template(
    //   matchedRoute.params,
    // );
    const parseHtml = new GetData(matchedRoute.template, 'get');
    await parseHtml.sendRequest()
      .then((response) => response.data)
      .then((html) => {
        console.log(html);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        setHeadDataToDom(doc.head);
        setBodyDataToDom(doc.body);
        console.log(doc);
      })
      .catch((err) => {
        console.warn('Something went wrong.', err);
      })
      .then(() => renderLoadingIcon(false));
  }

  matchUrlToRoute(urlSegments) {
    const routeParams = {};
    const matchedRoute = this.routes.find((route) => {
      const routePathSegments = route.path.split('/').slice(1);
      if (routePathSegments.length !== urlSegments.length) {
        return false;
      }
      const match = routePathSegments.every((routePathSegment, i) => (
        routePathSegment === urlSegments[i] || routePathSegment[0] === ':'
      ));

      if (match) {
        routePathSegments.forEach((segment, i) => {
          if (segment[0] === ':') {
            const propName = segment.slice(1);
            routeParams[propName] = decodeURIComponent(urlSegments[i]);
          }
        });
      }
      return match;
    });

    return { ...matchedRoute, params: routeParams };
  }

  loadInitialRoute() {
    renderLoadingIcon(true);
    setIsLoaded(false);
    const pathnameSplit = window.location.pathname.split('/');
    const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';
    this.loadRoute(...pathSegments);
  }
}
