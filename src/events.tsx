import React, { Suspense } from "react";
import Event from "./event";
import EventLinkComponent from "./components/eventLinkComponent"
import {
  Switch,
  Route,
  useRouteMatch,
  Link,
} from "react-router-dom";
import EventLinkSuspenseComponent from "./components/eventLinkSuspenseComponent";

const Events = () => {
  let match = useRouteMatch();

  var jsonString = localStorage.getItem("recentlyVisitedEvents") ?? "{}";
  var recentlyVisitedEvents: string[] = Object.values(JSON.parse(jsonString));
 
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
          <ul>
            <Suspense fallback={<EventLinkSuspenseComponent />}>
              {recentlyVisitedEvents.map((eventId) => (
                <li key={eventId}>
                  <EventLinkComponent eventId={eventId} />
                </li>
              ))}
            </Suspense>
          </ul>
        </Route>
      </Switch>
    </div>
  );
};

export default Events;
