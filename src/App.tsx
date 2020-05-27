import React from 'react';
import EventComponent from './components/eventComponent';

function App() {

  const eventId = 'kD6Y7cDXBm1HB8KdHfDClNiLl5IaTfzERGHbf0Ddqyv1RcjW765QmGgZY0VEFIXEv24EFZR0fbGgGen6FASVbPckfYGdGXtLLgQkS2xUKQGeNR8K8RbAxdhHXm0GAcfe';

  return (
    <EventComponent eventId={eventId} />
  );
}

export default App;
