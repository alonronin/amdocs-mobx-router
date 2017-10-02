import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { generate } from 'shortid';
import DocumentTitle from 'react-document-title';

import { history } from './history';
import routes from './routes';

@observer
class App extends Component {
  render() {
    const { pathname, Page } = this.props.store;

    return <DocumentTitle title={Page.title}>
      <div>
        <h1>App</h1>

        <p>{pathname}</p>

        <ul>
          {routes.map(
            ({ title, path }) => <li key={generate()}>
              <a
                href={path}
                onClick={(e) => {
                  e.preventDefault();
                  history.push(path);
                }}
              >{title}</a>
            </li>)}
        </ul>
        <Page.component title={Page.title} />
      </div>
    </DocumentTitle>;
  }
}

export default observer(App);
