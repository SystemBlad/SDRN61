import React, { Component } from "react";
import { connect } from "react-redux";
import baseStyles from "../../styles/stylesheets/base.stylesheets";
import AuthenticatorUI from "../../components/autenticacion/AuthenticatorUI";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const hola = "https://www.saludvitale.com/panama";

class pais extends Component {
  static navigationOptions = {
    drawerLabel: "Cambiar País",
    drawerIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="map" size={20} color="black" />
    )
  };

  render() {

    return (
      <View >

        <Image
          source={require("../../../src/imagenes/SaludVitale.png")}
          style={{
            top: Platform.OS === "ios" ? 110 : 80,
            marginLeft: 57,
            marginRight: 5,
            marginTop: 30,
            width: 260,
            height: 50
          }}
        />

        <Text style={baseStyles.tex2}> Seleccione su país</Text>
        <View
          style={{
            top: Platform.OS === "ios" ? 150 : 120,
            marginLeft: 76,
            fontSize: 20,
            fontWeight: "bold"
          }}
        >
          <TouchableOpacity
            style={{
              borderColor: "#C5C4C4",
              borderRadius: 1,
              borderWidth: 1,
              padding: Platform.OS === "ios" ? 9 : 9,
              borderRadius: 8,
              width: 230,
              height: 55
            }}
            activeOpacity={0.5}
            onPress={() => {
              const { sortDirection, query, sortBy } = this.props;
              this.props.navigation.navigate("LoginScreen", {
                ecua: "https://www.saludvitale.com/ecuador_"
                //ecua: "https://phplaravel-227278-1009310.cloudwaysapps.com/ecuador_"
              });
            }}
          >
            <Image
              style={{
                margintop: 255,
                marginLeft: 30,
                width: 50,
                height: 30
              }}
              source={require("../../../src/imagenes/Ecuador.png")}
            />
            <Text
              style={{
                top: -25,
                marginLeft: 102,
                fontSize: 20
              }}
            >
              {" "}
              Ecuador
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderColor: "#C5C4C4",
              borderRadius: 1,
              borderWidth: 1,
              padding: Platform.OS === "ios" ? 9 : 9,
              borderRadius: 8,
              width: 230,
              height: 55,
              marginTop: 20
            }}
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.navigate("LoginScreen", {
                ecua: "https://www.saludvitale.com/panama_"
                //ecua: "https://phplaravel-227278-1009310.cloudwaysapps.com/panama_"
              });
            }}                                                                
          >
            <Image
              style={{
                top: 2,
                marginLeft: 30,
                width: 50,
                height: 30
              }}
              source={require("../../../src/imagenes/Panama.png")}
            />
            <View />
            <Text
              style={{
                top: -25,
                marginLeft: 105,
                fontSize: 20
              }}
            >
              {" "}
              Panamá
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    onLogin: user => dispatch(login(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(pais);
