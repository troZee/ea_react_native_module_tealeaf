import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Text,
  Body,
  Left,
  Right,
  Icon
} from "native-base";
import styles from "./styles";
import {NativeModules, findNodeHandle} from "react-native";
const Tealeaf = NativeModules.RNCxa;

class ErrorTryCatch extends Component {
  constructor(props) {
    super(props);
    this.handleTryCatch = this.handleTryCatch.bind(this);
    this.handleUnCaughtError = this.handleUnCaughtError.bind(this);
  }

  componentDidCatch(error, info) {
    console.log("Test: Try Catch Error=>" + error);
    Tealeaf.logExceptionEvent(error.message, error.stack, true);
  }

  handleTryCatch() {
    try {
      throw new Error("Test: Try Catch Error");
    } catch (error) {
      console.log("Test: Try Catch Error=>" + error);
      Tealeaf.logExceptionEvent(error.message, error.stack, false);
    }
  }

  handleUnCaughtError() {
    // Un caught exception
    throw new Error("Test: Error Not Caught");
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Errors</Title>
          </Body>
          <Right />
        </Header>

        <Content padder style={{ backgroundColor: "#FFF" }}>
          <Button block primary style={styles.mb15} 
            onPress={this.handleTryCatch}>
            <Text>Trigger Try Catch Error</Text>
          </Button>

          <Button block primary style={styles.mb15} 
            onPress={this.handleUnCaughtError}>
            <Text>Trigger UnCaught Error</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default ErrorTryCatch;
