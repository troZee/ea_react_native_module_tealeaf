import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  Subtitle
} from "native-base";
import styles from "./styles";

import {NativeModules, findNodeHandle} from 'react-native';
const Tealeaf = NativeModules.RNCxa;

class Header7 extends Component {
  render() {
    Tealeaf.setCurrentScreenName("Header7");
    return (
      <Container style={styles.container}>
        <Header hasSubtitle>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Title</Title>
            <Subtitle>Subtitle</Subtitle>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Text>Header with Title & Subtitle</Text>
        </Content>
      </Container>
    );
  }
}

export default Header7;
