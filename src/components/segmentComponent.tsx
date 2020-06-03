import React, { FunctionComponent, Suspense } from 'react'
import { useApiPreloadQueryPromise } from "../api/hooks";
import createStyles from "../styles";

type JsonApiRelationship = {
    id: string
    type: string
}

const styles = createStyles({
  card: {
    background: "#bbb",
  },
  cardBody: {},
  cardTitle: {
    color: "blue",
  },
});

const SegmentComponent: FunctionComponent<{
  eventId: string;
  sectionId: number;
  segmentId: number;
}> = ({ eventId, sectionId, segmentId }) => {
  const {
    id,
    attributes: { name },
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

  return (
    <div>
      <div className={styles('card')}>
        <h3>Segment</h3>
        <div className="card-body">
          <h5 className={styles('cardTitle')}>{name}</h5>
        </div>
      </div>
    </div>
  );
};

export default SegmentComponent