import React from "react";

const Event = ({event}) => {
  return(
      <tr>
        <td>{event.name}</td>
        <td>{event.location}</td>
        <td>{event.dateEnd !== event.dateStart ? event.dateStart + ' - ' + event.dateEnd : event.dateStart}</td>
      </tr>
  )
};

export default Event
