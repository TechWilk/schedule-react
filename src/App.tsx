import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Home from './home';
import Events from "./events";
import createStyles from './styles';

const styles = createStyles({
  navigation: {
    backgroundColor: "#ccc"
  },
  horizontalList: {
    listSstyleType: "none",
  },
  menuItem: {
    display: 'inline-block',
    padding: "8px",
  },
})

function App() {

  return (
    <Router>
      <div>
        <nav className={styles("navigation")}>
          <ul className={styles("horizontalList")}>
            <li className={styles("menuItem")}>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <Link to="/about">About</Link>
            </li> */}
            <li className={styles("menuItem")}>
              <Link to="/events">Events</Link>
            </li>
          </ul>
        </nav>

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
