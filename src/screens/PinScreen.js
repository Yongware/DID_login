import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import {CustomPincode} from 'react-native-custom-pin-code';
//https://github.com/TchernyavskyDaniil/react-native-custom-pin-code

import * as SQLite from 'expo-sqlite';

const pin = SQLite.openDatabase('pin.db');

async function getPin(correctCode){
    const pin = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + `${correctCode}/`);
    var info = JSON.parse(obj);
}

export default class PINScreen extends Component {
  constructor() {
    super();

    this.state = {
      displayCodePin: true,
      correctCode:'1234'
    };

    pin.transaction((tx) => {
      tx.executeSql('create table if not exists DataTable (pin text);', [], (tx, results) => {});
      tx.executeSql('insert into DataTable (pin) values (?)', [this.state.correctCode], (tx, results) => {});
      tx.executeSql('SELECT * FROM DataTable;', [], (tx, results) => {
        console.log("const pin: "+results.rows.item(0).pin);
      });
    });
  }

  componentDidMount(){
    //Call saved Pin number and store in this.state.correctCode
    pin.transaction((tx) => {
      tx.executeSql('SELECT * FROM DataTable;', [], (tx, results) => {
        this.setState({ correctCode: results.rows.item(0).pin });
      });
    });
  }

  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.textcontainer}>
          <Text style = {styles.text}>PIN 번호 4자리를 입력해주세요</Text>
        </View>
        <CustomPincode
          pointsStyle = {styles.pointcontainer}
          pointStyle = {styles.point}
          pointActiveStyle = {styles.activepoint}
          pinButtonStyle = {styles.button}
          pinContainerStyles = {styles.pinContainer}
          completeCallback={(inputtedPin, callbackClear) => {
              console.log(this.state.correctCode);
              //pin번호 검증 과정
              if (inputtedPin == this.state.correctCode/*actualPin*/) {//pin번호가 맞는 경우
                //입력된 핀번호 저장 후 화면에선 지우기
                callbackClear()
                callbackClear()
                callbackClear()
                callbackClear()
                this.props.navigation.push('Login')
              }
              else{//틀린 경우
                alert("다시 입력해주세요");
                //입력된 핀번호 화면에선 지우기
                callbackClear()
                callbackClear()
                callbackClear()
                callbackClear()
              }
            }
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#43A848'
  },
  textcontainer:{
    height:"15%",
    width:"100%",
    alignItems:"center",
    justifyContent:"flex-end",
    backgroundColor:"#43A848"
  },
  pointcontainer:{
    height:"20%",
    width:"100%",
    backgroundColor:"#43A848",
    alignItems:"flex-start",
    justifyContent:"center",
    marginBottom:0,
    marginLeft:15,
    marginTop:15,
  },
  pinContainer:{
    width:"100%",
    height:"80%",
    backgroundColor:'white',
    alignItems:"center",
    justifyContent:"center",
    margin:0,
    paddingTop:40,
  },
  point:{
    width:"11%",
    height:"33%",
    borderRadius:0,
    margin:10,
    marginBottom:40,
    borderBottomWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderTopWidth:0,
    backgroundColor:"#226726"
  },
  activepoint:{
    width:"12%",
    height:"33%",
    borderRadius:500,
    margin:10,
    marginBottom:40,
    borderWidth:0,
    backgroundColor:"#226726"
  },
  button:{
    borderRadius: 0,
    borderWidth: 0,
    margin:0,
    padding:20,
    width: "33.3%",
    height:"25%",
    alignItems: 'center',    
  },
  success: {
    fontSize: 20,
    color: 'green',
    textAlign: 'center'
  },
  text:{
    fontSize:20,
    fontWeight:"300",
    fontStyle:"normal",
    color:"white",
  },
});
