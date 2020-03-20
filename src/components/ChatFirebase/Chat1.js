import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableHighlight,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from "react-native";
import { Header } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import {
  sendMessage,
  fetchMessage
} from "../../container/Login/actions/ChatAction";
import baseStyles from "../../styles/stylesheets/base.stylesheets";
import { bindActionCreators } from "redux";
import axios from "axios";
import firebase from "react-native-firebase";
import moment from "moment";

function convertToCustomTimeFormat(time) {
  const PM = !!time.match("PM");
  time = time.split(":");

  let hour = "";
  let min = "";
  hour = time[0];
  if (PM) {
    min = time[1].replace("PM", "p. m.");
  } else {
    min = time[1].replace("AM", "a. m.");
  }

  return `${hour}:${min}`;
}

class Chat1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      handle: "",
      Lista: [],
      data: [],
      Messages: "",
      orderBy: [],
      Lista2: [],
      show: false,
      Lista3: [],
      productCount: 1,
      vasquez: ""
    };
  }

  listenForItems = itemsRef => {
    itemsRef.on("value", snap => {
      var Lista3 = [];
      snap.forEach(child => {
        for (var prop in child.val()) {
          if (Object.prototype.hasOwnProperty.call(child.val(), prop)) {
            Lista3.push({
              status: child.val()[prop].status
            });
          }
        }
      });
      this.setState({
        Lista3: Lista3
      });
      //console.log(this.state.Lista3);
    });
  };

  componentDidMount() {
    const { navigation } = this.props;
    //console.log("this.props", this.props);
    const chatRoom = navigation.getParam("chatRoom", "chatRoom");
    const name = navigation.getParam("name", "name");
    const id = navigation.getParam("id", "id");
   if (this.props.loggedUser.pais == "https://www.saludvitale.com/panama_") {
    //if (this.props.loggedUser.pais == "https://phplaravel-227278-1009310.cloudwaysapps.com/panama_") {   
   const itemsRef = firebase
      .database()
      .ref("Chat/Conversations/panama/" + chatRoom + "/Session")
      .child(id + "/status");
    this.listenForItems(itemsRef);
    //console.log("chatRoom", chatRoom);
    //console.log("name", name);
    0
    this.fetchMessage(chatRoom);
  }else{
    const itemsRef = firebase
    .database()
    .ref("Chat/Conversations/ecuador/" + chatRoom + "/Session")
    .child(id + "/status");
  this.listenForItems(itemsRef);
  //console.log("chatRoom", chatRoom);
  //console.log("name", name);
  0
  this.fetchMessage(chatRoom);
  }
}

  onTyping(text) {
    if (text && text.length >= 1) {
      this.setState({
        disabled: false,
        Messages: text
      });
    } else {
      this.setState({
        disabled: true
      });
    }
  }

  addProduct = () => {
    this.setState({ productCount: this.state.productCount + 1 });
    //console.log(this.state.productCount);
  };

  //
  push = () => {
    const { navigation } = this.props;
    const id = navigation.getParam("id", "id");
    axios
      .post(this.props.loggedUser.pais + "/api/NotificacionChatPaciente", {
        user_id: id,
        doctor_id: this.props.loggedUser.user_id,
        mensaje: this.state.Messages   //this.state.vasquez
      })
      .then(response => {
        if (response.data.success === true) {
        } else {
        }
      })
      .catch(error => {
        //console.log(error);
      });
  };

  fetchMessage(chatRoom) {
   if (this.props.loggedUser.pais == "https://www.saludvitale.com/panama_") {
    //if (this.props.loggedUser.pais == "https://phplaravel-227278-1009310.cloudwaysapps.com/panama_") {    
   //console.log("chatRoom2", chatRoom);
   
      firebase
        .database()
        .ref("Chat/Conversations/panama")
        .child(chatRoom)
        .child("Messages")
        .orderByKey()
        .limitToLast(30)
        .on("value", snapshot => {
          //console.log("snapshot.val()", snapshot.val());
          //console.log("lista", this.state.Lista);
          var Lista = [];
          snapshot.forEach(child => {
            //console.log(child.key, child.val());
            Lista.push({
              message: child.val().message,
              senderName: child.val().senderName,
              timestamp: child.val().timestamp,
              senderId: child.val().senderId,
              senderImage: child.val().senderImage,
              orderBy: ["timestamp", "desc"],
              key: child.key,
              timestampNoFormat: moment(
                child.val().timestamp,
                "DD/MM/YYYY HH:mm:ss A"
              ).toDate()
            });
          });
  
          Lista.sort(function(a, b) {
            // DESCENDING order.
           // if (a.timestampNoFormat >= b.timestampNoFormat) return -1;
           // if (a.timestampNoFormat < b.timestampNoFormat) return 1;
  
            if (a.timestampNoFormat ==  a.timestampNoFormat) return -1;
  
            return 0;
          });
  
          this.setState({
            Lista: Lista
          });
          //console.log("lista", this.state.Lista);
        });
    }else{
      //console.log("chatRoom2", chatRoom);
   
      firebase
        .database()
        .ref("Chat/Conversations/ecuador")
        .child(chatRoom)
        .child("Messages")
        .orderByKey()
        .limitToLast(30)
        .on("value", snapshot => {
          //console.log("snapshot.val()", snapshot.val());
         // console.log("lista", this.state.Lista);
          var Lista = [];
          snapshot.forEach(child => {
            //console.log(child.key, child.val());
            Lista.push({
              message: child.val().message,
              senderName: child.val().senderName,
              timestamp: child.val().timestamp,
              senderId: child.val().senderId,
              senderImage: child.val().senderImage,
               orderBy: ["timestamp", "desc"],
              key: child.key,
              timestampNoFormat: moment(
                child.val().timestamp,
                "DD/MM/YYYY HH:mm:ss A"
              ).toDate()
            });
          });
  
          Lista.sort(function(a, b) {
            // DESCENDING order.
           // if (a.timestampNoFormat >= b.timestampNoFormat) return -1;
            //if (a.timestampNoFormat < b.timestampNoFormat) return 1;
  
            if (a.timestampNoFormat ==  a.timestampNoFormat) return -1;
  
            return 0;
          });
  
          this.setState({
            Lista: Lista
          });
          //.log("lista", this.state.Lista);
        });
    }
  }
   
  onSendBtnPressed() {
    const { navigation } = this.props;
    const chatRoom = navigation.getParam("chatRoom", "chatRoom");
    const id = navigation.getParam("id", "id");
    this.sendMessage(this.state.Messages, this.props.chatRoom);
    //this.pushconte();
    this.addProduct();
    this.push();
    this.textInput.clear();
    if (this.props.loggedUser.pais == "https://www.saludvitale.com/panama_") {  
     // if (this.props.loggedUser.pais == "https://phplaravel-227278-1009310.cloudwaysapps.com/panama_") {  
    var numer = firebase
      .database()
      .ref("Users")
      .child("panama")
      .child(id)
      .child("Conversations/" + chatRoom + "/unreadMessages")
      .set(this.state.productCount);
    }
      else{
        var numer = firebase
        .database()
        .ref("Users")
        .child("ecuador")
        .child(id)
        .child("Conversations/" + chatRoom + "/unreadMessages")
        .set(this.state.productCount);
      }

    Keyboard.dismiss();

    // //
  }

  /*consulta = (Session)=>{
        var ChatRef = firebase.database().ref('Chat/Conversations/' + chatRoom + '/Session');
        if (Session) == false {
            
        }*/

  pushconte() {
    const { navigation } = this.props;
    const chatRoom2 = navigation.getParam("chatRoom", "chatRoom");
    const id = navigation.getParam("id", "id");
    const name = navigation.getParam("name", "name");
    const image = navigation.getParam("image", "image");
    var num = this.props.loggedUser.user_id;
    var n = num.toString();
    var nom = `${this.props.loggedUser.first_name} ${this.props.loggedUser.last_name}`;

    var duran = {
      doctorName: nom,
      doctorId: n,
      doctorImage: this.props.loggedUser.image,
      patientName: name,
      patientId: id,
      patientImage: image,
      institutionId: "",
      institutionName: "",
      institutionImage: "",
      chatRoom: chatRoom2,
      body: nom,
      message: this.state.Messages
    };

    this.setState({ vasquez: duran });
    //console.log("paso1");
    //console.log(this.state.vasquez);
  }

  // Nota: Los Campos comentados para el envio de la push modificados por jean, ver si van o no van???
  //deberia enviarle los campos asi para que llegue en la aplicacion de jean!!

  /*{
     "sender_id": "", "sender_name": "", "sender_image": "", "sender_role": "",
     "receiver_id": "", "receiver_name": "", "receiver_image": "",
     "receiver_role": "", "chat_room": "", "body": "", "chat_message": ""
   }*/

  //

  sendMessage = Messages => {
    //console.log(Messages);
    var now = moment().format();
    // var currentDate = moment().format("DD/MM/YYYY HH:mm A");
    const { navigation } = this.props;
    const chatRoom2 = navigation.getParam("chatRoom", "chatRoom");
    const id = navigation.getParam("id", "id");
    const name = navigation.getParam("name", "name");
    const image = navigation.getParam("image", "image");
    //console.log(currentDate);
    var currentDate =
      moment().format("DD/MM/YYYY") +
      " " +
      convertToCustomTimeFormat(moment().format("HH:mm A"));

      if (this.props.loggedUser.pais == "https://www.saludvitale.com/panama_") { 
       // if (this.props.loggedUser.pais == "https://phplaravel-227278-1009310.cloudwaysapps.com/panama_") {   
      var ChatRef = firebase 
        .database()
        .ref("Chat/Conversations/panama/" + chatRoom2 + "/Messages");
      }else{
        var ChatRef = firebase
        .database()
        .ref("Chat/Conversations/ecuador/" + chatRoom2 + "/Messages");
      }
   
    var num = this.props.loggedUser.user_id;
    var n = num.toString();
    //var idusuario = id,
    // var yoo = idusuario.toString();
    var nom = `${this.props.loggedUser.first_name} ${this.props.loggedUser.last_name}`;

    var newMessageRef = ChatRef.push();

    newMessageRef.set(
      {
        message: Messages,
        senderId: n,
        senderImage: this.props.loggedUser.image,
        senderName: nom,
        timestamp: currentDate,
        type: "text"
      },
      function(err) {
       // console.log("callback complete! ", err);
      }
    );
  };

  keyExtractor = (item, index) => index;

  render() {
    var now = moment().format();
    const { Lista } = this.state;
    const { navigation } = this.props;
    const name = navigation.getParam("name", "name");
    const extraBtnStyle = this.state.disabled
      ? styles.disableBtn
      : styles.enableBtn;
    let behavior = "";
    if (Platform.OS == "ios") {
      behavior = "padding";
    }

    return (
      <View style={styles.container}>
        <FlatList
          inverted
          data={this.state.Lista}
          renderItem={({ item }) => (
            (isMyMessage = item.senderId == this.props.loggedUser.user_id),
            (textContainerExtra = isMyMessage
              ? styles.textContainerRight
              : styles.textContainerleft),
            (textContainerExtra2 = isMyMessage
              ? styles.textContainer
              : styles.textContainer21),
            (image21 = isMyMessage = isMyMessage
              ? baseStyles.AVATAR
              : baseStyles.Avatar2),
            (
              <View style={styles.messageContainer}>
                <Image style={[image21]} source={{ uri: item.senderImage }} />

                <View style={[textContainerExtra2, textContainerExtra]}>
                  <Text style={styles.sender}>{item.senderName}</Text>
                  <Text style={styles.message}>{item.message} </Text>
                  <Text tyle={styles.hora}>{item.timestamp}</Text>
                </View>
              </View>
            )
          )}
        />

        <KeyboardAvoidingView keyboardVerticalOffset={90} behavior="padding">
          <View styles={styles.vista}>
            <View styles={styles.inputBar}>
              <TextInput
                style={styles.textBox}
                multiline
                defaultHeight={30}
                onChangeText={text => this.onTyping(text)}
                ref={input => {
                  this.textInput = input;
                }}
              />
            </View>
            <MaterialCommunityIcons
              style={[extraBtnStyle]}
              disabled={this.state.disabled}
              name="send"
              o
              size={34}
              color="#009bd9"
              style={baseStyles.send21}
              onPress={this.onSendBtnPressed.bind(this)}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputBar: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 55,
    paddingVertical: Platform.OS === "ios" ? 10 : 10,
    backgroundColor: "#dadfea"
  },
  textBox: {
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#C5C4C4",
    fontSize: Platform.OS === "ios" ? 14 : 17,
    paddingHorizontal: Platform.OS === "ios" ? 22 : 22,
    paddingVertical: Platform.OS === "ios" ? 22 : 1,
    //flex: 1,
    top: Platform.OS === "ios" ? 10 : 15,
    marginRight: 40,
    marginLeft: 8
  },

  sendButton: {
    top: Platform.OS === "ios" ? 640 : 640,    
    paddingLeft: 0.5,
    paddingRight: 0.5,
    marginLeft: 330
  },
  hora: {
    top: 15,
    marginTop: 30
  },

  enableBtn: {
    backgroundColor: "#005094"
  },

  disableBtn: {
    backgroundColor: "#009bd9"
  },

  vista: {
    flex: 1
  },

  messageContainer: {
    flexDirection: "row",
    padding: 2,
    flex: 20
  },

  textContainer: {
    flexDirection: "column",
    marginLeft: -250,
    marginRight: 60,
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: Platform.OS === "ios" ? 10 : 10,   
  },

  textContainer21: {
    flexDirection: "column",
    marginRight: 120,
    marginLeft: -20,
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 10
  },

  textContainerleft: {
    alignItems: "flex-start",
    backgroundColor: "#C5C4C4"
  },

  textContainerRight: {
    alignItems: "flex-end",
    backgroundColor: "#009bd9"
  },

  message: {
    fontSize: 16
  },

  sender: {
    fontWeight: "bold",
    paddingRight: 10,
    fontSize: 16
  }
});

function mapStateToProps(state) {
  return {
    loggedUser: state.user,
    fetching: state.chat.fetching,
    messages: state.chat.messages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchMessage: fetchMessage
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat1);

//export default Chat1;
