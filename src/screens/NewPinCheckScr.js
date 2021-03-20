import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import {CustomPincode} from 'react-native-custom-pin-code';
import * as SQLite from 'expo-sqlite';

const pin = SQLite.openDatabase('pin.db');

async function getPin(correctCode){
    const pin = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + `${correctCode}/`);
    var info = JSON.parse(obj);
}

export default class PINSetScreen extends Component {
  constructor() {
    super();

    this.state = {
      displayCodePin: true,
      Newcode:'',
      studentNumber:''
    };
  }

  componentDidMount(){
      const {navigation} = this.props;
      const Code = navigation.getParam('Code');
      const ID = navigation.getParam('ID');
      this.setState({Newcode:Code, studentNumber:ID});
  }

  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.textcontainer}>
          <Text style = {styles.text}>PIN을 한 번 더 입력해주세요</Text>
        </View>
        <CustomPincode
          pointsStyle = {styles.pointcontainer}
          pointStyle = {styles.point}
          pointActiveStyle = {styles.activepoint}
          pinButtonStyle = {styles.button}
          pinContainerStyles = {styles.pinContainer}
          completeCallback={(inputtedPin, callbackClear) => {
              if(this.state.Newcode == inputtedPin){
                //입력된 핀번호 저장 후 화면에선 지우기
                callbackClear()
                callbackClear()
                callbackClear()
                callbackClear()
                /* Save changed PIN into DB */
                pin.transaction((tx) => {
                  tx.executeSql('UPDATE DataTable SET pin = ?', [this.state.Newcode], (tx, results) => {});
                });
                alert("변경되었습니다!")
                this.props.navigation.push("Main", this.state.studentNumber)
              }
              else{
                //입력된 핀번호 화면에서 지우기
                callbackClear()
                callbackClear()
                callbackClear()
                callbackClear()
                alert("PIN번호를 확인해주세요!")
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
