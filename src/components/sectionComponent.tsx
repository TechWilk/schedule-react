import React, { useState, useEffect, FunctionComponent } from 'react'

type SectionData = {
    id: string
    name: string
}

const SectionComponent: FunctionComponent<{ eventId: string, sectionId: string }> = ({ eventId, sectionId }) => {

    const initial: SectionData = {
        id: '',
        name: '',
    };

    const [section, setSection] = useState(initial);

    useEffect(() => {
        fetch('http://localhost:8000/api/sections/' + sectionId)
            .then(res => res.json())
            .then((data) => {
                setSection({ id: data.id, name: data.attributes.name })
            })
            .catch(console.log)
    }, [sectionId])

    return (
        <div>
            <h1>Section</h1>
            <div className="card" >
                <div className="card-body" >
                    <h5 className="card-title">{section.id}</h5>
                    <h5 className="card-title">{section.name}</h5>
                </div>
            </div>
        </div>
    )
}

export default SectionComponent