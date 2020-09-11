import React from "react";
import { Table } from 'react-bootstrap'
import Event from './Event';

const List = ({events}) => {

    const rows = () => events.map(event =>
      <Event
        key={event.id}
        event={event}
      />
    );

    const theadStyle = {
      fontSize: 'larger',
      fontWeight: 'bold'
    };


    return (
      <div className="container">
          <Table striped>
            <thead style={theadStyle}>
            <tr>
              <td>Mitä?</td>
              <td>Missä?</td>
              <td>Koska?</td>
            </tr>
            </thead>
              <tbody>
              {rows()}
              </tbody>
          </Table>
      </div>
    )
};

export default List
