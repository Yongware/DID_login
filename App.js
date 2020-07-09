import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TextInput, Image, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from "./src/components/CustomButton"
import MainScreen from './src/screens/MainScreen';


class Login extends React.Component{
  state = {
    id:"",
    pw:""
  };

  handleId = text => {
    this.setState({id:text});
  };

  handlePw = text => {
      this.setState({pw:text});
  };

  login = (id, pw) =>{
    alert("id: "+ id + "pw: "+pw);
    this.props.navigation.push('SKKUDID.MainScreen')
  };

  render(){
    return(
      <View style={styles.container}>
        <View style = {styles.container}>
          <Image style = {styles.logo} source = {require(`./logo.jpg`)}/>
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

Navigation.registerComponent('SKKUDID.LoginScreen', ()=> Login);
Navigation.registerComponent('SKKUDID.MainScreen', ()=> MainScreen);

const AppNavigator = createStackNavigator(
 {
    'SKKUDID.LoginScreen': Login,
    'SKKUDID.MainScreen' : MainScreen
 },
 {
   initialRouteName: 'SKKUDID.LoginScreen',
 }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white"
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
      width:'80%',
      height: '30%',
      width:300,
      height:300
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
