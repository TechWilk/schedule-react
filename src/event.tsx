import React, { Suspense } from "react";
import EventComponent from "./components/eventComponent";
import JsonApiContext from "./JsonApiContext";
import EventSuspenseComponent from "./components/eventSuspenseComponent";
import { useParams } from "react-router-dom";
import createStyles from "./styles";

const styles = createStyles({
  wrapper: {
    width: '95%',
    margin: "0 auto",
  },
})

const Event = () => {
  let { eventId } = useParams();
 
  return (
    <div className={styles('wrapper')}>
      <Suspense fallback={<EventSuspenseComponent />}>
        <EventComponent eventId={eventId} />
      </Suspense>
    </div>
  );
};

export default Event;
