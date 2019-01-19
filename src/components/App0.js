import App from "../App";
import GoogleMap from "./Mapd";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import createStore from "../store";

const store = createStore();
const App0 = props => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={"/googlemap"} component={GoogleMap} />
        <Route path={"/"} component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>
)
export default App0;
