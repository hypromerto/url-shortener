import React, { Component } from "react";
import Navigation from "./app/navigation/ExternalNavigation"
import { UserProvider } from "./app/shared/UserContext";

export default class App extends Component{

  render() {
    return (
      <UserProvider>
        <Navigation />
      </UserProvider>
    );
  }
}

