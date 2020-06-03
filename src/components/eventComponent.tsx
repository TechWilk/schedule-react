import React, { FunctionComponent, Suspense } from "react";
import SectionComponent from "./sectionComponent";
import SectionSuspenseComponent from "./sectionSuspenseComponent";
import { useApiPreloadQueryPromise } from "./../api/hooks";
import createStyles from "../styles";

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

  return (
    <div>
      <h1>{name}</h1>
      <div>
        <div>Remaining:</div>
        <div>Time:</div>
      </div>
      <div className={styles("card")}>
        {sectionIds.map((sectionId: number) => (
          <Suspense key={sectionId} fallback={<SectionSuspenseComponent />}>
            <SectionComponent eventId={eventId} sectionId={sectionId} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default EventComponent;
