import React, { FunctionComponent, Suspense, useState, useEffect, useRef } from 'react'
import { useApiPreloadQueryPromise } from "../api/hooks";
import SegmentComponent from './segmentComponent';
import SegmentSuspenseComponent from './segmentSuspenseComponent';
import createStyles from '../styles';
import Moment from 'react-moment';

type JsonApiRelationship = {
    id: number
    type: string
}

const styles = createStyles({
  card: {
    marginTop: "35px",
  },
  cardBody: {},
  cardTitle: {
    // color: "blue",
  },
});

const SectionComponent: FunctionComponent<{
  eventId: string;
  sectionId: number;
  startTime: number;
  updateEventDuration: any;
}> = ({ eventId, sectionId, updateEventDuration, startTime }) => {
  const {
    id,
    attributes: { name },
    relationships: { segments },
  } = useApiPreloadQueryPromise("section" + sectionId, () =>
    fetch(
      "http://localhost:8000/api/events/" + eventId + "/sections/" + sectionId
    )
  );


  // section duration
  const initial: {[key: number]: number} = {}
  const [durations, setDuration] = useState(initial);

  const updateDuration = (
    childId: number,
    childDuration: number
  ) => {
    setDuration({
      ...durations,
      [childId]: childDuration,
    });
  };

  const totalDuration = (durations: { [key: number]: number }) => {
    return Object.values(durations).reduce(
      (total: number, individual: number) => total + individual,
      0
    );
  };

  // event durations
  useEffect(() => {
    updateEventDuration(sectionId, totalDuration(durations));
  }, [durations]);

  // segments
  var segmentIds: { id: number; startTime: number }[] = segments.data.map(
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
      <div className={styles("card")}>
        <h2>
          {name}(
          <Moment unix duration={1}>
            {totalDuration(durations)}
          </Moment>
          )
        </h2>
        <p>{totalDuration(durations)}</p>
        <p>Start Time: {startTime}</p>
        {segmentIds.length ? (
          segmentIds.map(({ id, startTime }) => (
            <Suspense key={id} fallback={<SegmentSuspenseComponent />}>
              <SegmentComponent
                eventId={eventId}
                sectionId={sectionId}
                segmentId={id}
                startTime={startTime}
                updateSectionDuration={updateDuration}
              />
            </Suspense>
          ))
        ) : (
          <p>No segments</p>
        )}
      </div>
    </div>
  );
};

export default SectionComponent