import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Header from "./Header";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact={true} component={StreamList} />
            <Route path="/streams/new" exact={true} component={StreamCreate} />
            <Route
              path="/streams/edit/:streamId"
              exact={true}
              component={StreamEdit}
            />
            <Route
              path="/streams/delete/:streamId"
              exact={true}
              component={StreamDelete}
            />
            <Route
              path="/streams/:streamId"
              exact={true}
              component={StreamShow}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
