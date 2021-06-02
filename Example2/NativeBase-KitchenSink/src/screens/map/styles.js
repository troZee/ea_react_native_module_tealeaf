const React = require("react-native");

const { StyleSheet } = React;

export default {
  container: {
    backgroundColor: "#FFF"
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "center",
    marginTop: 10
  },
  mb15: {
    marginBottom: 20
  },
  mt15: {
    marginTop: 15
  },
  mb20: {
    marginBottom: 20
  },
  iconButton: {
    color: "#007aff"
  },
  margin: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFF"
  },
  mf: {
    flexGrow: 1,
    alignSelf: "center",
    alignItems: "center"
  },
  // container: {
  //       ...StyleSheet.absoluteFillObject,
  //       justifyContent: 'flex-end',
  //       alignItems: 'center',
  //     },
      scrollview: {
        alignItems: "center",
        paddingVertical: 40,
      },
      map: {
        width: 250,
        height: 250,
      },

};
