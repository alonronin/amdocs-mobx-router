import createHistory from 'history/createBrowserHistory';
import store from './store';

const history = createHistory();

store.setState({ pathname: history.location.pathname });

// Listen for changes to the current location.
const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  const { pathname, state } = location;
  console.log(action, pathname, state);

  store.setState({ pathname });
});

export {
  history,
  unlisten,
};
