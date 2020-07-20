import React from 'react';
import { StyleSheet, TextInput, Image, View, TouchableHighlight, Text, ShakingText } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from "../components/CustomButton"

export default class Login extends React.Component{
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
    this.props.navigation.push('Main')
  };

  render(){
    return(
      <View style={styles.container}>
        <View>
          <Image style = {styles.logo} source = {require(`../../colorLogo.jpg`)}/>
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
