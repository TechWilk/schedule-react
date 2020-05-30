import React, { Suspense } from "react";
import EventComponent from "./components/eventComponent";
import JsonApiContext from "./JsonApiContext";
import EventSuspenseComponent from "./components/eventSuspenseComponent";
import { useParams } from "react-router-dom";

const Event = () => {
  let { eventId } = useParams();
 
  return (
    <div>
      <h2>Event</h2>
      <Suspense fallback={<EventSuspenseComponent />}>
        <EventComponent eventId={eventId} />
      </Suspense>
    </div>
  );
};

export default Event;
