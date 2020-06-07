import React, { FunctionComponent, Suspense, useState } from "react";
import SectionComponent from "./sectionComponent";
import SectionSuspenseComponent from "./sectionSuspenseComponent";
import { useApiPreloadQueryPromise } from "./../api/hooks";
import createStyles from "../styles";
import Moment from "react-moment";

type JsonApiRelationship = {
    id: string
    type: string
}

const styles = createStyles({
  card: {
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
    relationships: { sections },
  } = useApiPreloadQueryPromise("event" + eventId, () =>
    fetch("http://localhost:8000/api/events/" + eventId)
  );
  
  var sectionIds = sections.data.map((value: JsonApiRelationship) => value.id);

  // add event to recently visited
  var localStorage = window.localStorage;
  var jsonString = localStorage.getItem("recentlyVisitedEvents") ?? '{}';
  var recentlyVisitedEvents = JSON.parse(jsonString);
  recentlyVisitedEvents[eventId] = eventId;
  localStorage.setItem("recentlyVisitedEvents", JSON.stringify(recentlyVisitedEvents));

  // event duration
  const initial: { [key: number]: number } = {};
  const [duration, setDuration] = useState(initial);

  const updateDuration = (childId: number, childDuration: number) => {
    setDuration({
      ...duration,
      [childId]: childDuration,
    });
  };

  const totalDuration = (duration: { [key: number]: number }) => {
    return Object.values(duration).reduce(
      (total: number, individual: number) => total + individual,
      0
    );
  };
  
  return (
    <div>
      <h1>{name}</h1>
      <div>
        <div>
          Remaining: {totalDuration(duration)} (
          <Moment unix duration={1}>
            {totalDuration(duration)}
          </Moment>
          )
        </div>
        <div>Time:</div>
      </div>
      <div className={styles("card")}>
        {sectionIds.map((sectionId: number) => (
          <Suspense key={sectionId} fallback={<SectionSuspenseComponent />}>
            <SectionComponent
              eventId={eventId}
              sectionId={sectionId}
              updateEventDuration={updateDuration}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default EventComponent;
