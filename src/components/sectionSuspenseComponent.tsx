import React from "react";
import createStyles from "../styles";

const styles = createStyles({
  card: {
    marginTop: "35px",
  },
  cardBody: {},
  cardTitle: {
    // color: "blue",
  },
});

const SectionSuspenseComponent = () => {
  return (
    <div>
      <div className={styles("card")}>
        <h2>________</h2>
      </div>
    </div>
  );
};

export default SectionSuspenseComponent;
