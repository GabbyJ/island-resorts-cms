import React from 'react';
import './App.css';

import Home from "./Pages/Home";
import Rooms from "./Pages/Rooms";
import SingleRoom from "./Pages/SingleRoom";
import Error from "./Pages/Error";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Navbar from "./Components/Navbar";

import {RoomProvider} from "./Context";

function App() {
  return (
    <RoomProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component= {Home}/>
          <Route path="/rooms" exact component= {Rooms}/>
          <Route path="/rooms/:slug" exact component= {SingleRoom}/>
          <Route component={Error}/>
        </Switch>
      </Router>
    </RoomProvider>
  );
}

export default App;
