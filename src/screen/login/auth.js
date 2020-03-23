import React, { Component } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  //StatusBar,
  View,StyleSheet,
} from 'react-native';
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import axios from "axios";
import { login } from "../../container/Login/actions/user";

class auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      p:'',
      q:''

    };
    this.login = this.login.bind(this);
    //console.log(this.props);
  }

  componentDidMount() {
    this._bootstrapAsync();
    this.getToken();

  }
  // Fetch the token from storage then navigate to our appropriate place
   _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userData')
    const userTok = await AsyncStorage.getItem('userDatos')
    //console.log('pais', userTok.pais)
    //console.log('Datos1');
    //console.log(userToken);
    //console.log('Datos2 pais');
    let parsed = JSON.parse(userToken);
    //console.log('Datos');
    //    console.log(parsed);
    this.setState({ p: parsed });
     //console.log('Datos Almacenados del usuario');
    //console.log('Datos del usuario', parsed);


    if(userToken==null){
      this.props.navigation.navigate("pais");
    }else{
      //this.props.navigation.navigate("HomeScreen");
      //var uno= userTok;
      var pais= userTok            //"https://www.saludvitale.com/panama"  ;       // userTok;
      //console.log(pais);
      this.login(pais);
    }
    // this.props.navigation.navigate(userToken ? 'HomeScreen' : 'pais');
  };

  login(c) {

    const { navigation } = this.props;
    //"https://www.saludvitale.com/panama"
    //navigation.getParam("ecua", "ecua");
    //console.log('aqui');
    //console.log(pais);
    //console.log(this.props);
    axios
    //.post("https://www.saludvitale.com/panama/api/authentication/login",{
    .post(c + "/api/authentication/login", {
         email: this.state.p.email,
         password: this.state.p.password,
         device_token: this.state.token,
         //device_type: "0"
      })
      .then(response => {
        if (response.data && response.data.success == true) {
         // console.log("aleluya");
          pais = c;
          const target = response.data.data[0];
          const source =  { pais: c };
         //console.log('source', source);
          const returnedTarget = Object.assign(target, source);
          this.props.onLogin(returnedTarget);
          //console.log(returnedTarget);
          //AsyncStorage.setItem('userDatos',returnedTarget);
          this.props.navigation.navigate("HomeScreen");

        } else {
          //console.log(response.data.message);
          //Alert.alert('', "Usuario o Contraseña Inconrrecta");
        }
      })
      .catch(error => {
        //console.log(error);
      });
  }

  getToken() {
    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          console.log(fcmToken);
          this.setState({ token: fcmToken });
          //console.log("Johana");
          //console.log(this.state.token);
        } else {
        }
      });

  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#009bd9"/>

      </View>
    );
  }
 }

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})
function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    onLogin: user => dispatch(login(user))
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(auth);
