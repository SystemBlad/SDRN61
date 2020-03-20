import React from "react";
import {
  Platform,
  Dimensions,
  Linking,
  Text,Button,
  ActivityIndicator
} from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import PasswordResetScreen from "./src/screen/recuperar/PasswordResetScreen";
import LoginScreen from "./src/screen/login/LoginScreen";
import HomeScreen from "./src/screen/home/HomeScreen";
import AuthLoading from "./src/screen/login/AuthLoading";
import LogoTitle from "./src/screen/home/LogoTitle";
import CerrarSesion from "./src/screen/menu/CerrarSesion";
import Contacto from "./src/screen/menu/Contacto";
//import Chat from './src/screen/home/Chat';
//import Citas from "./src/screen/SolicitudCitas/Citas";
import CalendarsScreen from "./src/components/Citas/CalendarsScreen";
import AgregarCita from "./src/components/Citas/AgregarCita";
import Chat1 from "./src/components/ChatFirebase/Chat1";
import LisChat from "./src/screen/ListaChat/LisChat";
//import citacalendar from "./src/screen/SolicitudCitas/citacalendar";
//import citalist from "./src/screen/SolicitudCitas/citalist";
import pais from "./src/screen/login/pais";
import auth from "./src/screen/login/auth";
import detalle from "./src/components/Citas/detalle";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WIDTH = Dimensions.get("window").width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.83
};

const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}

const HomeNavigator = createStackNavigator(
  {

    auth: {
      screen: auth,
      navigationOptions: ({ navigation }) => ({
        //title: "",
        //headerTitleStyle: { textAlign: "center", color: "#5d7fba" },
        //headerBackTitle: null
      })
    },
    pais: {
      screen: pais,
      navigationOptions: ({ navigation }) => ({
          title: "",
        //headerTitleStyle: { textAlign: "center", color: "#5d7fba" },
          headerBackTitleStyle: {
          color: 'white',
       },
          headerTintColor: 'white',
      
      })
      
    },

    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerTitleStyle: { textAlign: "center", color: "#5d7fba" },
        headerBackTitle: null
      })
    },

    Inicio: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <LogoTitle />,
        headerLeft: (
          <Text
            style={{ fontSize: 28, marginLeft: 20 }}
            onPress={() => {
              console.log("press");
              navigation.toggleDrawer();
            }}
          >
            &#9776;
          </Text>
        )
      })
    },

    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <LogoTitle />,
        headerLeft: (
          <Text
            style={{ fontSize: 28, marginLeft: 20 }}
            onPress={() => {
              console.log("press");
              navigation.toggleDrawer();
            }}
          >
            &#9776;
          </Text>
        )
      })
    },

     Chat: {
      screen:LisChat,
      navigationOptions: ({ navigation }) => ({
        title:"Chat",
        //headerTitleStyle: { textAlign: "center", color: "#ffffff" },
        //headerBackTitle: null,

        headerLeft: (
          <Text
            style={{ fontSize: 28, marginLeft: 20 }}
            onPress={() => {
              console.log("press");
              navigation.toggleDrawer();
            }}
          >
            &#9776;
          </Text>
        )
      })
    },

   /* citacalendar: {
      screen: citacalendar,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerTitleStyle: { textAlign: "center", color: "#ffffff" },
        //headerBackTitle: null,

        headerLeft: (
          <Text
            style={{ fontSize: 28, marginLeft: 20 }}
            onPress={() => {
              console.log("press");
              navigation.toggleDrawer();
            }}
          >
            &#9776;
          </Text>
        )
      })
    },*/

    Chat1: {
      screen: Chat1,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam("name", "name"),
      
        headerTitleStyle: {
          backgroundColor: ""
        },

        //headerLeft: navigation.getParam("chatRoom", "chatRoom"),
        headerBackTitle: null
      
      })
    },

    CalendarsScreen: {
      screen: CalendarsScreen,
      navigationOptions: ({ navigation }) => ({
        title: "",

        headerLeft: (
          <Text
            style={{ fontSize: 28, marginLeft: 20 }}
            onPress={() => {
              console.log("press");
              navigation.toggleDrawer();
            }}
          >
            &#9776;
          </Text>
        )
        // headerBackTitle: null
      })
    },

    AgregarCita: {
      screen: AgregarCita,
      navigationOptions: (navigation) => ({
        
        headerBackTitle :null,
        title: "Crear Cita",
       
             
       /* headerLeft: (
 
          <MaterialCommunityIcons
                name="arrow-left"
                size={30}
                color="black"
                style={{left: 10}}
                onPress={() => {
                  CalendarsScreen
                  //this.props.navigation.navigate('CalendarsScreen');
                }}
              />
             
        )*/
      })

    },

    /*citacalendar: {
      screen: citacalendar,
      navigationOptions: () => ({
        title: "Crear Cita"
        // headerBackTitle: null
      })
    },/*

   /* CitasScreen: {
      screen: Citas,
      navigationOptions: () => ({
        title: ""
        // headerBackTitle: null
      })
    },*/

    LisChat: {
      screen: LisChat,
 
      navigationOptions: ({ navigation }) => ({
        title: "Chat",
        status: true,
        // headerBackTitle: null

        headerLeft: (
          <Text
            style={{ fontSize: 28, marginLeft: 20 }}
            onPress={() => {
              console.log("press");
              navigation.toggleDrawer();
            }}
          >
            &#9776;
          </Text>
        )
      })
    },


    detalle: {
      screen: detalle,
 
      navigationOptions: ({ navigation }) => ({
        title: "",
        status: true,
        headerBackTitle: null
      })
    },

    PasswordResetScreen: {
      screen: PasswordResetScreen,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerBackTitle: null,
        headerTitleStyle: { textAlign: "center", color: "#5d7fba" },
        headerLeft: (
          <Text
            style={{ fontSize: 28, marginLeft: 20 }}
            onPress={() => {
              console.log("press");
              navigation.toggleDrawer();
            }}
          >
            &#9776;
          </Text>
        )
      })
    },

    Contacto: {
      screen: Contacto
    },

    AuthLoading: {
      screen: AuthLoading,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerTitleStyle: { textAlign: "center", color: "#5d7fba" },
        headerBackTitle: null,
        headerLeft: (
          <Text
            style={{ fontSize: 28, marginLeft: 20 }}
            onPress={() => {
              console.log("press");
              navigation.toggleDrawer();
            }}
          >
            &#9776;
          </Text>
        )
      })
    }
  },

  DrawerConfig,
  {
    navigationOptions: {
      header: navigation => ({
        title: "",
        left: <MenuButton navigation={navigation} />
      })
    }
  }
);

const AppNavigator = createDrawerNavigator({
  SaludVitale: {
    screen: HomeNavigator
  },

  Inicio: {
    screen: HomeScreen
  },

  Chat: {
    screen: LisChat //Chat1 //Chat
  },

  CalendarsScreen: {
    screen: CalendarsScreen
  },

  /*LoginScreen: {
    screen: LoginScreen
  },*/

  CerrarSesion: {
    screen: CerrarSesion
  },
  Contacto: {
    screen: Contacto
  },
  PAIS: {
    screen: pais
  }
});

//export default createAppContainer(AppNavigator);
export default createAppContainer (createSwitchNavigator(
  {
    App:AppNavigator, 
    Auth: auth,
  },
  {
    initialRouteName: 'Auth',
  }
   
));




