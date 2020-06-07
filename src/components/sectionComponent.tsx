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
    marginTop: "35px",
  },
  cardBody: {},
  cardTitle: {
    // color: "blue",
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
      <div className={styles("card")}>
        {segmentIds.length ? (
          segmentIds.map((segmentId: number) => (
          <Suspense key={segmentId} fallback={<SegmentSuspenseComponent />}>
            <SegmentComponent
              eventId={eventId}
              sectionId={sectionId}
              segmentId={segmentId}
            />
          </Suspense>
          ))
        ) : (
          <p>No segments</p>
        )}
      </div>
    </div>
  );
}

export default SectionComponent