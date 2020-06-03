import React, { useState, useEffect, FunctionComponent } from "react";
import SectionComponent from "./sectionComponent";
import { useApiPreloadQuery, useApiPreloadQueryPromise } from "./../api/hooks";

import createStyles from "../styles";

const [styles, resolver] = createStyles({
  card: {
    width: '10em',
    background: 'red',
  },
  cardBody: {
  },
  cardTitle: {
    fontSize: '2em',
  },
});

const EventComponent: FunctionComponent<{ eventId: string }> = ({
  eventId,
}) => {
  const {
    id,
    attributes: { name },
  } = useApiPreloadQueryPromise("event" + eventId, () =>
    fetch("http://localhost:8000/api/events/" + eventId)
  );

  var localStorage = window.localStorage;
  var jsonString = localStorage.getItem("recentlyVisitedEvents") ?? '{}';
  var recentlyVisitedEvents = JSON.parse(jsonString);
  recentlyVisitedEvents[eventId] = eventId;
  localStorage.setItem("recentlyVisitedEvents", JSON.stringify(recentlyVisitedEvents));

  return (
    <div>
      <h1>Event: {name}</h1>
      <div className={styles("card")}>
        <div className={styles("cardBody")}>
          <h5 className={styles("cardTitle")}>{name}</h5>
        </div>
        </div>
      </div>
      <div className="card">{/* <SectionComponent /> */}</div>
    </div>
  );
};

export default EventComponent;
