import React from "react";
import Setup from "./src/boot/setup";
import {NativeModules, findNodeHandle} from 'react-native';
const Tealeaf = NativeModules.RNCxa;

export default class App extends React.Component {
  render() {
  	Tealeaf.setCurrentScreenName("Home");
    return <Setup />;
  }
}
