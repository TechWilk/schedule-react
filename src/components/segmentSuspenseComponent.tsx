import React from "react";
import createStyles from "../styles";

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


const SegmentSuspenseComponent = () => {
  return (
    <div>
      <div className={styles("card")}>
        <h5 className={styles("cardTitle")}>________</h5>
      </div>
    </div>
  );
};

export default SegmentSuspenseComponent;
