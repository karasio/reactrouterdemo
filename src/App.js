import React from 'react'
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';

import Add from './components/Add'
import Home from './components/Home'
import List from './components/List'

const App = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
      const baseUrl = 'http://localhost:3001/events';
      const request = axios.get(baseUrl);
      request
        .then( response => {
            setEvents(response.data);
      })

    };

    const padding = {
        padding: 5
    };

    // const debug = (e) => {
    //     e.preventDefault();
    //     console.log(events.length);
    // };

    return (
        <div className="container">
            {/*<button onClick={debug}>debug</button>*/}
            <Router>
                <div>
                    <Link style={padding} to="/">home</Link>
                    <Link style={padding} to="/add">add</Link>
                    <Link style={padding} to="/list">list</Link>
                </div>

                <Switch>
                    <Route path="/add">
                        <Add
                          events={events}
                          setEvents={setEvents}
                        />
                    </Route>
                    <Route path="/list">
                        <List events={events} />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>

                <div>
                    <i>Esimerkkivalikko </i>
                    <i>perustuu HY:n fullstackopen-kurssimateriaaliin</i>
                </div>
            </Router>
        </div>
    )
};

export default App
