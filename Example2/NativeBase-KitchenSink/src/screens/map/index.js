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
import {NativeModules, findNodeHandle, StyleSheet, View, Dimensions} from "react-native";
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import styles from "./styles";

const Tealeaf = NativeModules.RNCxa;
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  render() {
    return (
      <View style={styles.container}>
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
            <Title>Map</Title>
          </Body>
          <Right />
        </Header>

        <View style={styles.scrollview}>
          <MapView
            provider={this.props.provider}
            style={styles.map}
            scrollEnabled={false}
            zoomEnabled={false}
            pitchEnabled={false}
            rotateEnabled={false}
            initialRegion={this.state.region}
          >
            <Marker
              title="This is a title"
              description="This is a description"
              coordinate={this.state.region}
            />
          </MapView>
        </View>
      </View>
    );
  }
}

Map.propTypes = {
  provider: ProviderPropType,
};

export default Map;