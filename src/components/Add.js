import React, { useState } from 'react'
import axios from 'axios';

const Add = ({events, setEvents}) => {

  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [newEvent, setNewEvent] = useState({});

  const addEvent = (event) => {
    event.preventDefault();
    let tempEvent = {
      name: capitalize(eventName),
      location: capitalize(eventLocation),
      dateStart: fixDates(eventStart),
      dateEnd: fixDates(eventEnd),
      id: events.length + 1
    };
    setNewEvent(tempEvent);
    if (tempEvent.name !== undefined) {
      console.log(tempEvent);
      setEvents(events.concat(tempEvent));
      setEventName("");
      setEventLocation("");
      setEventStart("");
      setEventEnd("");

      const baseUrl = 'http://localhost:3001/events';
      const request = axios.post(baseUrl, tempEvent);
      request
      .then(response => {
        console.log( response.data);
      })
    }
  };

  const capitalize = (value) => {
    return value.toLowerCase()
    .split(/ /)
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  };

  const fixDates = (string) => {
    let from = string.split("-");
    return `${from[2]}.${from[1]}.${from[0]}`;
  }

  const handleNameChange = (event) => {
    setEventName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setEventLocation(event.target.value);
  };

  const handleStartChange = (event) => {
    setEventStart(event.target.value);
  };

  const handleEndChange = (event) => {
    setEventEnd(event.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={addEvent}>
        <input
          placeholder="Mitä?"
          value={eventName}
          onChange={handleNameChange}
        />
        <input
          placeholder="Missä?"
          value={eventLocation}
          onChange={handleLocationChange}
        />
        <input
          type="date"
          value={eventStart}
          onChange={handleStartChange}
        />
        <input
          type="date"
          value={eventEnd}
          onChange={handleEndChange}
        />
        <br/>
        <button type="submit">Tallenna</button>
      </form>
      <p>{newEvent.name !== undefined ? newEvent.name + " lisätty!" : ""}</p>
    </div>
  );
};

export default Add;
