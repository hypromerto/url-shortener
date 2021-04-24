import React, { Component } from "react";
import Navigation from "./app/navigation/ExternalNavigation"
import { UserProvider } from "./app/shared/UserContext";
import Toast from "react-native-toast-message";

export default class App extends Component{

  render() {
    return (
      <UserProvider>
        <Navigation />
          <Toast ref={(ref) => Toast.setRef(ref)} />
      </UserProvider>
    );
  }
}

