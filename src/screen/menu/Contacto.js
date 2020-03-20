import React, { Component } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, Linking, View } from "react-native";

export default class Contacto extends Component {
  static navigationOptions = {
    drawerLabel: "Contacto",
    drawerIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="phone" size={20} color="black" />
    )
  };

  componentDidMount() {
    Linking.getInitialURL("https://www.saludvitale.com/doctor/contactanos/")
      .then(url => {
        if (url) {
          //console.log(`Initial url is: ${url}`);
        }
      })
      .catch(err => console.error("An error occurred", err));
  }

  render() {
    Linking.openURL("https://www.saludvitale.com/doctor/contactanos/");

    return <View style={styles.container}></View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});
