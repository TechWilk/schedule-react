import React from "react";
import createStyles from "../styles";

const styles = createStyles({
  card: {
    border: "1px solid green",
  },
  cardBody: {},
  cardTitle: {
    color: "blue",
  },
});

const SectionSuspenseComponent = () => {
  return (
    <div>
      <div className={styles("card")}>
        <h2>Section</h2>
        <div className="card-body">
          <h5 className="card-title">_______</h5>
        </div>
      </div>
    </div>
  );
};

export default SectionSuspenseComponent;
