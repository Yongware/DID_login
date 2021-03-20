import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View,
  TouchableOpacity,
} from 'react-native';
import * as SQLite from 'expo-sqlite';

const stdData = SQLite.openDatabase('student.db');
const final = SQLite.openDatabase('final.db');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stdNum: '',
      name: '',
      degree: '',
      college: '',
      major: '',
      prsNumFront: '',
      prsNumBack: '',
      date: '',
      prsNum: '',
      school: '',
    };
  }

  componentDidMount() {
    var date = new Date().getDate();
    var month = new Date().getMonth()+1;
    var year = new Date().getFullYear();
    this.setState({date: year+'/'+month+'/'+date});

    stdData.transaction((tx) => {
      tx.executeSql(
        'create table if not exists DataTable (name text, degree text, college text, major text, prsNumFront int, prsNumBack int, date text, stdNum int, school text);',
        [], (tx, results) => {}
      );
      tx.executeSql(
        'insert into DataTable (name, degree, college, major, prsNumFront, prsNumBack, date, stdNum, school) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        ['박근현', '학사', '소프트웨어대학', '소프트웨어학과', '111111', '3', this.state.date, '2019311111', '성균관대학교'], (tx, results) => {}
      );
      tx.executeSql(
        'insert into DataTable (name, degree, college, major, prsNumFront, prsNumBack, date, stdNum, school) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        ['박승호', '학사', '소프트웨어대학', '소프트웨어학과', '222222', '3', this.state.date, '2019312222', '성균관대학교'], (tx, results) => {}
      );
      tx.executeSql(
        'insert into DataTable (name, degree, college, major, prsNumFront, prsNumBack, date, stdNum, school) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        ['최영우', '학사', '소프트웨어대학', '소프트웨어학과', '333333', '3', this.state.date, '2019313333', '성균관대학교'], (tx, results) => {}
      );
      tx.executeSql(
        'insert into DataTable (name, degree, college, major, prsNumFront, prsNumBack, date, stdNum, school) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        ['박동민', '학사', '소프트웨어대학', '소프트웨어학과', '444444', '3', this.state.date, '2019314444', '성균관대학교'], (tx, results) => {}
      );
    });
  }

  main(stdNum) {
    var studentNumber = stdNum;
    var isSet = true;
    this.props.navigation.push('Main', { isSet, studentNumber});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backContainer}>
          <Text style={{fontWeight: 'bold', fontSize: 35, marginTop: '7%'}}>학생증 등록</Text>
        </View>
        <View style={styles.frontContainer}>
          <Text style={{fontSize: 15, marginBottom: 3}}>학번</Text>
          <TextInput style={styles.box}
            placeholderTextColor='#7c8487'
            placeholder='학번을 입력해주세요'
            onChangeText={(value) => this.setState({stdNum: value})}
            value={this.state.stdNum}/>
          <TouchableOpacity style={styles.button}
            onPress={() => {
              stdData.transaction((tx) => {
                tx.executeSql('SELECT * FROM DataTable WHERE stdNum=?;', [this.state.stdNum], (tx, results) => {
                  this.setState({name: results.rows.item(0).name});
                  this.setState({degree: results.rows.item(0).degree});
                  this.setState({college: results.rows.item(0).college});
                  this.setState({major: results.rows.item(0).major});
                  this.setState({prsNumFront: results.rows.item(0).prsNumFront});
                  this.setState({prsNumBack: results.rows.item(0).prsNumBack});
                  this.setState({date: results.rows.item(0).date});
                  this.setState({prsNum: results.rows.item(0).prsNumFront+'-'+results.rows.item(0).prsNumBack});
                  this.setState({school: results.rows.item(0).school});
                  console.log(results.rows.item(0));
                });
              });
            }}>
            <Text style={styles.buttonText}>조회하기</Text>
          </TouchableOpacity>
          <Text style={{paddingTop: '6%', fontSize: 15, marginBottom: 3}}>이름</Text>
          <View style={styles.box}>
            <Text style={{fontSize: 18}}>{this.state.name}</Text>
          </View>
            <Text style={styles.subTitle}>학위</Text>
          <View style={styles.box}>
            <Text style={{fontSize: 18}}>{this.state.degree}</Text>
          </View>
            <Text style={styles.subTitle}>소속 학부</Text>
          <View style={styles.box}>
            <Text style={{fontSize: 18}}>{this.state.college}</Text>
          </View>
          <Text style={styles.subTitle}>소속 학과</Text>
          <View style={styles.box}>
            <Text style={{fontSize: 18}}>{this.state.major}</Text>
          </View>
          <Text style={styles.subTitle}>주민등록번호</Text>
          <View style={styles.box}>
            <Text style={{fontSize: 18}}>{this.state.prsNum}</Text>
          </View>
          <Text style={styles.subTitle}>발급일자</Text>
          <View style={styles.box}>
            <Text style={{fontSize: 18}}>{this.state.date}</Text>
          </View>
          <TouchableOpacity style={styles.button}
            onPress={() => {
              console.log("finalData");
              final.transaction((tx) => {
                tx.executeSql(
                  'create table if not exists Data (name text, degree text, college text, major text, prsNumFront int, prsNumBack int, date text, stdNum text, school text);',
                  [], (tx, results) => {}
                );
                tx.executeSql(
                  'insert into Data (name, degree, college, major, prsNumFront, prsNumBack, date, stdNum, school) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                  [this.state.name, this.state.degree, this.state.college, this.state.major, this.state.prsNumFront, this.state.prsNumBack, this.state.date, this.state.stdNum, this.state.school], (tx, results) => {}
                );
                tx.executeSql('SELECT * FROM DataTable', [], (tx, results) => {
                  console.log(results.rows.item(0));
                });
              });
              this.main(this.state.stdNum);
            }}>
            <Text style={styles.buttonText}>신청하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(141, 198, 63)',
  },
  backContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frontContainer: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: '8%',
    paddingTop: '7%',
    paddingBottom: '1%',
  },
  subTitle: {
    marginTop: '3%',
    fontSize: 15,
    marginBottom: '0.5%',
  },
  box: {
    width: '100%',
    height: '6%',
    borderRadius: 10,
    paddingLeft: '3%',
    backgroundColor: 'rgba(141, 198, 63, 0.6)',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '6%',
    marginTop: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(141, 198, 63)',
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});