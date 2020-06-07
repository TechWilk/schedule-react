import React, { FunctionComponent, Suspense, useState } from "react";
import SectionComponent from "./sectionComponent";
import SectionSuspenseComponent from "./sectionSuspenseComponent";
import { useApiPreloadQueryPromise } from "./../api/hooks";
import createStyles from "../styles";
import Moment from "react-moment";

type JsonApiRelationship = {
    id: number
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
    attributes: { name, startTime },
    relationships: { sections },
  }: {
    id: string;
    attributes: { name: string; startTime: string };
      relationships: { sections: any };
  } = useApiPreloadQueryPromise("event" + eventId, () =>
    fetch("http://localhost:8000/api/events/" + eventId)
  );

  // add event to recently visited
  var localStorage = window.localStorage;
  var jsonString = localStorage.getItem("recentlyVisitedEvents") ?? '{}';
  var recentlyVisitedEvents = JSON.parse(jsonString);
  recentlyVisitedEvents[eventId] = eventId;
  localStorage.setItem("recentlyVisitedEvents", JSON.stringify(recentlyVisitedEvents));

  // event duration
  const initial: { [key: number]: number } = {};
  const [durations, setDurations] = useState(initial);

  const updateDuration = (childId: number, childDuration: number) => {
    setDurations({
      ...durations,
      [childId]: childDuration,
    });
  };

  const totalDuration = (duration: { [key: number]: number }) => {
    return Object.values(duration).reduce(
      (total: number, individual: number) => total + individual,
      0
    );
  };

  // sections
  var sectionIds: {id: number, startTime: number}[] = sections.data.map(
     ((durationSum: number) => (value: JsonApiRelationship) => {
       return {
         id: value.id,
         startTime: durationSum,
         endTime: durationSum += durations[value.id],
       };
     })(0)
   );

  return (
    <div>
      <h1>{name}</h1>
      <div>
        <div>
          Remaining: {totalDuration(durations)} (
          <Moment unix duration={1}>
            {totalDuration(durations)}
          </Moment>
          )
        </div>
        <div>
          Time:
          <Moment format="DD/MM/YYYY HH:mm:ss">
            {startTime}
          </Moment>
        </div>
      </div>
      <div className={styles("card")}>
        {sectionIds.map(({ id, startTime }) => (
          <Suspense key={id} fallback={<SectionSuspenseComponent />}>
            <SectionComponent
              eventId={eventId}
              sectionId={id}
              startTime={startTime}
              updateEventDuration={updateDuration}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default EventComponent;
