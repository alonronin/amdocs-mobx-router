import { observable, action, computed } from 'mobx';
import routes from './routes';

class AppStore {
  @observable title = 'App';
  @observable pathname = null;

  @action setState = ({
    title = this.title,
    pathname = this.pathname,
  } = {}) => {
    this.title = title;
    this.pathname = pathname;
  };

  @computed
  get Page() {
    return routes.find(item => item.path === this.pathname);
  }
}

export default new AppStore();
