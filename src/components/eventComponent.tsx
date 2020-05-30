import React, { useState, useEffect, FunctionComponent } from 'react'
import SectionComponent from './sectionComponent'
import { useApiPreloadQuery, useApiPreloadQueryPromise } from './../api/hooks'

type EventData = {
    id: string
    name: string
}

const EventComponent: FunctionComponent<{ eventId: string }> = ({ eventId }) => {

  //const a = use
  const initial: EventData = {
      id: '',
      name: '',
  };

  const [event, setEvent] = useState(initial);

  // var thing = useApiPreloadQuery({
  //   fields: [],
  //   resource: '',
  // })

  var thing = useApiPreloadQueryPromise('event'+eventId, () => fetch('http://localhost:8000/api/events/' + eventId))
  var data = thing.json()
  console.log(data)
  setEvent({ id: data.id, name: data.attributes.name })

  return (
      <div>
          <h1>Event</h1>
          <div className="card">
              <div className="card-body">
                  <h5 className="card-title">{event.id}</h5>
                  <h5 className="card-title">{event.name}</h5>
              </div>
          </div>
          <div className="card">
              {/* <SectionComponent /> */}
          </div>
      </div>
  )
}

export default EventComponent
