import React, { useState, useEffect, FunctionComponent } from "react";
import SectionComponent from "./sectionComponent";
import { useApiPreloadQuery, useApiPreloadQueryPromise } from "./../api/hooks";

type EventData = {
  id: string;
  name: string;
};

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
  var jsonString = localStorage.getItem("recentlyVisitedEvents") ?? '';
  var recentlyVisitedEvents = JSON.parse(jsonString);
  recentlyVisitedEvents[eventId] = eventId;
  localStorage.setItem("recentlyVisitedEvents", JSON.stringify(recentlyVisitedEvents));


  return (
    <div>
      <h1>Event: {name}</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
        </div>
      </div>
      <div className="card">{/* <SectionComponent /> */}</div>
    </div>
  );
};

export default EventComponent;
