import React, {Component} from 'react';
import {View, Text, Image, Linking} from 'react-native';
import {withTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import baseStyles from '../../styles/stylesheets/base.stylesheets';
import UserAvatar from '../../screen/home/useravatar';
import {connect} from 'react-redux';

class HomeComponent extends Component {
  /*componentDidMount() {
    this.props.setNavigationColor(this.props.theme.colors.primary);
  }*/
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, marginLeft: 4, marginRight: 20}}>
        {this.props.loggedUser ? (
          <UserAvatar loggedUser={this.props.loggedUser} />
        ) : null}
        <View style={baseStyles.icon1}>
          <MaterialCommunityIcons
            name="calendar-blank-outline"
            size={60}
            color="#009bd9"
            style={{left: 10}}
            onPress={() => {
              this.props.navigation.navigate('CalendarsScreen');
            }}
          />
          <Text style={baseStyles.citas}>Citas</Text>

          <MaterialCommunityIcons
            name="chat"
            size={60}
            color="#009bd9"
            style={{left: 40}}
            onPress={() => {
              this.props.navigation.navigate('LisChat');
              // alert('Modulo actualmente en desarrollo');
            }}
          />

          <Text style={baseStyles.chat}>Chat</Text>
        </View>

        <View style={baseStyles.icon2}>
          <MaterialCommunityIcons
            name="lifebuoy"
            size={60}
            color="#009bd9"
            style={{left: 75}}
            onPress={
              () => {
                Linking.openURL('https://www.saludvitale.com/doctor/contactanos/');
              }
              //alert('Modulo actualmente en desarrollo');
              // }
            }
          />

          <Text style={baseStyles.atencionalcliente1}>Atención al</Text>

          <Text style={baseStyles.atencionalcliente2}>Cliente</Text>

          <MaterialCommunityIcons
            name="account"
            size={60}
            color="#009bd9"
            style={{left: 13}}
            onPress={() => {
              alert('Modulo actualmente en desarrollo');
            }}
          />

          <Text style={baseStyles.micuenta}>Mi Cuenta</Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {loggedUser: state.user};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

//export default withTheme(HomeComponent);
