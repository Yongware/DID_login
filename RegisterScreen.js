import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity} from 'react-native';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      name: '',
      stdNum: '',
      diploma: '',
      major: '',
      prsNumFront: '',
      prsNumBack: '',
      address: '',
      personalData: [],
    };
  }

  componentDidMount() {
    var that = this;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    that.setState({date: year+'/'+month+'/'+date,});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <Text style={styles.title}>등록</Text>
        </View>
        <View style={styles.frontContainer}>
          <View style={styles.inputTitleContainer}>
            <Text style={styles.inputTitle}>이름</Text>
          </View>
          <TextInput 
            style={styles.input}
            placeholderTextColor="#263238"
            onChangeText={(value) => this.setState({name: value})}
            value={this.state.name}
          />
          <View style={styles.inputTitleContainer}>
            <Text style={styles.inputTitle}>학번</Text>
          </View>
          <TextInput 
            style={styles.input}
            placeholderTextColor="#263238"
            onChangeText={(value) => this.setState({stdNum: value})}
            value={this.state.stdNum}
          />
          <View style={{paddingRight: 180}}>
            <Text style={styles.inputTitle}>학위 과정(학사/석사/박사)</Text>
          </View>
          <TextInput 
            style={styles.input}
            placeholderTextColor="#263238"
            onChangeText={(value) => this.setState({diploma: value})}
            value={this.state.diploma}
          />
          <View style={styles.inputTitleContainer}>
            <Text style={styles.inputTitle}>학과</Text>
          </View>
          <TextInput 
            style={styles.input}
            placeholderTextColor="#263238"
            onChangeText={(value) => this.setState({major: value})}
            value={this.state.major}
          />
          <View style={{paddingRight: 260}}>
            <Text style={styles.inputTitle}>주민등록번호</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextInput 
              style={styles.inputID}
              placeholderTextColor="#263238"
              onChangeText={(value) => this.setState({prsNumFront: value})}
              value={this.state.prsNumFront}
            />
            <Text style={{fontSize: 30}}>-</Text>
            <TextInput 
              style={styles.inputID}
              placeholderTextColor="#263238"
              onChangeText={(value) => this.setState({prsNumBack: value})}
              value={this.state.prsNumBack}
            />
          </View>
          <View style={styles.inputTitleContainer}>
            <Text style={styles.inputTitle}>주소</Text>
          </View>
          <TextInput 
            style={styles.input}
            placeholderTextColor="#263238"
            onChangeText={(value) => this.setState({address: value})}
            value={this.state.address}
          />
          <View style={{paddingRight: 290}}>
            <Text style={styles.inputTitle}>발급일자</Text>
          </View>
          <View style={styles.input}>
            <Text style={{fontSize: 20, paddingTop: 10}}>{this.state.date}</Text>
          </View>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {

            }
          }>
            <Text style={styles.buttonText}>등록</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const {width : WIDTH} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8DC53F',
  },
  backgroundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  frontContainer: {
    flex: 2.5,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputTitleContainer: {
    paddingRight: 310,
  },
  inputTitle: {
    marginTop: 13,
    fontSize: 15,
    marginBottom: 2,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 10,
    fontSize: 17,
    paddingLeft: 10,
    backgroundColor: 'rgba(141, 197, 63, 0.6)',
  },
  inputID: {
    width: WIDTH - 242,
    height: 45,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 10,
    backgroundColor: 'rgba(141, 197, 63, 0.6)',
  },
  button: {
    borderRadius: 10,
    width: WIDTH - 55,
    height: 45,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8DC53F',
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
});
