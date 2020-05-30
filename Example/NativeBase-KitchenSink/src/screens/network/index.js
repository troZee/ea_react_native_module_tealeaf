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

class Network extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      person: []
    };
    this.handleNetworkCall = this.handleNetworkCall.bind(this);
  }

  handleNetworkCall() {
    fetch("https://randomuser.me/api/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            person: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
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
            <Title>Network Call</Title>
          </Body>
          <Right />
        </Header>

        <Content padder style={{ backgroundColor: "#FFF" }}>
          <Button block primary style={styles.mb15} 
            onPress={this.handleNetworkCall}>
            <Text>Trigger Network Call</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Network;
