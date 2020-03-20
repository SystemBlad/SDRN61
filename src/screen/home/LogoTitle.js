import React from "react";
import { Image, Platform } from "react-native";

export default class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require("../../imagenes/Logo2.png")}
        style={{
          width: Platform.OS === "ios" ? "75%" : "56%",
          height: Platform.OS === "ios" ? "50%" : "50%",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: Platform.OS === "ios" ? 0 : 50
        }}
      />
    );
  }
}
