import React, { Suspense } from 'react';
import EventComponent from './components/eventComponent';
import JsonApiContext from './JsonApiContext';
import EventSuspenseComponent from './components/eventSuspenseComponent';

function App() {

  const eventId = 'kD6Y7cDXBm1HB8KdHfDClNiLl5IaTfzERGHbf0Ddqyv1RcjW765QmGgZY0VEFIXEv24EFZR0fbGgGen6FASVbPckfYGdGXtLLgQkS2xUKQGeNR8K8RbAxdhHXm0GAcfe';

  return (
    <JsonApiContext.Provider value={{
      baseUri: "https://localhost:8080/api",
    }}>
      <Suspense fallback={<EventSuspenseComponent />}>
        <EventComponent eventId={eventId} />
      </Suspense>
    </JsonApiContext.Provider>
  );
}

export default App;
