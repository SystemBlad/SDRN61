import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  RefreshControl, ActivityIndicator
} from "react-native";
import { Calendar } from "react-native-calendars";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { FAB } from "react-native-paper";
import baseStyles from "../../styles/stylesheets/base.stylesheets";
import { LocaleConfig } from "react-native-calendars";
//import Citas from "../../screen/SolicitudCitas/Citas";
import moment from "moment";
import axios from "axios";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class detalle extends Component {
   
    constructor(props) {
      super(props);
      this.state = {};
      this.state = {
        data1: "",
        data2: "",
        data3: "",
        data4: "",
        data5: "",
        data6: "",
        data7: "",
        data8: "",
        data9: "",
        data10: "",
        data11: "",
        id: "",
        isLoading2: ""
      };
     
    }
  
    componentDidMount() {
        this.detalle();
    }

    
    detalle = () => {
      this.setState({isLoading2: true})
        const { navigation } = this.props;
        const id = navigation.getParam("id", "id");
       axios
        .get(this.props.loggedUser.pais + "/api/getUserDoc?", {
          params: {
          slot_id: id //167857,
          }
        })
        .then(response => {
          if (response.data.success === true) {
           
            if (response.data.user[0].nombre) {
              this.setState({ data1: response.data.user[0].paciente_nombre });
            } else {
              this.setState({ data1: response.data.user[0].paciente_nombre });
            }
  
            if (response.data.user[0].slot_status == 0) {
              this.setState({ data6: "Confirmada" });
            } else {
              this.setState({ data6: "No Confirmada" });
            }
  
            if (response.data.user[0].paciente_celular !="") {
              this.setState({ data8: response.data.user[0].paciente_celular });
            } else {
              this.setState({ data8: response.data.user[0].paciente_telefono });
            }
  
            this.setState({ data2: response.data.user[0].paciente_apellido });
            this.setState({ data3: response.data.user[0].inicio });
            this.setState({ data4: response.data.user[0].fin });
            this.setState({ data5: response.data.user[0].slot_date });
            this.setState({ data7: response.data.user[0].detalle });
            this.setState({ data9: response.data.user[0].tipoConsulta });
            this.setState({ data10: response.data.user[0].sucursal_nombre });
            this.setState({ data11: response.data.user[0].paciente_profile_pic });
            this.setState({isLoading2: false });
          }
          
        })
        .catch(error => {
        });
    };

    render() {
        return(
          

            <View > 
        

{this.state.isLoading2 == true ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : null}
             
             <View
            style={{
           
              marginTop: Platform.OS === "ios" ? -65 : 45,
              alignItems: "center",
              flex: 1,
              flexDirection: "row",
              marginLeft: 25,
              marginRight: 10
            }}
          >
            <View
              style={{
                marginTop: Platform.OS === "ios" ? -60 : 40,
                top: Platform.OS === "ios" ? 200 : 0,
                alignItems: "center",
                flex: 1,
                flexDirection: "column",
                marginRight: 25
              }}
            >

                <Text
                  style={{
                    marginTop: Platform.OS === "ios" ? -48 : -48,
                    fontWeight: "bold",
                    fontSize: 30,
                    marginLeft: Platform.OS === "ios" ? 27 : 27
                  }}
                >
                  Detalle Reserva 
                 
                </Text>
              

              <View
                style={{
                  height: hp('100%'), // 70% of height device screen
                  width: wp('86%') ,  // 80% of width device screen
                  marginTop: Platform.OS === "ios" ? 13 : 13,
                  marginLeft: 10,
                  flex: 1,
                  flexDirection: "column"
                }}
              >
                  
                <Image
                  style={baseStyles.imagec}
                  source={{ uri: this.state.data11 }}
                />
                <Text
                  style={{
                    marginTop: Platform.OS === "ios" ? 30 : 30,
                    fontWeight: "bold",
                    fontSize: 15,
                    flexDirection: "column"
                    //marginLeft: 30,
                    //marginRight: 30,
                  }}
                >
                  {" "}
                  Paciente:{" "}
                </Text>
                 
                <Text
                  style={{
                    marginTop: 7,
                    fontSize: 14,
                    marginLeft: 3
                  }}>

                  {this.state.data1} {this.state.data2}
                </Text>
                <Text
                  style={{
                    marginTop: 12,
                    fontWeight: "bold",
                    fontSize: 15,
                    flexDirection: "column"
                  }}
                >
                  {" "}
                  Centro:{" "}
                </Text>

                <Text
                  style={{
                    marginTop: 9,
                    fontSize: 14,
                    marginLeft: 3
                  }}
                >
                  {this.state.data10}
                </Text>

                <Text
                  style={{
                    marginTop: 10,
                    fontWeight: "bold",
                    fontSize: 15,
                    flexDirection: "column"
                  }}
                >
                  {" "}
                  Consulta:{" "}
                </Text>

                <Text
                  style={{
                    marginTop: 9,
                    fontSize: 14,
                    marginLeft: 3
                  }}
                >
                  {this.state.data9}{" "}
                </Text>

                <Text
                  style={{
                    marginTop: 10,
                    fontWeight: "bold",
                    fontSize: 15,
                    flexDirection: "column"
                  }}
                >
                  {" "}
                  Estatus Cita:{" "}
                </Text>

                <Text
                  style={{
                    marginTop: 7,
                    fontSize: 14,
                    marginLeft: 3
                  }}
                >
                  {this.state.data6}{" "}
                </Text>

                <Text
                  style={{
                    marginTop: Platform.OS === "ios" ? -40 : 38,
                    fontWeight: "bold",
                    fontSize: 15,
                    marginLeft: Platform.OS === "ios" ? 160 : 156,

                    flexDirection: "column",
                    top: Platform.OS === "ios" ? -165 : -276,
                    
                  }}
                >
                  {" "}
                  Fecha Consulta:{" "}
                </Text>

                <Text
                  style={{
                    //marginTop: 27,
                    fontSize: 14,
                    marginLeft: 166,
                    flexDirection: "column",
                    marginTop: Platform.OS === "ios" ? -156 : -270,
                    //marginTop: Platform.OS === "ios" ? 115 : -296,
                   
                  }}
                >
                  {this.state.data5}{" "}
                </Text>

                <Text
                  style={{
                    marginTop: 36,
                    fontSize: 14,
                    marginLeft: 166,
                    flexDirection: "column",
                    marginTop: Platform.OS === "ios" ? 12 : 15,
                    
                  }}
                >
                  {this.state.data3} - {this.state.data4}{" "}
                </Text>

                <Text
                  style={{
                    marginTop: -4,
                    fontWeight: "bold",
                    fontSize: 15,
                    marginLeft: 162,
                    flexDirection: "column",
                    top: Platform.OS === "ios" ? 15 : 13,
                  }}
                >
                  {" "}
                  Celular:{" "}
                </Text>
                <Text
                  style={{
                    marginTop: 31,
                    fontSize: 14,
                    marginLeft: 164,
                    flexDirection: "column",
                    top: Platform.OS === "ios" ? -5 : -9,
                    
                  }}
                >
                  {" "}
                  {this.state.data8}{" "}
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    fontWeight: "bold",
                    fontSize: 15,
                    marginLeft: 163,
                    flexDirection: "column",
                    top: Platform.OS === "ios" ? -5 : -5,
                  
                  }}
                >
                  {" "}
                  Asunto:{" "}
                </Text>

                <Text
                  style={{
                    marginTop: 36,
                    fontSize: 14,
                    marginLeft: 168,
                    flexDirection: "column",
                    top: Platform.OS === "ios" ? -30 : -30,
                 
                  }}
                >
                  {this.state.data7}{" "}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: 340,
              marginLeft: Platform.OS === "ios" ? 10 : 10,
              top: Platform.OS === "ios" ? 10 : -13
            }}
          >
            <TouchableHighlight
              style={{
                marginTop: Platform.OS === "ios" ? 560 : 430,
                height: Platform.OS === "ios" ? 40 : 40,
                backgroundColor: "#009bd9",
                padding: Platform.OS === "ios" ? 2 : 9,
                borderRadius: 8,
                marginLeft: Platform.OS === 'ios' ? 10 : 10,
                //marginRight: Platform.OS === 'ios' ? 10 : 10,
              }}
              onPress={() => {
                {
                  this.props.navigation.navigate("CalendarsScreen");
                  //this.setModalVisible(!this.state.modalVisible);
                }
              }}
            >
              <Text
                style={{
                  alignItems: "center",
                  color: "white",
                  //backgroundColor: '#005094',
                  fontWeight: "bold",
                  fontSize: 18,
                  marginLeft: Platform.OS === "ios" ? 131 : 126,
                  marginTop: Platform.OS === "ios" ? 8 : 1,
                }}
              >
                {" "}
                Cerrar{" "}
              </Text>
            </TouchableHighlight>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(detalle);
  











