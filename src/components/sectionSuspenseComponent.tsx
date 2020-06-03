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
        <h2>_______</h2>
      </div>
    </div>
  );
};

export default SectionSuspenseComponent;
