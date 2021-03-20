import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
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

export default class CurrentPinCheck extends Component {
  constructor() {
    super();

    this.state = {
      displayCodePin: true,
      correctCode:'1234',
      studentNumber:''
    };
  }

  componentDidMount(){
    this.setState({studentNumber:this.props.navigation.getParam('ID')})
    //Call saved Pin number at DB and store in this.state.correctCode
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
          <Text style = {styles.text}>현재 PIN번호 4자리를 입력해주세요</Text>
        </View>
        <CustomPincode
          pointsStyle = {styles.pointcontainer}
          pointStyle = {styles.point}
          pointActiveStyle = {styles.activepoint}
          pinButtonStyle = {styles.button}
          pinContainerStyles = {styles.pinContainer}
          completeCallback={(inputtedPin, callbackClear) => {
            //pin번호 검증과정
              if (inputtedPin == this.state.correctCode/*actualPin*/) {//맞는 경우
                callbackClear()
                callbackClear()
                callbackClear()
                callbackClear()
                this.props.navigation.push('PinSetting', this.state.studentNumber);
              }
              else{//틀린 경우
                alert("다시 입력해주세요");
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
