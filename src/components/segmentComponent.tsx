import React, { FunctionComponent, Suspense, useEffect, useRef } from 'react'
import { useApiPreloadQueryPromise } from "../api/hooks";
import createStyles from "../styles";
import Moment from 'react-moment'

type JsonApiRelationship = {
    id: string
    type: string
}

const styles = createStyles({
  card: {
    border: "2px solid #bbb",
    margin: "5px 0",
    padding: "5px",
  },
  cardBody: {},
  cardTitle: {
    // color: "blue",
  },
});

const SegmentComponent: FunctionComponent<{
  eventId: string;
  sectionId: number;
  segmentId: number;
  updateSectionDuration: any;
}> = ({ eventId, sectionId, segmentId, updateSectionDuration }) => {
  const {
    id,
    attributes: { name, duration, durationIsEstimated },
  } = useApiPreloadQueryPromise("segment" + segmentId, () =>
    fetch(
      "http://localhost:8000/api/events/" +
        eventId +
        "/sections/" +
        sectionId +
        "/segments/" +
        segmentId
    )
    );
  
  useEffect(() => {
    updateSectionDuration(segmentId, duration);

  }, [duration]);

  const previousDurationRef = useRef();
  useEffect(() => {
    previousDurationRef.current = duration;
  })
  const previousDuration = previousDurationRef.current ?? 0;

  return (
    <div>
      <div className={styles("card")}>
        <h5 className={styles("cardTitle")}>{name}</h5>
        <p>{duration}</p>
        <Moment unix duration={1}>
          {duration}
        </Moment>
        <p>{durationIsEstimated ? "blue" : "red"}</p>
      </div>
    </div>
  );
};

export default SegmentComponent