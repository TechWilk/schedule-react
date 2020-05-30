import React from "react";
import Event from "./event";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import EventComponent from "./components/eventComponent";

const Events = () => {
  let match = useRouteMatch();

  var jsonString = localStorage.getItem("recentlyVisitedEvents") ?? "";
  var recentlyVisitedEvents = JSON.parse(jsonString);
 
  return (
    <div>
      <h2>Events</h2>

      <Switch>
        <Route path={`${match.path}/:eventId`}>
          <Event />
        </Route>
        <Route path={match.path}>
          <h3>
            Please select an event you recently visited on this device, or click
            on a direct link.
          </h3>
          {/* {recentlyVisitedEvents.map((eventId: string) => (
            <Link to={match.path + eventId} />
          ))} */}
        </Route>
      </Switch>
    </div>
  );
};

export default Events;
