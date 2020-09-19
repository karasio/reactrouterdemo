import React, {useState, useRef} from 'react';
import axios from 'axios';

const Add = ({events, setEvents}) => {

  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const textInput = useRef(null);

  const addEvent = (event) => {
    event.preventDefault();

    if (nameError() || locationError() || startError() || endError()) {
      setError(true);
      setSuccess(false);
    } else {
      let tempEvent = {
        name: capitalize(eventName),
        location: capitalize(eventLocation),
        dateStart: fixDates(eventStart),
        dateEnd: fixDates(eventEnd),
        id: events.length + 1
      };

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
      });
      setSuccess(true);
      setError(false);
      textInput.current.focus();
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
  };

  const nameError = () => {
    return eventName.trim() === "" || eventName.length < 5;
  };

  const locationError = () => {
    return eventLocation.trim() === "" || eventLocation.length < 2;
  };

  const startError = () => {
    let date = new Date(eventStart);
    return eventStart === "" || date < Date.now();

  };

  const endError = () => {
    let date = new Date(eventEnd);
    if (new Date(eventStart) > Date.now() && eventEnd === "") {
      setEventEnd(eventStart);
    }
    return eventEnd === "" || date < new Date(eventStart);
  };

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

  const errorStyle = {
    color: "red"
  };

  const successStyle = {
    color: "green"
  };

  return (
    <div className="container">
      <form onSubmit={addEvent}>
        <input
          ref={textInput}
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
      <p style={errorStyle}>{error ? "Tarkista syöte" : ""}</p>
      <p style={successStyle}>{ success ? "Tallennus onnistui" : "" }</p>
    </div>
  );
};

export default Add;
