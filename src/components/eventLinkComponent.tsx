import React, { FunctionComponent } from "react";
import { useApiPreloadQueryPromise } from "./../api/hooks";
import createStyles from "../styles";
import { Link } from "react-router-dom";

type JsonApiRelationship = {
  id: string;
  type: string;
};

const styles = createStyles({
  card: {
    width: "10em",
    background: "red",
  },
  cardBody: {},
  cardTitle: {
    fontSize: "2em",
  },
});

const EventLinkComponent: FunctionComponent<{ eventId: string }> = ({
  eventId,
}) => {
  const {
    id,
    attributes: { name },
    relationships: { sections },
  } = useApiPreloadQueryPromise("event" + eventId, () =>
    fetch("http://localhost:8000/api/events/" + eventId)
  );

  return <Link to={"/events/" + id}>{name}</Link>;
};

export default EventLinkComponent;
