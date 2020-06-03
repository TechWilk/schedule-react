import React, { FunctionComponent, Suspense } from 'react'
import { useApiPreloadQueryPromise } from "../api/hooks";
import SegmentComponent from './segmentComponent';
import SegmentSuspenseComponent from './segmentSuspenseComponent';
import createStyles from '../styles';

type JsonApiRelationship = {
    id: string
    type: string
}

const styles = createStyles({
  card: {
    border: "1px solid green",
  },
  cardBody: {},
  cardTitle: {
    color: "blue",
  },
});

const SectionComponent: FunctionComponent<{ eventId: string, sectionId: number }> = ({ eventId, sectionId }) => {

  const {
    id,
    attributes: { name },
    relationships: { segments },
  } = useApiPreloadQueryPromise("section" + sectionId, () =>
    fetch("http://localhost:8000/api/events/" + eventId + "/sections/" + sectionId)
  );
  
  var segmentIds = segments.data.map((value: JsonApiRelationship) => value.id);

  return (
    <div>
      <div className={styles('card')}>
        <h2>Section</h2>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
        </div>
        {segmentIds.map((segmentId: number) => (
          <Suspense fallback={<SegmentSuspenseComponent />}>
            <SegmentComponent
              key={segmentId}
              eventId={eventId}
              sectionId={sectionId}
              segmentId={segmentId}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
}

export default SectionComponent