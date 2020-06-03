import React from "react";
import createStyles from "../styles";

const styles = createStyles({
  card: {
    background: "#bbb",
  },
  cardBody: {},
  cardTitle: {
    color: "blue",
  },
});


const SegmentSuspenseComponent = () => {
  return (
    <div>
      <div className={styles('card')}>
        <h3>Segment</h3>
        <div className="card-body">
          <h5 className="card-title">_______</h5>
        </div>
      </div>
    </div>
  );
};

export default SegmentSuspenseComponent;
