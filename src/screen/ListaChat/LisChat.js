import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import baseStyles from "../../styles/stylesheets/base.stylesheets";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


class LisChat extends React.Component {
  static navigationOptions = {
    drawerLabel: "Chat",
    drawerIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="chat" size={20} color="black" />
    )
  };

  constructor(props) {
    super(props);

    this.state = {
      Lista: [],
      show: false,
      prue: "",
      showIndicator: true,
      isLoading: true
    };
  }

  listenForItems = itemsRef => {
    itemsRef.on("value", snap => {
      var Lista = [];
      snap.forEach(child => {
        for (var prop in child.val()) {
          if (Object.prototype.hasOwnProperty.call(child.val(), prop)) {
            Lista.push({
              name: child.val()[prop].name,
              timestamp: child.val()[prop].timestamp,
              unreadMessages: child.val()[prop].unreadMessages,
              chatRoom: child.val()[prop].chatRoom,
              id: child.val()[prop].id,
              image: child.val()[prop].image,
              rol: child.val().role
            });
          }
        }
      });
      this.setState({
        Lista: Lista
      });
    });
  };

  ShowHideActivityIndicator = () => {
    if (this.state.isLoading == true) {
      this.setState({ isLoading: false });
    } else {
      this.setState({ isLoading: false });
    }
  };

  /*closeActivityIndicator = () =>
    setTimeout(
      () =>
        this.setState({
          isLoading: false
        }),
      10000
    );*/

  componentDidMount() {
    if (this.props.loggedUser.pais == "https://www.saludvitale.com/panama_") { 
   // if (this.props.loggedUser.pais == "https://phplaravel-227278-1009310.cloudwaysapps.com/panama_") {  
    this.nuevo();
    }else{
   
   const itemsRef = firebase
     .database()
     .ref("Users")
     .child("ecuador")
     .child(this.props.loggedUser.user_id);
   this.listenForItems(itemsRef)
   
 }
    /*if (this.state.show == false) {
      this.hola();
    } else {
      this.hola();
    }*/
  }

  /*componentDidUpdate() {
    this.hola();
  }*/

  /*hola = () => {
    //if (this.props.loggedUser.pais == "https://www.saludvitale.com/panama") {
      if (this.props.loggedUser.pais == "http://phplaravel-227278-1009310.cloudwaysapps.com/panama") {  
      var numero = firebase
      .database()
      .ref("Chat/Conversations/panama/" + this.state.prue + "/Session")
      .child(this.props.loggedUser.user_id + "/status")
      .set(false);
  }
    else{
        var numero = firebase
        .database()
        .ref("Chat/Conversations/ecuador/" + this.state.prue + "/Session")
        .child(this.props.loggedUser.user_id + "/status")
        .set(false);
    }
  }*/
  
//cambio de pais de firebase
  nuevo=()=>{
    const itemsRef = firebase
      .database()
      .ref("Users")
      .child("panama")
      .child(this.props.loggedUser.user_id);
    this.listenForItems(itemsRef);
  }

//

  renderRow = ({ item }) => {
    {
      this.setState({ isLoading: false });
    }

    if (item.image) {
      data = item.image;
      data2 = item.chatRoom;
      this.setState ({ prue: item.chatRoom});
    } else {
      data = "https://www.saludvitale.com/panama/img/default.png";
    }

    return (
      <TouchableOpacity
        style={baseStyles.touchat}
        onPress={() => {
          if (this.props.loggedUser.pais == "https://www.saludvitale.com/panama_") {
          //  if (this.props.loggedUser.pais == "https://phplaravel-227278-1009310.cloudwaysapps.com/panama_") {  
          var numer = firebase
            .database() 
            .ref("Users")
            .child("panama")
            .child(this.props.loggedUser.user_id)
            .child("Conversations/" + item.chatRoom + "/unreadMessages")
            .set(0);
        }else{
          var numer = firebase
          .database()
          .ref("Users")
          .child("ecuador")
          .child(this.props.loggedUser.user_id)
          .child("Conversations/" + item.chatRoom + "/unreadMessages")
          .set(0);
        }
     if (this.props.loggedUser.pais == "https://www.saludvitale.com/panama_") {
         
      //if (this.props.loggedUser.pais == "https://phplaravel-227278-1009310.cloudwaysapps.com/panama_") {  
          var numero = firebase
          .database()
          .ref("Chat/Conversations/panama/" + item.chatRoom + "/Session")
          .child(this.props.loggedUser.user_id + "/status")
          .set(false);
          
        }else{
          var numero = firebase
          .database()
          .ref("Chat/Conversations/ecuador/" + item.chatRoom + "/Session")
          .child(this.props.loggedUser.user_id + "/status")
          .set(false);
        }
          this.props.navigation.navigate("Chat1", {
            chatRoom: item.chatRoom,
            name: item.name,
            image: data,
            rol: item.role,
            id: item.id,
            timestamp: item.timestamp, 
          
          });
        }}
      >
        <Image style={baseStyles.imagechat} source={{ uri: data }} />
        <View style={baseStyles.textChat}>
          <Text style={baseStyles.nombrechat}>{item.name}</Text>
          <Text style={baseStyles.fechachat}>{item.timestamp} </Text>
          {item.unreadMessages != 0 ? (
            <Text style={baseStyles.cantdmensajes}> {item.unreadMessages}</Text>
          ) : null}
          <View style={baseStyles.separadorchat}></View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View>
        {this.state.isLoading == true ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : null}

        <View style={baseStyles.flatLisChat}>
          <FlatList data={this.state.Lista} renderItem={this.renderRow} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { loggedUser: state.user };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LisChat);
