import React, { Suspense } from 'react';
import EventComponent from './components/eventComponent';
import JsonApiContext from './JsonApiContext';
import EventSuspenseComponent from './components/eventSuspenseComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Home from './home';
import Events from "./events";

function App() {

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>
            <Link to="/about">About</Link>
          </li> */}
          <li>
            <Link to="/events">Events</Link>
          </li>
        </ul>

        <Switch>
          {/* <Route path="/about">
            <About />
          </Route> */}
          <Route path="/events">
            <Events />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
