import React, { FunctionComponent, Suspense, useState, useEffect, useRef } from 'react'
import { useApiPreloadQueryPromise } from "../api/hooks";
import SegmentComponent from './segmentComponent';
import SegmentSuspenseComponent from './segmentSuspenseComponent';
import createStyles from '../styles';
import Moment from 'react-moment';

type JsonApiRelationship = {
    id: string
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
  updateEventDuration: any;
}> = ({ eventId, sectionId, updateEventDuration }) => {
  const {
    id,
    attributes: { name },
    relationships: { segments },
  } = useApiPreloadQueryPromise("section" + sectionId, () =>
    fetch(
      "http://localhost:8000/api/events/" + eventId + "/sections/" + sectionId
    )
  );

  var segmentIds = segments.data.map((value: JsonApiRelationship) => value.id);

  // section duration
  const initial: {[key: number]: number} = {}
  const [duration, setDuration] = useState(initial);

  const updateDuration = (
    childId: number,
    childDuration: number
  ) => {
    duration[childId] = childDuration;
    setDuration(duration);
  };

  const totalDuration = (duration: { [key: number]: number }) => {
    return Object.values(duration).reduce(
      (total: number, individual: number) => total + individual,
      0
    );
  };

  return (
    <div>
      <div className={styles("card")}>
        <h2>
          {name}(
          {/* <Moment unix duration={1}>
            {Object.values(duration).reduce((total: number, individual: number) => total + individual), 0)}
          </Moment> */}
          )
        </h2>
        <p>{totalDuration(duration)}</p>
        {segmentIds.length ? (
          segmentIds.map((segmentId: number) => (
            <Suspense key={segmentId} fallback={<SegmentSuspenseComponent />}>
              <SegmentComponent
                eventId={eventId}
                sectionId={sectionId}
                segmentId={segmentId}
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