import React, { useState, useEffect, FunctionComponent } from 'react'

type EventData = {
    id: string
    name: string
}

const EventComponent: FunctionComponent<{ eventId: string }> = ({ eventId }) => {

    const initial: EventData = {
        id: '',
        name: '',
    };

    const [event, setEvent] = useState(initial);

    useEffect(() => {
        fetch('http://localhost:8000/api/events/'+eventId)
            .then(res => res.json())
            .then((data) => {
                setEvent({ id: data.id, name: data.attributes.name })
            })
            .catch(console.log)
    }, [eventId])

    return (
        <div>
        <h1>Event</h1>
        <div className="card" >
            <div className="card-body" >
                <h5 className="card-title">{event.id}</h5>
            <h5 className="card-title">{event.name}</h5>
                </div>
            </div>
        </div>
    )
}

export default EventComponent