import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import bcrypt from "react-native-bcrypt";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { login } from "../../container/Login/actions/user";
import AuthenticatorUI from "../../components/autenticacion/AuthenticatorUI";
import firebase from "react-native-firebase";
import {
  Alert,AsyncStorage
} from "react-native";

class LoginScreen extends Component {
  static navigationOptions = {
    drawerLabel: "Mi cuenta",
    drawerIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="account" size={20} color="black" />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      p:{},
      pais1:""

    };
    this.login = this.login.bind(this);
   // console.log(this.props);
  }

  getToken() {
    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          console.log(fcmToken);
          this.setState({ token: fcmToken });
         // console.log("Johana");
         // console.log(this.state.token);
        } else {
        }
      });

  }

  submitAndClear = () => {
    this.props.writeText(this.state.text);
    this.setState({
      text: ""
    });
  };

  async componentDidMount() {
   const { navigation } = this.props;
   pais = navigation.getParam("ecua", "ecua");
   this.setState({ pais1: pais });
   await firebase.messaging().requestPermission();
   this.getToken();
    //console.log(this.state.userData);
    //this.getTokenn();

  }

  //(mantener la sesion
  async storeToken(user) {
     try {
       //console.log("dsds");
       //console.log(user);
       //console.log("dsds")
       await AsyncStorage.setItem("userData",(user));

    } catch (error) {
      //console.log("Something went wrong", error);
    }
  }

  /*async getTokenn(user) {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      console.log('johanaVas')
      console.log(data);
    } catch (error) {
    }
  }*/
  //
  login(user) {
    const { navigation } = this.props;
    pais = navigation.getParam("ecua", "ecua");
    hola= "" + pais;
    //console.log("imprimiendo el pais con login normal primer")
    //console.log(hola);
    //console.log(this.props);
    axios
   // .post ("http://phplaravel-227278-1009310.cloudwaysapps.com/panama/api/authentication/login",{
      .post(pais + "/api/authentication/login", {
        email: user.email,
        password: user.password,
        device_token: this.state.token,
        //device_type: "0"
      })
      .then(response => {
        if (response.data && response.data.success == true) {
          //if (response.data && response.data.success == "yes") {
          //console.log("hi");
          //console.log(user);
          //console.log("hi");
          this.storeToken(JSON.stringify(user));
          const target = response.data.data[0];
          const source = { pais: pais };
          const returnedTarget = Object.assign(target, source);
          //async.setItem('userData', login);
          this.props.onLogin(returnedTarget);
          this.setState({ p: returnedTarget });
          AsyncStorage.setItem('userDatos', pais);
          //console.log(returnedTarget);
          if (response.data.data[0].user_type==2){
          this.props.navigation.navigate("HomeScreen");
          }else{
            Alert.alert('', "Disculpe App solo para Profesionales");
          }
        } else {
          //console.log(response.data.message);
          Alert.alert('', "Usuario o Contraseña Inconrrecta");
        }
      })
      .catch(error => {
        //console.log(error);
      });
  }
  render() {
    return (
      <AuthenticatorUI
        setEmail={this.setEmail}
        setPassword={this.setPassword}
        hola2={this.state.pais1}
        mainButtonTitle="Entrar"
        secondaryButtonTitle="¿Olvidaste tu contraseña?"
        navigationAction={() => {
          this.props.navigation.navigate("PasswordResetScreen");
        }}
        mainAction={this.login}
        contactButtonTitle="Contactanos"
        registroButtonTitle="Registrarse"

      />
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
