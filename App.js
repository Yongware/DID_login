import React from 'react';
import { StyleSheet, TextInput, Image, View, TouchableHighlight, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from "./src/components/CustomButton"
import MainScreen from './src/screens/MainScreen';
import TouchId from 'react-native-touch-id';
import FingerprintScanner from 'react-native-fingerprint-scanner';


class Fingerprint extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      errorMessageLegacy: undefined,
      biometricLegacy: undefined
    };
 
    this.description = null;
  }
 
  componentDidMount() {
    if (this.requiresLegacyAuthentication()) {
      this.authLegacy();
    } else {
      this.authCurrent();
    }
  }
 
  componentWillUnmount = () => {
    FingerprintScanner.release();
  }
 
  requiresLegacyAuthentication() {
    return Platform.Version < 23;
  }
 
  authCurrent() {
    FingerprintScanner
      .authenticate({ title: 'Log in with Biometrics' })
      .then(() => {
        this.props.onAuthenticate();
      });
  }
 
  authLegacy() {
    FingerprintScanner
      .authenticate({ onAttempt: this.handleAuthenticationAttemptedLegacy })
      .then(() => {
        this.props.handlePopupDismissedLegacy();
        Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
      })
      .catch((error) => {
        this.setState({ errorMessageLegacy: error.message, biometricLegacy: error.biometric });
        this.description.shake();
      });
  }
 
  handleAuthenticationAttemptedLegacy = (error) => {
    this.setState({ errorMessageLegacy: error.message });
    this.description.shake();
  };
 
  renderLegacy() {
    const { errorMessageLegacy, biometricLegacy } = this.state;
    const { style, handlePopupDismissedLegacy } = this.props;
 
    return (
      <View style={styles.container}>
        <View style={[styles.contentContainer, style]}>
 
          <Image
            style={styles.logo}
            source={require('./assets/finger_print.png')}
          />
 
          <Text style={styles.heading}>
            Biometric{'\n'}Authentication
          </Text>
          <ShakingText
            ref={(instance) => { this.description = instance; }}
            style={styles.description(!!errorMessageLegacy)}>
            {errorMessageLegacy || `Scan your ${biometricLegacy} on the\ndevice scanner to continue`}
          </ShakingText>
 
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handlePopupDismissedLegacy}
          >
            <Text style={styles.buttonText}>
              BACK TO MAIN
            </Text>
          </TouchableOpacity>
 
        </View>
      </View>
    );
  }

   
 
  render = () => {
    if (this.requiresLegacyAuthentication()) {
      return this.renderLegacy();
    }
 
    // current API UI provided by native BiometricPrompt
    return null;
  }
}

class Login extends React.Component{
  state = {
    id:"",
    pw:"",
  };

  handleId = text => {
    this.setState({id:text});
  };

  handlePw = text => {
      this.setState({pw:text});
  };

  login = (id, pw) =>{
    alert("id: "+ id + ", pw: "+pw);
    this.props.navigation.push('MainScreen')
  };

  render(){
    return(
      <View style={styles.container}>
        <View>
          <Image style = {styles.logo} source = {require(`./colorLogo.jpg`)}/>
          <View style = {styles.idContainer}>
            <AntDesign style = {styles.Icon} name="user" size={20} />
            <TextInput
            name="id"
            type="text"
            style = {styles.userInput}
            placeholder = "아이디를 입력하세요"
            onChangeText={this.handleId}
            //value = {this.state.id}
            />
          </View>
          <View style = {styles.pwContainer}>
            <AntDesign style = {styles.Icon} name="lock" size={20} />
            <TextInput
            name="pw"
            type="password"
            secureTextEntry= {true}
            style = {styles.userInput}
            placeholder = "비밀번호를 입력하세요"
            onChangeText={this.handlePw}
            //value={this.state.pw}
            />
          </View>
          <CustomButton
          title={'LOGIN'}
          onPress = {()=>this.login(this.state.id, this.state.pw)}
          />
        </View>
      </View>
    );
  }
}

Navigation.registerComponent('Authentication', ()=> Fingerprint)
Navigation.registerComponent('SKKUDID', ()=> Login);
Navigation.registerComponent('MainScreen', ()=> MainScreen);

const AppNavigator = createStackNavigator(
 {
    'Authentication': Fingerprint,
    'SKKUDID': Login,
    'MainScreen' : MainScreen
 },
 {
   initialRouteName: 'SKKUDID',
 }
);

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  idContainer:{
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: 'green',
      height: 50,
      paddingBottom:2,
  },
  pwContainer:{
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: 'green',
      height: 50,
      paddingBottom:2,
  },
  logo:{
    width:300,
    height:300,
  },

  userInput:{
      justifyContent: "flex-end",
      alignItems: "flex-end",
      backgroundColor: "white"
  },

  Icon:{
      paddingTop: 15,
      paddingRight: 10,
      color: "grey",
      justifyContent: "center",
      alignItems: "baseline",
  },
});

export default createAppContainer(AppNavigator);
